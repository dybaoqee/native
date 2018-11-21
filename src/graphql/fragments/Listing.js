import gql from 'graphql-tag'

import Image from './Image'
import Address from './Address'

const Listing = gql`
  fragment Listing on Listing {
    id
    type
    price
    area
    balconies
    rooms
    bathrooms
    restrooms
    suites
    dependencies
    floor
    garageSpots
    hasElevator
    isExclusive
    isRelease
    isActive
    maintenanceFee
    propertyTax
    matterportCode
    description
    images {
      ...Image
    }
    address {
      ...Address
    }
  }
  ${Image}
  ${Address}
`

export default Listing

Listing.parse = ({address, images, ...listing}) => ({
  ...listing,
  __typename: 'Listing',
  address: Address.parse(address),
  images: images.map(Image.parse)
})

export const ListingFeed = gql`
  fragment ListingFeed on Listing {
    id
    price
    area
    rooms
    suites
    isExclusive
    isRelease
    isActive
    description
    images(isActive: true) {
      position
      filename
    }
    address {
      ...Address
    }
  }
  ${Address}
`

export const UserListing = gql`
  fragment UserListing on Listing {
    ...Listing
    complement
    inPersonVisitCount
    interestCount
    listingFavoriteCount
    listingVisualisationCount
    tourVisualisationCount
    images {
      position
      filename
    }
    address {
      ...Address
      streetNumber
    }
  }
  ${Listing}
  ${Address}
`
