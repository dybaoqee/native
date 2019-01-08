import {compose} from 'recompose'
import {Row, Col} from '@emcasa/ui-native'

import {withFavoriteMutation} from '@/graphql/containers'
import IconButton from '@/components/shared/IconButton'
import FavoriteButton from '@/components/listings/FavoriteButton'

const iconSize = 15
const iconSpacing = '8px'

function RightButtons({favorite, onFavorite, onShare, onShowTourSlide}) {
  return (
    <Row>
      {onShowTourSlide && (
        <Col mr={iconSpacing}>
          <IconButton
            size={iconSize}
            testID="tour_button"
            name="vr-cardboard"
            color="white"
            onPress={onShowTourSlide}
          />
        </Col>
      )}
      <Col mr={iconSpacing}>
        <FavoriteButton
          size={iconSize}
          testID="favorite_button"
          active={favorite}
          onPress={() => onFavorite()}
        />
      </Col>
      <Col>
        <IconButton
          size={iconSize}
          name="share-alt"
          color="white"
          onPress={onShare}
        />
      </Col>
    </Row>
  )
}

export default compose(withFavoriteMutation)(RightButtons)
