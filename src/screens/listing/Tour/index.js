import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {Modal, Body} from '@/components/layout'
import Matterport from '@/components/listings/Matterport'

class ListingTourScreen extends PureComponent {
  static screenName = 'listing.Tour'

  static options = {
    statusBar: {
      style: 'light',
      backgroundColor: 'black'
    },
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
      <Modal bg="black" testID="@listing.Tour">
        <Body loading={loading}>
          <Modal.Header
            translucent
            color="white"
            style={{marginTop: 60, justifyContent: 'flex-end'}}
            onDismiss={onDismiss}
          />
          {data && <Matterport code={data.matterportCode} />}
        </Body>
      </Modal>
    )
  }
}

export default composeWithRef(withListing(({params: {id}}) => ({id})))(
  ListingTourScreen
)
