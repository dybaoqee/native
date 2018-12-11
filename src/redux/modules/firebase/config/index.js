import {APP_VERSION} from '@/config/const'

export const UPDATE_VALUE = 'firebase/config/UPDATE_VALUE'

export const updateValue = (key, value) => ({type: UPDATE_VALUE, key, value})

export const initialState = {
  minAppVersion: APP_VERSION
}

export default function remoteConfigReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VALUE:
      return {...state, [action.key]: action.value}
    default:
      return state
  }
}
