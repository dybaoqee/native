import _ from 'lodash'
import {Query} from 'react-apollo'
import {compose, mapProps} from 'recompose'

import {
  GET_BLACKLISTED_LISTINGS_IDS,
  GET_BLACKLISTED_LISTINGS
} from '@/graphql/modules/user/queries'

const createBlacklistContainer = (query, getProps) => (Target) => (props) => (
  <Query fetchPolicy="cache-and-network" query={query}>
    {(response) => <Target {...props} {...getProps(response)} />}
  </Query>
)

export const withBlacklistedListings = createBlacklistContainer(
  GET_BLACKLISTED_LISTINGS,
  (response) => ({
    blacklist: {
      data: !_.isEmpty(response.data)
        ? response.data.userProfile.blacklists
        : [],
      loading: response.loading
    }
  })
)

export const withBlacklistedListingIDs = createBlacklistContainer(
  GET_BLACKLISTED_LISTINGS_IDS,
  (response) => ({
    blacklist: {
      data: !_.isEmpty(response.data)
        ? response.data.userProfile.blacklists
        : [],
      loading: response.loading
    }
  })
)

export const withBlacklistedListingByID = compose(
  withBlacklistedListingIDs,
  mapProps(({blacklist, ...props}) => ({
    ...props,
    blacklisted:
      blacklist.data &&
      blacklist.data.findIndex((fav) => fav.id == props.id) !== -1
  }))
)
