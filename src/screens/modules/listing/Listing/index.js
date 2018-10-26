import _ from 'lodash'
import {PureComponent} from 'react'
import {View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import Share from 'react-native-share'
import {connect} from 'react-redux'
import {Button} from '@emcasa/ui-native'

import {FRONTEND_URL} from '@/config/const'
import composeWithRef from '@/lib/composeWithRef'
import {withListing} from '@/graphql/containers'
import {logEvent} from '@/redux/modules/firebase/analytics'
import {load as loadRelatedListings} from '@/redux/modules/relatedListings'
import {getRelatedListings} from '@/redux/modules/relatedListings/selectors'
import {Shell, Body, Header, Footer, Section} from '@/components/layout'
import Feed from '@/components/listings/Feed/Related'
import Listing from './Listing'

import GalleryScreen from '@/screens/modules/listing/Gallery'
import TourScreen from '@/screens/modules/listing/Tour'
import InterestFormScreen from '@/screens/modules/interest/Form'

class ListingScreen extends PureComponent {
  static screenName = 'listing.Listing'

  static options = {
    topBar: {
      drawBehind: true,
      visible: false,
      backButton: {title: ''}
    }
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

  componentDidMount() {
    const {
      relatedListings,
      loadRelatedListings,
      params: {id}
    } = this.props
    if (_.isEmpty(relatedListings)) loadRelatedListings(id)
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

  openModal = (idSuffix, component) => {
    const {params, componentId} = this.props
    const id = `${componentId}_${idSuffix}`
    Navigation.showModal({
      component: {
        ...component,
        id,
        passProps: {
          params,
          onDismiss: () => Navigation.dismissModal(id)
        }
      }
    })
  }

  onOpenGallery = () =>
    this.openModal('gallery', {
      name: GalleryScreen.screenName
    })

  onOpenTour = () =>
    this.openModal('tour', {
      name: TourScreen.screenName
    })

  onPopScreen = _.once(() => {
    Navigation.pop(this.props.componentId)
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

  renderRelatedListings() {
    const {relatedListings} = this.props
    return <Feed data={relatedListings} onSelect={this.onSelectListing} />
  }

  render() {
    const {
      listing: {data, loading},
      componentId
    } = this.props

    const isActive = data && data.isActive
    return (
      <Shell>
        <Header translucent backButton={componentId}>
          {isActive && `${data.address.neighborhood} (${data.area}m²)`}
        </Header>
        <Body scroll loading={loading}>
          {data && (
            <Listing
              {...data}
              onOpenGallery={this.onOpenGallery}
              onOpenTour={this.onOpenTour}
              onShare={this.onShare}
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
    (state, {params}) => ({
      relatedListings: getRelatedListings(state, params)
    }),
    {loadRelatedListings, logEvent}
  ),
  withListing(({params: {id}}) => ({id}))
)(ListingScreen)
