import {Fragment} from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {compose} from 'recompose'
import {View, Row, Text} from '@emcasa/ui-native'

import * as format from '@/assets/format.js'
import {withFavoriteMutation, withBlacklistMutation} from '@/graphql/containers'
import Gallery from '@/components/listings/Gallery'
import Image from '@/components/listings/Image'
import FavoriteButton from '../FavoriteButton'

const stringifyProps = ({area, rooms, suites}) => {
  let result = `${area}m² - ${rooms} quartos`
  if (suites) result += ` - ${suites} suites`
  return result
}

const Header = styled(function ListingCardHeader({
  children,
  images,
  width,
  ...props
}) {
  const imageSize = {
    width,
    height: width * 0.64
  }
  return (
    <View {...props}>
      <View
        zIndex={10}
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
      >
        {children}
      </View>
      {images.length ? (
        <Gallery>{images.slice(0, 4)}</Gallery>
      ) : (
        <Image thumbnail {...imageSize} />
      )}
    </View>
  )
})`
  overflow: hidden;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`

const Body = styled.View`
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid ${themeGet('colors.lightGrey')};
`

function ListingCard({
  width,
  images,
  address,
  price,
  favorite,
  onFavorite,
  onPress,
  testUniqueID,
  ...props
}) {
  return (
    <View {...props}>
      <View testID={`listing_card(${testUniqueID})`}>
        <Header images={images} width={width}>
          <View style={{position: 'absolute', top: 10, right: 10}}>
            <FavoriteButton
              contrast
              testID="favorite_button"
              active={favorite}
              onPress={onFavorite}
              accessibilityLabel={
                favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
              }
            />
          </View>
        </Header>
        <Body>
          <Row mb="4px">
            <Text fontSize="16px">{address.neighborhood.toUpperCase()}</Text>
          </Row>
          <Row mb="4px">
            <Text fontSize="14px" numberOfLines={1} ellipsizeMode="tail">
              {address.street}
            </Text>
          </Row>
          <Row>
            <Text fontSize="14px" color="grey">
              {stringifyProps(props)}
            </Text>
          </Row>
          <Row>
            <Text fontSize="20px" fontWeight="500">{`R$ ${format.number(
              price
            )}`}</Text>
          </Row>
        </Body>
      </View>
    </View>
  )
}

ListingCard.defaultProps = {
  testUniqueID: '',
  get width() {
    return Dimensions.get('window').width
  }
}

export default compose(
  withFavoriteMutation,
  withBlacklistMutation
)(ListingCard)
