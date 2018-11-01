import {AsyncStorage} from 'react-native'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import {reducer as network} from 'react-native-offline'

import {PERSIST_TIMEOUT} from '@/config/const'
import auth from './auth'
import relatedListings from './relatedListings'
import gallery from './gallery'
import interest from './interest'
import firebase from './firebase'
import neighborhoods from './neighborhoods'
import search from './search'
import screens from '@/screens/modules/reducer'

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
  screens,
  network,
  search: persistent(search, {whitelist: ['city']}),
  auth: persistent(auth, {whitelist: ['user']}),
  firebase: persistent(firebase, {whitelist: ['messaging']}),
  relatedListings,
  gallery,
  interest,
  neighborhoods
})
