import {Platform} from 'react-native'
import pkg from '@package.json'

function boolVal(value, defaultValue = false) {
  if (!value) return Boolean(defaultValue)
  return !/^no?|f(alse)?|0$/i.test(value)
}

export const CDN_URL =
  process.env.CDN_URL || 'https://res.cloudinary.com/emcasa/image/upload'

export const CDN_UPLOAD_PRESET =
  process.env.CDN_UPLOAD_PRESET || 'emcasa-staging'

export const CDN_UPLOAD_URL =
  process.env.CDN_UPLOAD_URL || 'https://api.cloudinary.com/v1_1/emcasa/upload'

export const FRONTEND_URL =
  process.env.FRONTEND_URL || 'https://staging.emcasa.com'

export const API_URL =
  Platform.select({
    ios: process.env.IOS_API_URL,
    android: process.env.ANDROID_API_URL
  }) ||
  process.env.API_URL ||
  'https://em-casa-backend-staging.herokuapp.com'

export const APOLLO_ENGINE_URL =
  Platform.select({
    ios: process.env.IOS_APOLLO_ENGINE_URL,
    android: process.env.ANDROID_APOLLO_ENGINE_URL
  }) ||
  process.env.APOLLO_ENGINE_URL ||
  `${API_URL}/graphql_api`

export const WEB_SOCKET_URL =
  Platform.select({
    ios: process.env.IOS_WEB_SOCKET_URL,
    android: process.env.ANDROID_WEB_SOCKET_URL
  }) ||
  process.env.WEB_SOCKET_URL ||
  `${API_URL.replace(/^http/, 'ws')}/socket`

export const MESSENGER_RECEIVER_ID = process.env.MESSENGER_RECEIVER_ID

export const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

export const SENTRY_DNS =
  Platform.select({
    ios: process.env.IOS_SENTRY_DNS,
    android: process.env.ANDROID_SENTRY_DNS
  }) || process.env.SENTRY_DNS

export const SENTRY_ENABLED = boolVal(
  process.env.SENTRY_ENABLED,
  SENTRY_DNS && !__DEV__
)

export const AMPLITUDE_API_KEY = process.env.AMPLITUDE_API_KEY

export const AMPLITUDE_ENABLED = boolVal(
  process.env.AMPLITUDE_ENABLED,
  AMPLITUDE_API_KEY && !__DEV__
)

export const CODEPUSH_DEPLOYMENT_KEY = process.env.CODEPUSH_DEPLOYMENT_KEY

export const CODEPUSH_ENABLED = boolVal(
  process.env.CODEPUSH_ENABLED,
  CODEPUSH_DEPLOYMENT_KEY && !__DEV__
)

export const REMOTE_CONFIG_ENABLED = boolVal(
  process.env.REMOTE_CONFIG_ENABLED,
  !__DEV__
)

export const PERSIST_TIMEOUT =
  Platform.OS === 'android' && __DEV__ ? 100000 : 5000

/* Release configuration */
export const RELEASE_PROFILE = process.env.RELEASE_PROFILE || 'development'

export const VERSION_NAME = process.env.VERSION_NAME || pkg.version

export const BUILD_NUMBER = process.env.BUILD_NUMBER

export const COMMIT_SHA1 = process.env.COMMIT_SHA1

export const VERSION_FULL_NAME = `${VERSION_NAME}${
  BUILD_NUMBER ? `+${BUILD_NUMBER}` : ''
}`
