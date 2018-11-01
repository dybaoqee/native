import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

const District = `
  state
  stateSlug
  name
  nameSlug
  description
`

export const GET_ALL_DISTRICTS = gql`
  query districts {
    districts {
      ...District
    }
  }
  ${frag.District}
`

export const GET_DISTRICTS = gql`
  query district($nameSlug: String, $citySlug: String, $stateSlug: String) {
    district(nameSlug: $nameSlug, citySlug: $citySlug, stateSlug: $stateSlug) {
      ${District}
    }
  }
  ${frag.District}
`
