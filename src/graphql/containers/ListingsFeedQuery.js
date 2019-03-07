import _ from 'lodash/fp'
import isEqual from 'shallowequal'
import {PureComponent} from 'react'
import update from 'immutability-helper'
import {Query} from 'react-apollo'

import {GET_LISTINGS_FEED} from '@/graphql/modules/listings/queries'

const getIDs = _.map(_.get('id'))

class ListingsFilterWatcher extends PureComponent {
  componentDidUpdate(prev) {
    if (!isEqual(prev.variables, this.props.variables)) {
      this.props.refetch()
    }
  }

  render() {
    return this.props.children
  }
}

const updateListings = () => (prev, {fetchMoreResult}) =>
  update(prev, {
    listings: {
      listings: {$push: fetchMoreResult.listings.listings},
      remainingCount: {$set: fetchMoreResult.listings.remainingCount}
    }
  })

function ListingsFeedQuery({filters, pageSize, children, fetchPolicy}) {
  return (
    <Query
      notifyOnNetworkStatusChange
      query={GET_LISTINGS_FEED}
      fetchPolicy={fetchPolicy}
      variables={{filters, pageSize}}
    >
      {({fetchMore, data = {}, ...response}) => {
        const nextResponse = {
          ...response,
          data,
          fetchMore: _.once(() =>
            fetchMore({
              variables: {
                filters,
                pageSize,
                exclude: data.listings ? getIDs(data.listings.listings) : []
              },
              updateQuery: updateListings()
            })
          )
        }
        return (
          <ListingsFilterWatcher
            variables={nextResponse.variables}
            refetch={nextResponse.refetch}
          >
            {children(nextResponse)}
          </ListingsFilterWatcher>
        )
      }}
    </Query>
  )
}

ListingsFeedQuery.defaultProps = {
  filters: {}
}

export const withListingsFeed = (getOptions = {}) => (Target) =>
  Object.assign(
    (props) => (
      <ListingsFeedQuery
        {...(typeof getOptions === 'function' ? getOptions(props) : getOptions)}
      >
        {({data: {listings}, ...response}) => (
          <Target
            {...props}
            listingsFeed={{
              loading: response.loading,
              data: listings ? listings.listings : [],
              remainingCount: listings ? listings.remainingCount : undefined,
              refetch: response.refetch,
              fetchMore: response.fetchMore
            }}
          />
        )}
      </ListingsFeedQuery>
    ),
    {
      displayName: `withListingsFeed(${Target.displayName || Target.name})`
    }
  )
