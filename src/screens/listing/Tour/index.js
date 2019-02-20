import {PureComponent} from 'react'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {logEvent} from '@/redux/modules/amplitude'
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

  componentDidAppear() {
    this.props.logEvent('listing-detail-matterport-open', {
      id: this.props.params.id
    })
  }

  componentDidDisappear() {
    this.props.logEvent('listing-detail-matterport-close', {
      id: this.props.params.id
    })
  }

  render() {
    const {
      listing: {data, loading},
      onDismiss
    } = this.props

    return (
      <Modal bg="black" testID="@listing.Tour">
        <Body loading={loading} onLayout={this.onLayout}>
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

export default composeWithRef(
  connect(
    null,
    {logEvent}
  ),
  withListing(({params: {id}}) => ({id}))
)(ListingTourScreen)
