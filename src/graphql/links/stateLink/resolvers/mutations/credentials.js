import {AsyncStorage} from 'react-native'

import {GET_USER_PROFILE, GET_CREDENTIALS} from '@/graphql/modules/user/queries'

export const JWT_CACHE_KEY = '__emcasa_jwt'

// TODO - Use secure storage
export const getJwt = async () => AsyncStorage.getItem(JWT_CACHE_KEY)

export const setJwt = async (jwt) => AsyncStorage.setItem(JWT_CACHE_KEY, jwt)

export const resetJwt = () => AsyncStorage.removeItem(JWT_CACHE_KEY)

export async function storeCredentials(_, {jwt, user}, {cache, graphql}) {
  let userProfile = user
  if (!jwt) {
    await resetJwt()
    await graphql.resetStore()
    userProfile = {
      __typename: 'User',
      id: null,
      role: null,
      name: null,
      email: null,
      phone: null,
      listings: [],
      blacklists: [],
      favorites: [],
      notificationPreferences: {
        __typename: 'NotificationPreferences',
        app: true,
        email: true
      }
    }
  } else {
    await setJwt(jwt)
    await graphql.sync()
  }
  const credentials = {
    __typename: 'Credentials',
    jwt
  }
  await cache.writeQuery({
    query: GET_CREDENTIALS,
    data: {credentials}
  })
  await cache.writeQuery({
    query: GET_USER_PROFILE,
    data: {credentials, userProfile}
  })
  return credentials
}
