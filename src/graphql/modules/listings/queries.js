import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_LISTING = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      ...Listing
    }
  }
  ${frag.Listing}
`

export const GET_LISTINGS_FEED = gql`
  query listingsFeed(
    $exclude: [ID!]
    $pageSize: Int
    $filters: ListingFilter!
  ) {
    listings(
      filters: $filters
      pagination: {excludedListingIds: $exclude, pageSize: $pageSize}
    ) {
      remainingCount
      listings {
        ...ListingFeed
      }
    }
  }
  ${frag.ListingFeed}
`
