import {combineReducers} from 'redux'

import config from './config'
import messaging from './messaging'
import notifications from './notifications'

export default combineReducers({
  config,
  messaging,
  notifications
})
