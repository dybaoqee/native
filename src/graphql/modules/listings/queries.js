import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_LISTING = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      ...UserListing
    }
  }
  ${frag.UserListing}
`

export const GET_LISTING_INPUT = gql`
  query listingInput($id: ID!) {
    listing(id: $id) {
      ...ListingInput
    }
  }
  ${frag.ListingInput}
`

export const GET_LISTINGS_FEED = gql`
  query listingsFeed(
    $exclude: [ID!]
    $pageSize: Int
    $filters: ListingFilterInput!
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

export const GET_RELATED_LISTINGS = gql`
  query relatedListings($id: ID!, $pageSize: Int) {
    listing(id: $id) {
      id
      related(filters: {}, pagination: {pageSize: $pageSize}) {
        remainingCount
        listings {
          ...ListingFeed
        }
      }
    }
  }
  ${frag.ListingFeed}
`
