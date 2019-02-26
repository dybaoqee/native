import {AsyncStorage} from 'react-native'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {CachePersistor} from 'apollo-cache-persist'
import {ApolloLink} from 'apollo-link'

import createLinks, {sync} from './links'
import {VERSION_NAME} from '@/config/const'

const SCHEMA_VERSION = '3'
const SCHEMA_VERSION_KEY = '__emcasa_schema_version'

export default async function createApolloClient(client) {
  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: AsyncStorage
  })

  const currentSchemaVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentSchemaVersion === SCHEMA_VERSION) await persistor.restore()
  else {
    await persistor.purge()
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  const links = createLinks({cache, client})

  const apolloClient = new ApolloClient({
    name: '@emcasa/native',
    version: VERSION_NAME,
    link: ApolloLink.from(Array.from(links.values())),
    cache
  })

  apolloClient.persistor = persistor

  apolloClient.sync = () => sync(apolloClient)

  apolloClient.onResetStore(links.get('state').writeDefaults)

  return apolloClient
}
