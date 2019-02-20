import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

import {FAVORITE, UNFAVORITE} from '@/graphql/modules/listings/mutations'
import {GET_FAVORITE_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {
  logListingFavorite,
  logListingUnfavorite
} from '@/redux/modules/amplitude/logs/listing'
import {withFavoriteListingByID} from './FavoritesQuery'

const FavoriteMutation = connect(
  null,
  {logListingFavorite, logListingUnfavorite}
)(function _FavoritesMutation({
  children,
  id,
  favorite,
  logListingFavorite,
  logListingUnfavorite
}) {
  return (
    <Mutation
      mutation={favorite ? UNFAVORITE : FAVORITE}
      variables={{id}}
      refetchQueries={[{query: GET_FAVORITE_LISTINGS_IDS}]}
      update={() =>
        (favorite ? logListingUnfavorite : logListingFavorite).call(undefined, {
          id
        })
      }
    >
      {children}
    </Mutation>
  )
})

export default FavoriteMutation

export const withFavoriteMutation = (Target) =>
  withFavoriteListingByID((props) => (
    <FavoriteMutation {...props}>
      {(onFavorite) => <Target {...props} onFavorite={onFavorite} />}
    </FavoriteMutation>
  ))
