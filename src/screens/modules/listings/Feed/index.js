import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withListingsFeed} from '@/graphql/containers'
import {getSearchFiltersQuery} from '@/redux/modules/search/selectors'
import {Shell, Body, Header} from '@/components/layout'
import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'
import InfiniteScroll from '@/containers/InfiniteScroll'
import Feed from '@/components/listings/Feed/Listing'
import SearchLocation from './Location'
import SearchHeader from './Header'
import ListEmpty from './ListEmpty'
import ListHeader from './ListHeader'

import SearchFiltersScreen from '@/screens/modules/listings/Search'
import ListingScreen from '@/screens/modules/listing/Listing'

class ListingsFeedScreen extends PureComponent {
  static screenName = 'listings.Feed'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      translucent: true,
      height: 0,
      backButton: {title: 'Imóveis'}
    }
  }

  state = {
    modalActive: false
  }

  componentDidDisappear() {
    const {
      listingsFeed: {loading, updateBlacklists}
    } = this.props
    if (!loading) updateBlacklists()
  }

  onLoadMore = () => {
    const {
      listingsFeed: {loading, fetchMore}
    } = this.props
    if (!loading) fetchMore()
  }

  onOpenFilters = () => {
    Navigation.showModal({
      component: {name: SearchFiltersScreen.screenName}
    })
  }

  onOpenLocationSearch = () => this.setState({modalActive: true})

  onCloseLocationSearch = () => this.setState({modalActive: false})

  onSelect = (id) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  render() {
    const {
      listingsFeed: {loading, data, remainingCount}
    } = this.props
    const {modalActive} = this.state
    return (
      <Shell
        testID="@listings.Feed"
        bottomTabs={{
          icon: modalActive ? 'check' : 'map-marker-alt',
          onPress: modalActive
            ? this.onCloseLocationSearch
            : this.onOpenLocationSearch
        }}
      >
        <SearchLocation
          visible={modalActive}
          onDismiss={this.onCloseLocationSearch}
          zIndex={2}
        />
        <Header>
          <SearchHeader onPress={this.onOpenFilters} />
        </Header>
        <Body loading={loading}>
          <InfiniteScroll
            loading={loading}
            hasNextPage={remainingCount > 0}
            onLoad={this.onLoadMore}
          >
            <BottomTabsAvoidingScrollView>
              <Feed
                testID="listing_feed"
                automaticallyAdjustContentInsets={false}
                data={data}
                onSelect={this.onSelect}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={
                  loading === false && !data.length ? ListEmpty : undefined
                }
              />
            </BottomTabsAvoidingScrollView>
          </InfiniteScroll>
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect((state) => ({filters: getSearchFiltersQuery(state)})),
  withListingsFeed(({filters}) => ({
    filters,
    pageSize: 15,
    fetchPolicy: 'cache-and-network'
  }))
)(ListingsFeedScreen)
