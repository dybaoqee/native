import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import theme from '@/config/theme'
import composeWithRef from '@/lib/composeWithRef'
import {withListingsFeed} from '@/graphql/containers'
import {clearFilters} from '@/redux/modules/search'
import {getSearchFiltersQuery} from '@/redux/modules/search/selectors'
import {Shell, Body} from '@/components/layout'
import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'
import InfiniteScroll from '@/containers/InfiniteScroll'
import Feed from '@/components/listings/Feed/Listing'
import SearchLocation from './Location'
import ListHeader from './ListHeader'

import SearchFiltersScreen from '@/screens//listings/Search'
import ListingScreen from '@/screens//listing/Listing'
import ListEmpty from '@/components/shared/ListEmpty'

class ListingsFeedScreen extends PureComponent {
  static screenName = 'listings.Feed'

  static options = {
    topBar: {
      title: {text: 'Explorar'},
      leftButtons: [
        {
          id: 'listings.Feed#logo',
          icon: require('@/assets/img/icons/logo.png')
        }
      ],
      rightButtons: [
        {
          id: 'listings.Feed#filters',
          icon: require('@/assets/img/icons/filter.png'),
          color: theme.colors.grey
        }
      ]
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

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'listings.Feed#filters') {
      Navigation.showModal({
        component: {name: SearchFiltersScreen.screenName}
      })
    }
  }

  onLoadMore = () => {
    const {
      listingsFeed: {loading, fetchMore}
    } = this.props
    if (!loading) fetchMore()
  }

  onOpenLocationSearch = () => this.setState({modalActive: true})

  onCloseLocationSearch = () => this.setState({modalActive: false})

  onClearFilters = () => this.props.clearFilters()

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
      listingsFeed: {data, loading, remainingCount}
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
                  <ListEmpty
                    loading={loading}
                    title="Nenhum resultado encontrado"
                    buttonText="Limpar filtros"
                    image={require('@/assets/img/icons/sad_smartphone.png')}
                    onPress={this.onClearFilters}
                  >
                    A sua pesquisa não retornou nenhum imóvel. Altere ou limpe
                    os filtros para ver resultados.
                  </ListEmpty>
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
  connect(
    (state) => ({filters: getSearchFiltersQuery(state)}),
    {clearFilters}
  ),
  withListingsFeed(({filters}) => ({
    filters,
    pageSize: 15,
    fetchPolicy: 'network-only'
  }))
)(ListingsFeedScreen)
