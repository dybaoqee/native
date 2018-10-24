import {Fragment} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'
import {compose} from 'recompose'

import {withFavoriteMutation, withBlacklistMutation} from '@/graphql/containers'
import LikeIcon from '@/components/listings/LikeIcon'
import BlacklistIcon from '@/components/listings/BlacklistIcon'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'
import Price from '@/components/shared/Price'
import Image from '@/components/listings/Image'
import Gallery from '@/components/listings/Gallery'
import styles, {iconColor} from './styles'

function Button({children, icon, ...props}) {
  return (
    <TouchableOpacity
      {...props}
      accessible
      style={styles.iconButton}
      hitSlop={{
        top: 15,
        bottom: 15,
        left: 5,
        right: 5
      }}
    >
      {children || <Icon name={icon} size={19} color={iconColor} />}
    </TouchableOpacity>
  )
}

function ListingCard({
  style,
  address,
  images,
  width,
  price,
  isActive,
  favorite,
  blacklisted,
  onFavorite,
  onBlacklist,
  onPress,
  testUniqueID,
  ...props
}) {
  const padding = 15
  const imageSize = {
    width: width - padding * 2,
    height: width * 0.64 - padding * 2
  }
  const imageStyle = {opacity: blacklisted ? 0.5 : 1}

  return (
    <View
      style={[
        styles.container,
        blacklisted && styles.containerBlacklisted,
        style,
        {width}
      ]}
      {...props}
    >
      <View testID={`listing_card(${testUniqueID})`}>
        <View style={[styles.thumbnail, imageSize]}>
          {images.length ? (
            <Gallery style={imageStyle} {...imageSize}>
              {images.slice(0, 4)}
            </Gallery>
          ) : (
            <Image
              thumbnail
              style={[styles.image, imageStyle]}
              {...imageSize}
            />
          )}
        </View>
        <View style={styles.body}>
          <View style={[styles.row, styles.buttonsRow]}>
            <View style={styles.row}>
              {isActive && (
                <Fragment>
                  <Button
                    testID="favorite_button"
                    onPress={onFavorite}
                    accessibilityLabel={
                      favorite
                        ? 'Remover dos favoritos'
                        : 'Adicionar aos favoritos'
                    }
                  >
                    <LikeIcon active={favorite} size={19} />
                  </Button>
                  <Button
                    testID="blacklist_button"
                    onPress={onBlacklist}
                    accessibilityLabel={blacklisted ? 'Exibir' : 'Ocultar'}
                  >
                    <BlacklistIcon active={blacklisted} size={19} />
                  </Button>
                </Fragment>
              )}
            </View>
            <View style={styles.row}>
              <Button
                hitSlop={30}
                label="Visualizar"
                icon="share"
                testID="view_button"
                onPress={onPress}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.street} numberOfLines={1} ellipsizeMode="tail">
              {address.street}
            </Text>
            <Text style={styles.neighborhood}>
              {address.neighborhood.toUpperCase()}
            </Text>
          </View>
          <Price nullable size={22} styles={{text: styles.priceText}}>
            {price}
          </Price>
        </View>
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

export default compose(withFavoriteMutation, withBlacklistMutation)(ListingCard)
