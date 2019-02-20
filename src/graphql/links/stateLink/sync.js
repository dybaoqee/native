import {
  GET_BLACKLISTED_LISTINGS_IDS,
  GET_FAVORITE_LISTINGS_IDS
} from '@/graphql/modules/user/queries'
import {BLACKLIST, FAVORITE} from '@/graphql/modules/listings/mutations'
import {resetBlacklist, getBlacklist} from './resolvers/mutations/blacklist'
import {resetFavorites, getFavorites} from './resolvers/mutations/favorites'

async function syncBlacklist(proxy) {
  const ops = (await getBlacklist()).map((listing) =>
    proxy.mutate({
      mutation: BLACKLIST,
      variables: {id: listing.id},
      refetchQueries: [{query: GET_BLACKLISTED_LISTINGS_IDS}]
    })
  )
  await resetBlacklist()
  return Promise.all(ops)
}

async function syncFavorites(proxy) {
  const ops = (await getFavorites()).map((listing) =>
    proxy.mutate({
      mutation: FAVORITE,
      variables: {id: listing.id},
      refetchQueries: [{query: GET_FAVORITE_LISTINGS_IDS}]
    })
  )
  await resetFavorites()
  return Promise.all(ops)
}

export default function sync(proxy) {
  return Promise.all([syncBlacklist(proxy), syncFavorites(proxy)])
}
