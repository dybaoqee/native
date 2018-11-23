import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import Share from 'react-native-share'
import {connect} from 'react-redux'
import {Button} from '@emcasa/ui-native'

import {FRONTEND_URL} from '@/config/const'
import composeWithRef from '@/lib/composeWithRef'
import {
  withListing,
  withViewTourMutation,
  withRelatedListings
} from '@/graphql/containers'
import {logEvent} from '@/redux/modules/firebase/analytics'
import {Shell, Body, Header, Footer, Section} from '@/components/layout'
import Listing from '@/components/listings/Listing'
import Feed from '@/components/listings/Feed/Related'
import RightButtons from './RightButtons'

import GalleryScreen from '@/screens//listing/Gallery'
import TourScreen from '@/screens//listing/Tour'
import InterestFormScreen from '@/screens//interest/Form'

class ListingScreen extends PureComponent {
  static screenName = 'listing.Listing'

  static options = {
    topBar: {
      drawBehind: true,
      visible: false,
      backButton: {title: ''}
    }
  }

  state = {
    bounces: false,
    visible: false
  }

  get shareOptions() {
    const {
      id,
      type,
      address: {
        street,
        neighborhood,
        city,
        streetSlug,
        neighborhoodSlug,
        citySlug,
        stateSlug
      }
    } = this.props.listing.data
    return {
      url: `${FRONTEND_URL}/imoveis/${stateSlug}/${citySlug}/${neighborhoodSlug}/${streetSlug}/id-${id}`,
      message: `${type} na ${street}, ${neighborhood}, ${city}`
    }
  }

  componentDidAppear() {
    this.setState({visible: true})
  }

  componentDidDisappear() {
    this.setState({visible: false})
  }

  navigateTo = (component, params = this.props.params) => () => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        ...component,
        passProps: {
          params: {...params, parentId: componentId}
        }
      }
    })
  }

  onPopScreen = _.once(() => {
    Navigation.pop(this.props.componentId)
  })

  onOpenGallery = (index) => {
    Navigation.showModal({
      component: {
        name: GalleryScreen.screenName,
        passProps: {
          index,
          params: this.props.params,
          onDismiss: () => Navigation.dismissAllModals()
        }
      }
    })
  }

  onOpenTour = () => {
    Navigation.showModal({
      component: {
        name: TourScreen.screenName,
        passProps: {
          params: this.props.params,
          onDismiss: () => Navigation.dismissAllModals()
        }
      }
    })
  }

  onScroll = ({nativeEvent: {contentOffset, contentSize, layoutMeasurement}}) =>
    this.setState({
      bounces:
        contentOffset.y > contentSize.height / 2 - layoutMeasurement.height / 2
    })

  onShare = async () => {
    const {
      logEvent,
      params: {id}
    } = this.props
    try {
      const {app} = await Share.open(this.shareOptions)
      logEvent('share_listing', {id, app})
    } catch (error) {
      /* User closed modal */
    }
  }

  onSelectListing = (id) =>
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })

  onViewTour = _.once(() => this.props.onViewTour())

  renderRelatedListings() {
    const {relatedListings} = this.props
    return <Feed data={relatedListings.data} onSelect={this.onSelectListing} />
  }

  render() {
    const {
      listing: {data, loading},
      params: {id},
      componentId
    } = this.props
    const {bounces, visible} = this.state

    const isActive = data && data.isActive
    return (
      <Shell>
        <Header.StatusBar bg="white" />
        <Body
          scroll={!loading}
          loading={loading}
          onScroll={this.onScroll}
          scrollEventThrottle={10}
          bounces={bounces}
        >
          <Header
            translucent
            statusBar={false}
            color={isActive ? 'white' : 'pink'}
            backButton={componentId}
            rightButtons={<RightButtons id={id} onShare={this.onShare} />}
          >
            {isActive && `${data.address.neighborhood} (${data.area}m²)`}
          </Header>
          {data && (
            <Listing
              {...data}
              ready={visible}
              onViewTour={this.onViewTour}
              onOpenGallery={this.onOpenGallery}
              onOpenTour={this.onOpenTour}
            />
          )}
          {isActive && (
            <Section title="Veja Também">
              {this.renderRelatedListings()}
            </Section>
          )}
        </Body>
        {!loading && (
          <Footer p="15px">
            <Button
              active
              height="tall"
              onPress={this.navigateTo({name: InterestFormScreen.screenName})}
            >
              Marcar visita
            </Button>
          </Footer>
        )}
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {logEvent}
  ),
  withListing(({params: {id}}) => ({id})),
  withRelatedListings(({params: {id}}) => ({id})),
  withViewTourMutation
)(ListingScreen)
