import {hasSubscription} from '@jumpn/utils-graphql'
import {ApolloLink} from 'apollo-link'

import authLink from './authLink'
import contextLink from './contextLink'
import errorLink from './errorLink'
import httpLink from './httpLink'
import stateLink from './stateLink'
import wsLink from './wsLink'

export default (options) => {
  const links = new Map()
  if (__DEV__) links.set('logger', require('apollo-link-logger').default)
  links.set('error', errorLink(options))
  links.set('context', contextLink(options))
  links.set('auth', authLink(options))
  links.set('state', stateLink(options))
  links.set(
    'server',
    new ApolloLink.split(
      ({query}) => hasSubscription(query),
      wsLink(options),
      httpLink(options)
    )
  )
  return links
}

export {default as sync} from './stateLink/sync'
