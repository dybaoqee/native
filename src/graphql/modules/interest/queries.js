import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const GET_INTEREST_TYPES = gql`
  query interestTypes {
    ...InterestType
  }
  ${frag.InterestType}
`
