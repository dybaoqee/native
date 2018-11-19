import gql from 'graphql-tag'

export const InterestType = gql`
  fragment InterestType on InterestType {
    id
    name
  }
`

export default gql`
  fragment Interest on Interest {
    id
    name
    email
    phone
    message
    interestType {
      id
    }
    listing {
      id
    }
  }
`
