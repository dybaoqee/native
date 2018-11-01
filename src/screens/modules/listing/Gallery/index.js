import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {Modal, Body} from '@/components/layout'
import Gallery from '@/components/listings/Gallery'

class ListingGalleryScreen extends PureComponent {
  static screenName = 'listing.Gallery'

  static options = {
    layout: {
      orientation: ['portrait', 'landscape']
    }
  }

  render() {
    const {
      listing: {data, loading},
      onDismiss
    } = this.props

    return (
      <Modal testID="@listing.Gallery">
        <Body loading={loading}>
          <Modal.Header absolute onDismiss={onDismiss} />
          {data && <Gallery>{data.images}</Gallery>}
        </Body>
      </Modal>
    )
  }
}

export default composeWithRef(withListing(({params: {id}}) => ({id})))(
  ListingGalleryScreen
)
