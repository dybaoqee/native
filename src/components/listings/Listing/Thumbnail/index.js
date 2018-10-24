import {Component, Fragment} from 'react'
import {View, TouchableOpacity, Dimensions} from 'react-native'

import BaseIcon from '@/components/shared/Icon'
import LikeIcon from '@/components/listings/LikeIcon'
import BlacklistIcon from '@/components/listings/BlacklistIcon'
import Image from '@/components/listings/Image'
import Gallery from '@/components/listings/Gallery'
import styles, {iconColor} from './styles'

const ActionButton = ({children, title, onPress, hitSlop}) => (
  <View style={styles.button}>
    <TouchableOpacity
      accessible
      accessibilityLabel={title}
      accessibilityTraits="button"
      hitSlop={{
        top: hitSlop,
        bottom: hitSlop,
        left: hitSlop,
        right: hitSlop
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  </View>
)

ActionButton.defaultProps = {
  hitSlop: 5
}

const Icon = (props) => <BaseIcon size={20} color={iconColor} {...props} />

export default class ListingThumbnail extends Component {
  onOpenGallery = () => this.props.onOpenGallery()

  onOpenTour = () => {
    this.props.onOpenTour()
    this.props.onViewTour()
  }

  render() {
    const {
      testID,
      images,
      favorite,
      blacklisted,
      matterportCode,
      isActive,
      onFavorite,
      onBlacklist,
      onShare
    } = this.props
    let {width, height} = Dimensions.get('window')
    height = width * 0.64
    return (
      <View style={styles.container} testID={testID}>
        <View>
          {images && images.length ? (
            <Gallery testID={`${testID}_gallery`} width={width} height={height}>
              {images.slice(0, 4)}
            </Gallery>
          ) : (
            <Image width={width} height={height} />
          )}
        </View>
        <View style={styles.actionRow}>
          <View style={styles.actionCell}>
            {isActive && (
              <Fragment>
                <ActionButton
                  title={
                    favorite
                      ? 'Adicionar aos favoritos'
                      : 'Remover dos favoritos'
                  }
                  onPress={onFavorite}
                >
                  <LikeIcon active={favorite} size={20} />
                </ActionButton>
                <ActionButton
                  title={blacklisted ? 'Ocultar' : 'Exibir'}
                  onPress={onBlacklist}
                >
                  <BlacklistIcon active={blacklisted} size={20} />
                </ActionButton>
              </Fragment>
            )}
          </View>
          <View style={styles.actionCell}>
            {Boolean(images.length) && (
              <ActionButton title="Ver imagens" onPress={this.onOpenGallery}>
                <Icon name="image" />
              </ActionButton>
            )}
            {Boolean(matterportCode) && (
              <ActionButton title="Ver em tela cheia" onPress={this.onOpenTour}>
                <Icon name="cube" />
              </ActionButton>
            )}
            {isActive && (
              <ActionButton title="Compartilhar" onPress={onShare}>
                <Icon name="share-alt" />
              </ActionButton>
            )}
          </View>
        </View>
      </View>
    )
  }
}
