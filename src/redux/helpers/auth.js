import {get} from 'lodash/fp'
import {call, getContext} from 'redux-saga/effects'

import {OPERATION_COMPLETED} from '@/graphql/containers/ConnectedMutation'
import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import {AK_SIGN_IN, SIGN_UP, SIGN_OUT} from '@/graphql/modules/user/mutations'

// Selectors
export const signedUp = ({type, operation}) =>
  type == OPERATION_COMPLETED && operation == SIGN_UP
signedUp.getUserProfile = get('data.register.user')

export const signedIn = ({type, operation}) =>
  type == OPERATION_COMPLETED && operation == AK_SIGN_IN
signedIn.getUserProfile = get('data.accountKitSignIn.user')

export const signedOut = ({type, operation}) =>
  type == OPERATION_COMPLETED && operation == SIGN_OUT
signedOut.getUserProfile = () => null

export function* getUserProfile() {
  const graphql = yield getContext('graphql')
  const {
    data: {userProfile}
  } = yield call([graphql, graphql.query], {
    query: GET_USER_PROFILE,
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore'
  })
  return userProfile
}
