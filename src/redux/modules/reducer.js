import {AsyncStorage} from 'react-native'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'

import {PERSIST_TIMEOUT} from '@/config/const'
import firebase from './firebase'
import search from './search'
import navigation from './navigation'

const persistent = (reducer, options = {}) =>
  persistReducer(
    {
      key: reducer.name,
      storage: AsyncStorage,
      timeout: PERSIST_TIMEOUT,
      ...options
    },
    reducer
  )

export default combineReducers({
  navigation,
  search: persistent(search, {whitelist: ['city']}),
  firebase: persistent(firebase, {whitelist: ['messaging']})
})
