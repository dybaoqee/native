import {pick} from 'lodash'
import {PureComponent} from 'react'
import {Dimensions} from 'react-native'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {
  logGalleryOpen,
  logGalleryClose
} from '@/redux/modules/amplitude/logs/listingDetail'
import {Modal, Body} from '@/components/layout'
import Gallery from '@/components/listings/Gallery'

class ListingGalleryScreen extends PureComponent {
  static screenName = 'listing.Gallery'

  static options = {
    statusBar: {
      style: 'light',
      backgroundColor: 'black'
    },
    layout: {
      orientation: ['portrait', 'landscape']
    }
  }

  componentDidAppear() {
    this.props.logGalleryOpen(this.props.params)
  }

  componentDidDisappear() {
    this.props.logGalleryClose(this.props.params)
  }

  render() {
    const {
      listing: {data, loading},
      index,
      onDismiss
    } = this.props

    return (
      <Modal bg="black" testID="@listing.Gallery">
        <Body loading={loading}>
          <Modal.Header translucent color="white" onDismiss={onDismiss} />
          {data && (
            <Gallery
              scalable
              testID="listing_gallery"
              initialIndex={index}
              {...pick(Dimensions.get('window'), 'width', 'height')}
            >
              {data.images}
            </Gallery>
          )}
        </Body>
      </Modal>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {logGalleryOpen, logGalleryClose}
  ),
  withListing(({params: {id}}) => ({id}))
)(ListingGalleryScreen)
