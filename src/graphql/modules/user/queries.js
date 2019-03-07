import * as frag from '@/graphql/fragments'
import gql from 'graphql-tag'
import _ from 'lodash'

export const GET_USER_LISTINGS = gql`
  query userListings {
    userProfile @clientAuth {
      id
      listings(
        filters: {}
        pagination: {excludedListingIds: [], pageSize: 1000}
      ) {
        ...UserListing
      }
    }
  }
  ${frag.UserListing}
`

export const GET_CREDENTIALS = gql`
  query userProfile {
    credentials @client {
      jwt
    }
  }
`

export const GET_USER_PROFILE = gql`
  query userProfile {
    credentials @client {
      jwt
    }
    userProfile @clientAuth {
      ...UserProfile
    }
  }
  ${frag.UserProfile}
`

export const GET_FAVORITE_LISTINGS_IDS = gql`
  query favoritedListingsIds {
    userProfile @clientAuth {
      id
      favorites(
        filters: {}
        pagination: {excludedListingIds: [], pageSize: 1000}
      ) {
        id
      }
    }
  }
`

export const GET_FAVORITE_LISTINGS = gql`
  query favoritedListings(
    $excludedListingIds: [ID] = []
    $filters: ListingFilterInput = {}
    $pageSize: Int = 1000
  ) {
    userProfile @clientAuth {
      id
      favorites(
        filters: $filters
        pagination: {
          excludedListingIds: $excludedListingIds
          pageSize: $pageSize
        }
      ) {
        ...ListingFeed
      }
    }
  }
  ${frag.ListingFeed}
`
