import gql from 'graphql-tag'

export const GET_INTEREST_TYPES = gql`
  query interestTypes {
    interestTypes {
      id
      name
    }
  }
`
