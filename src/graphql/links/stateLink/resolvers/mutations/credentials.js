import {AsyncStorage} from 'react-native'

import {GET_USER_PROFILE, GET_CREDENTIALS} from '@/graphql/modules/user/queries'

export const JWT_CACHE_KEY = '__emcasa_jwt'

// TODO - Use secure storage
export const getJwt = async () => AsyncStorage.getItem(JWT_CACHE_KEY)

export const setJwt = async (jwt) => AsyncStorage.setItem(JWT_CACHE_KEY, jwt)

export const resetJwt = () => AsyncStorage.removeItem(JWT_CACHE_KEY)

export async function storeCredentials(_, {jwt, user}, {cache, graphql}) {
  const credentials = {
    __typename: 'Credentials',
    jwt
  }
  const writeCredentials = async (userProfile) => {
    await cache.writeQuery({
      query: GET_CREDENTIALS,
      data: {credentials}
    })
    await cache.writeQuery({
      query: GET_USER_PROFILE,
      data: {credentials, userProfile}
    })
  }
  if (!jwt) {
    await resetJwt()
    await graphql.resetStore()
    await writeCredentials({
      __typename: 'User',
      id: null,
      role: null,
      name: null,
      email: null,
      phone: null,
      listings: [],
      favorites: [],
      notificationPreferences: {
        __typename: 'NotificationPreferences',
        app: true,
        email: true
      }
    })
  } else {
    await setJwt(jwt)
    await writeCredentials(user)
    await graphql.sync()
  }
  return credentials
}
