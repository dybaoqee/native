import gql from 'graphql-tag'

export default gql`
  fragment District on District {
    city
    citySlug
    state
    stateSlug
    name
    nameSlug
    description
  }
`
