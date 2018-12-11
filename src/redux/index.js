import {createStore, applyMiddleware} from 'redux'
import {persistStore} from 'redux-persist'
import createSagaMiddleware, {END} from 'redux-saga'

import reducer from './modules/reducer'
import saga from './modules/saga'

const compose = (...args) => {
  let compose
  if (__DEV__) compose = require('redux-devtools-extension').composeWithDevTools
  else compose = require('redux').compose
  return compose(...args)
}

export default function createReduxStore(client) {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      get graphql() {
        return client.graphql
      }
    }
  })
  const middleware = [sagaMiddleware]
  if (__DEV__) {
    const {createLogger} = require('redux-logger')
    middleware.push(createLogger({collapsed: true}))
  }
  const finalCreateStore = compose(applyMiddleware(...middleware))(createStore)
  const store = finalCreateStore(reducer)
  store.persistor = persistStore(store)
  store.runSaga = (_) => {
    store.task = sagaMiddleware.run(_)
  }
  store.close = () => store.dispatch(END)
  store.runSaga(saga)
  if (module.hot) {
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(require('./modules/reducer').default)
    )
    module.hot.accept('./modules/saga', () => {
      store.task.cancel()
      store.runSaga(require('./modules/saga').default)
    })
    module.hot.accept(() => {})
  }
  return store
}
