import {all, call, fork, take, takeEvery, getContext} from 'redux-saga/effects'
import {Sentry, SentryLog} from 'react-native-sentry'
import CodePush from 'react-native-code-push'

import {READY} from '@/lib/client'
import {
  SENTRY_DNS,
  SENTRY_ENABLED,
  CODEPUSH_ENABLED,
  RELEASE_PROFILE,
  VERSION_FULL_NAME
} from '@/config/const'
import {OPERATION_COMPLETED} from '@/graphql/containers/ConnectedMutation'
import {GET_USER_PROFILE} from '@/graphql/modules/user/queries'
import {AK_SIGN_IN, SIGN_UP, SIGN_OUT} from '@/graphql/modules/user/mutations'
import {SCREEN_APPEARED} from '../navigation'

function* initializeSentry() {
  Sentry.config(SENTRY_DNS, {
    logLevel: SentryLog.Debug
  }).install()
  Sentry.setTagsContext({
    environment: RELEASE_PROFILE
  })
  let version = VERSION_FULL_NAME
  if (CODEPUSH_ENABLED) {
    const update = yield call(
      CodePush.getUpdateMetadata,
      CodePush.UpdateState.RUNNING
    )
    if (update) version = update.appVersion + '-codepush:' + update.label
  }
  Sentry.setVersion(version)
}

function* getUserProfile() {
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

const identifySession = (getUserProfile) =>
  function* identifySession(action) {
    const userProfile = yield call(getUserProfile, action)
    if (userProfile && userProfile.id)
      Sentry.setUserContext({
        id: userProfile.id,
        email: userProfile.email,
        extra: {
          role: userProfile.role
        }
      })
    else Sentry.setUserContext({})
  }

const logBreadcrumb = ({data: getData, ...options}) =>
  function logBreadcrumb({type, ...action}) {
    Sentry.captureBreadcrumb({
      message: `Action "${type}"`,
      category: 'action',
      data: typeof getData === 'function' ? getData(action) : undefined,
      ...options
    })
  }

const signedUpAction = ({type, operation}) =>
  type == OPERATION_COMPLETED && operation == SIGN_UP
const signedInAction = ({type, operation}) =>
  type == OPERATION_COMPLETED && operation == AK_SIGN_IN
const signedOutAction = ({type, operation}) =>
  type == OPERATION_COMPLETED && operation == SIGN_OUT

export default function* sentrySaga() {
  if (!SENTRY_ENABLED) return
  yield call(initializeSentry)
  yield take(READY)
  yield all([
    fork(identifySession(getUserProfile)),
    takeEvery(
      SCREEN_APPEARED,
      logBreadcrumb({
        data: ({name}) => ({screenName: name})
      })
    ),
    takeEvery(
      signedUpAction,
      logBreadcrumb({message: 'Signed up', category: 'auth'})
    ),
    takeEvery(
      signedInAction,
      logBreadcrumb({message: 'Signed in', category: 'auth'})
    ),
    takeEvery(
      signedOutAction,
      logBreadcrumb({message: 'Signed out', category: 'auth'})
    ),
    takeEvery(signedUpAction, identifySession(({data}) => data.register.user)),
    takeEvery(
      signedInAction,
      identifySession(({data}) => data.accountKitSignIn.user)
    ),
    takeEvery(signedOutAction, identifySession(() => null))
  ])
}
