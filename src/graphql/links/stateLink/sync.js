import {GET_FAVORITE_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {FAVORITE} from '@/graphql/modules/listings/mutations'
import {resetFavorites, getFavorites} from './resolvers/mutations/favorites'

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
  return Promise.all([syncFavorites(proxy)])
}
