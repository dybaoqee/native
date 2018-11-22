import gql from 'graphql-tag'

export const INSERT_INTEREST = gql`
  mutation interestCreate($input: InterestInput!) {
    interestCreate(input: $input) {
      id
    }
  }
`
