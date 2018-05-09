import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

import {FAVORITE, UNFAVORITE} from '@/lib/graphql/mutations/favorites'
import {GET_FAVORITE_LISTINGS_IDS} from '@/lib/graphql/queries/favorites'
import {getToken} from '@/redux/modules/auth/selectors'

function FavoritesMutation({children, id, favorite, jwt}) {
  const query = {cache: !jwt}
  return (
    <Mutation
      mutation={favorite ? UNFAVORITE(query) : FAVORITE(query)}
      variables={{id}}
      refetchQueries={
        jwt ? [{query: GET_FAVORITE_LISTINGS_IDS(query)}] : undefined
      }
    >
      {children}
    </Mutation>
  )
}

const props = (state) => ({jwt: getToken(state)})

export default connect(props)(FavoritesMutation)