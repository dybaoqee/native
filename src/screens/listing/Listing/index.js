import _ from 'lodash'
import React, {PureComponent} from 'react'
import {InteractionManager} from 'react-native'
import {Navigation} from 'react-native-navigation'
import Share from 'react-native-share'
import {connect} from 'react-redux'
import {Row, Button, Text} from '@emcasa/ui-native'

import {FRONTEND_URL} from '@/config/const'
import composeWithRef from '@/lib/composeWithRef'
import {debounceTransition} from '@/lib/navigation/helpers'
import {
  withListing,
  withViewTourMutation,
  withRelatedListings
} from '@/graphql/containers'
import {logEvent} from '@/redux/modules/amplitude'
import {getCurrentScreen} from '@/redux/modules/navigation/selectors'
import {Shell, Body, Header, Footer, Section} from '@/components/layout'
import Listing from '@/components/listings/Listing'
import Feed from '@/components/listings/Feed/Horizontal'
import RightButtons from './RightButtons'

import * as format from '@/config/formatting'
import GalleryScreen from '@/screens//listing/Gallery'
import TourScreen from '@/screens//listing/Tour'
import InterestFormScreen from '@/screens//interest/Form'
import Spinner from '@/components/shared/Spinner'

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
    ready: false
  }

  webViewRef = React.createRef()

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
    InteractionManager.runAfterInteractions(() => this.setState({ready: true}))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentScreen.id !== this.props.currentScreen.id) {
      const {
        componentId,
        currentScreen,
        params: {id},
        logEvent
      } = this.props
      const pattern = new RegExp(`^${componentId}(\\_\\w+)?$`)
      const wasPreviouslyOpen = pattern.test(prevProps.currentScreen.id)
      const isCurrentlyOpen = pattern.test(currentScreen.id)
      if (wasPreviouslyOpen && !isCurrentlyOpen)
        logEvent('listing-detail-close', {id})
      else if (!wasPreviouslyOpen && isCurrentlyOpen)
        logEvent('listing-detail-open', {id})
    }
  }

  onDismiss = _.once(() => {
    const {componentId} = this.props
    if (this.webViewRef.current) this.webViewRef.current.stopLoading()
    Navigation.pop(componentId)
  })

  onOpenGallery = debounceTransition((index) => {
    Navigation.showModal({
      component: {
        id: `${this.props.componentId}_gallery`,
        name: GalleryScreen.screenName,
        passProps: {
          index,
          params: this.props.params,
          onDismiss: () => Navigation.dismissAllModals()
        }
      }
    })
  })

  onOpenTour = debounceTransition(() => {
    Navigation.showModal({
      component: {
        id: `${this.props.componentId}_tour`,
        name: TourScreen.screenName,
        passProps: {
          params: this.props.params,
          onDismiss: () => Navigation.dismissAllModals()
        }
      }
    })
  })

  onOpenInterestForm = debounceTransition(() => {
    Navigation.push(this.props.componentId, {
      component: {
        id: `${this.props.componentId}_interest`,
        name: InterestFormScreen.screenName,
        passProps: {params: this.props.params}
      }
    })
  })

  onShare = async () => {
    const {
      logEvent,
      params: {id}
    } = this.props
    try {
      const {app} = await Share.open(this.shareOptions)
      logEvent('listing-shared', {id, app})
    } catch (error) {
      /* User closed modal */
    }
  }

  onSelectListing = debounceTransition((id) => {
    this.props.logEvent('listing-detail-view-featured-listing', {
      id
    })
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  })

  onViewTour = _.once(() => this.props.onViewTour())

  onChangeGalleryIndex = (index, previousIndex) => {
    requestAnimationFrame(() => {
      const action = index > previousIndex ? 'right' : 'left'
      this.props.logEvent(`listing-detail-photos-${action}`, {
        id: this.props.params.id
      })
    })
  }

  onMapInteraction = _.debounce(
    () => {
      requestAnimationFrame(() => {
        this.props.logEvent('listing-detail-map', {
          id: this.props.params.id
        })
      })
    },
    1000,
    {leading: true, trailing: false}
  )

  renderRightButtons = () => {
    return <RightButtons id={this.props.params.id} onShare={this.onShare} />
  }

  render() {
    const {
      listing: {data, loading},
      relatedListings
    } = this.props
    const {ready} = this.state

    const isActive = data && data.isActive
    return (
      <Shell testID="@listing.Listing">
        <Body
          scroll={!loading}
          loading={loading}
          onScroll={this.onScroll}
          scrollEventThrottle={10}
          bounces={false}
        >
          <Header
            translucent
            color={isActive ? 'white' : 'pink'}
            onDismiss={this.onDismiss}
            RightButtons={this.renderRightButtons}
          >
            {isActive && `${data.address.neighborhood} (${data.area}m²)`}
          </Header>
          {data && (
            <Listing
              {...data}
              webViewRef={this.webViewRef}
              ready={ready}
              onViewTour={this.onViewTour}
              onOpenGallery={this.onOpenGallery}
              onOpenTour={this.onOpenTour}
              onChangeGalleryIndex={this.onChangeGalleryIndex}
              onMapInteraction={this.onMapInteraction}
            />
          )}
          {!ready ? (
            <Row height={60} justifyContent="center" alignItems="center">
              <Spinner size={15} />
            </Row>
          ) : isActive ? (
            <Section title="Veja Também" mt={0}>
              <Feed
                pl="5px"
                data={relatedListings.data}
                onSelect={this.onSelectListing}
              />
            </Section>
          ) : null}
        </Body>
        {data && (
          <Footer p="15px">
            {data.price && (
              <Row mb="5px" justifyContent="flex-start" alignItems="baseline">
                <Text
                  color="pink"
                  textAlign="center"
                  fontWeight="500"
                  fontSize="30px"
                >
                  R$
                  {format.number(data.price)}
                </Text>
                <Text
                  style={{marginLeft: 5}}
                  color="grey"
                  fontWeight="500"
                  fontSize="12px"
                  lineHeight="30px"
                >
                  VENDA
                </Text>
              </Row>
            )}
            <Button active height="tall" onPress={this.onOpenInterestForm}>
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
    (state) => ({
      currentScreen: getCurrentScreen(state)
    }),
    {logEvent}
  ),
  withViewTourMutation,
  withListing(({params: {id}}) => ({id})),
  withRelatedListings(({params: {id}}) => ({id}))
)(ListingScreen)
