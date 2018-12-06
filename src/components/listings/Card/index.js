import {cond, get, stubTrue} from 'lodash/fp'
import {Dimensions, StyleSheet} from 'react-native'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {compose} from 'recompose'
import {View, Row, Text} from '@emcasa/ui-native'

import * as format from '@/config/formatting'
import {withFavoriteMutation} from '@/graphql/containers'
import {touchable} from '@/components/shared/Touchable'
import Gallery from '@/components/listings/Gallery'
import Image from '@/components/listings/Image'
import FavoriteButton from '../FavoriteButton'

const stringifyProps = ({area, rooms, suites, bathrooms}) => {
  let result = `${area}m² - ${rooms} quarto${rooms != 1 ? 's' : ''}`
  if (suites) result += ` - ${suites} suíte${suites != 1 ? 's' : ''}`
  if (bathrooms)
    result += ` - ${bathrooms} banheiro${bathrooms != 1 ? 's' : ''}`
  return result
}

const ListingImages = ({images, width, showImages}) => {
  const visibleImages = images.slice(0, showImages)
  let imageProps = {
    width: width - 2,
    height: width * 0.64
  }
  if (visibleImages.length > 1)
    return <Gallery width={imageProps.width}>{visibleImages}</Gallery>
  if (visibleImages.length === 0) return <Image thumbnail {...imageProps} />
  else return <Image thumbnail {...imageProps} {...images[0]} />
}

const Header = styled(function ListingCardHeader({children, ...props}) {
  return (
    <View {...props}>
      <View
        zIndex={10}
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
      >
        {children}
      </View>
      <ListingImages {...props} />
    </View>
  )
})`
  overflow: hidden;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-bottom-width: 0;
`

const Body = styled.View`
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  background-color: ${cond([
    [get('pressed'), () => 'rgba(216, 216, 216, 0.5)'],
    [stubTrue, () => 'white']
  ])};
`

function ListingCard({
  width,
  images,
  address,
  price,
  favorite,
  onFavorite,
  showImages,
  index,
  ...props
}) {
  const innerWidth = parseInt(width) - parseInt(props.ml) - parseInt(props.mr)
  return (
    <View {...props}>
      <View testID={`listing_card(${index + 1})`}>
        <Header images={images} width={innerWidth} showImages={showImages}>
          <View style={{position: 'absolute', top: 10, right: 10}}>
            <FavoriteButton
              contrast
              testID="favorite_button"
              hitSlop={15}
              active={favorite}
              onPress={onFavorite}
            />
          </View>
        </Header>
        <Body pressed={props.active}>
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
            <Text fontSize="20px" fontWeight="500">
              {price
                ? `R$ ${format.number(price)}`
                : String.fromCharCode(0x2500)}
            </Text>
          </Row>
        </Body>
      </View>
    </View>
  )
}

ListingCard.defaultProps = {
  testUniqueID: '',
  ml: 0,
  mr: 0,
  showImages: 4,
  get width() {
    return Dimensions.get('window').width
  }
}

export default compose(
  touchable,
  withFavoriteMutation
)(ListingCard)
