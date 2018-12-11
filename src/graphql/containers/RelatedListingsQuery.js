import {get} from 'lodash'
import {Query} from 'react-apollo'

import {GET_RELATED_LISTINGS} from '@/graphql/modules/listings/queries'

function RelatedListingsQuery({id, pageSize, ...props}) {
  return (
    <Query
      query={GET_RELATED_LISTINGS}
      fetchPolicy="cache-and-network"
      variables={{id, pageSize}}
      {...props}
    />
  )
}

RelatedListingsQuery.defaultProps = {
  pageSize: 15
}

export const withRelatedListings = (getOptions) => (Target) => (props) => (
  <RelatedListingsQuery {...(getOptions ? getOptions(props) : {})}>
    {(response) => (
      <Target
        {...props}
        relatedListings={{
          loading: response.loading,
          data: get(response, 'data.listing.related.listings', []),
          refetch: response.refetch
        }}
      />
    )}
  </RelatedListingsQuery>
)
