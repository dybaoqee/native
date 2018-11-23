import _ from 'lodash'
import {compose} from 'recompose'
import {Row, Col} from '@emcasa/ui-native'

import {withFavoriteMutation} from '@/graphql/containers'
import IconButton from '@/components/shared/IconButton'
import FavoriteButton from '@/components/listings/FavoriteButton'

function LeftButtons({favorite, onFavorite, onShare}) {
  return (
    <Row>
      <Col mr="20px">
        <FavoriteButton active={favorite} onPress={onFavorite} />
      </Col>
      <Col>
        <IconButton name="share-alt" color="white" onPress={onShare} />
      </Col>
    </Row>
  )
}

export default compose(withFavoriteMutation)(LeftButtons)
