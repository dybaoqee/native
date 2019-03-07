import _ from 'lodash'
import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const VISUALIZE_TOUR = gql`
  mutation tourVisualized($id: ID!) {
    tourVisualized(id: $id) {
      id
    }
  }
`

export const FAVORITE = gql`
  mutation favoriteListing($id: ID!) {
    favoriteListing(id: $id) @clientAuth {
      listing {
        id
      }
    }
  }
`

export const UNFAVORITE = gql`
  mutation unfavoriteListing($id: ID!) {
    unfavoriteListing(id: $id) @clientAuth {
      listing {
        id
      }
    }
  }
`

export const INSERT_LISTING = gql`
  mutation insertListing($listing: ListingInput!) {
    insertListing(input: $listing) {
      ...Listing
    }
  }
  ${frag.Listing}
`

export const UPDATE_LISTING = gql`
  mutation updateListing($id: ID!, $listing: ListingInput!) {
    updateListing(id: $id, input: $listing) {
      ...Listing
    }
  }
  ${frag.Listing}
`
