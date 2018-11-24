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

  state = {layout: {}}

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  render() {
    const {
      listing: {data, loading},
      onDismiss
    } = this.props
    const {layout} = this.state

    return (
      <Modal bg="black" testID="@listing.Tour">
        <Body loading={loading} onLayout={this.onLayout}>
          <Modal.Header
            translucent
            color="white"
            style={{marginTop: 60, justifyContent: 'flex-end'}}
            onDismiss={onDismiss}
          />
          {data && <Matterport code={data.matterportCode} {...layout} />}
        </Body>
      </Modal>
    )
  }
}

export default composeWithRef(withListing(({params: {id}}) => ({id})))(
  ListingTourScreen
)
