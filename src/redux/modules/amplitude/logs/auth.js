import {logEvent} from '../index'

export const logSignIn = ({newUser, error} = {}) =>
  logEvent(`user-login-${error ? 'fail' : 'success'}`, {
    error: error ? error.message : undefined,
    newUser
  })

export const logSignUp = ({error} = {}) =>
  logEvent(`user-sign-up-${error ? 'fail' : 'success'}`, {
    error: error ? error.message : undefined
  })

export const logSignOut = () => logEvent('user-sign-out')
