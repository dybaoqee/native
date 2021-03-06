import _ from 'lodash'
import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import {View} from '@emcasa/ui-native'

import theme from '@/config/theme'
import composeWithRef from '@/lib/composeWithRef'
import {withListingsFeed, withDistricts} from '@/graphql/containers'
import {debounceTransition} from '@/lib/navigation/helpers'
import {
  logFiltersClear,
  logSearchLoadMore
} from '@/redux/modules/amplitude/logs/search'
import {clearFilters} from '@/redux/modules/search'
import {
  getSearchFiltersQuery,
  getSearchCity
} from '@/redux/modules/search/selectors'
import {Shell, Body} from '@/components/layout'
import BottomTabsSpacer from '@/components/layout/BottomTabs/Spacer'
import InfiniteScroll from '@/containers/InfiniteScroll'
import Feed from '@/components/listings/Feed/Vertical'
import SearchLocation from './Location'
import ListHeader from './ListHeader'

import SearchFiltersScreen from '@/screens//listings/Search'
import ListingScreen from '@/screens//listing/Listing'
import ListEmpty from '@/components/shared/ListEmpty'

import Modal from '@/screens/shared/Modal'
import Spinner from '@/components/shared/Spinner'

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
    loadMoreCount: 0,
    modalVisible: false
  }

  listRef = React.createRef()

  componentDidMount() {
    if (!this.props.citySlug && process.env.NODE_ENV !== 'e2e')
      requestAnimationFrame(() => this.onOpenLocationSearch())
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.filters, this.props.filters)) {
      this.setState({loadMoreCount: 0})
      this.resetScrollPosition()
    }
  }

  get bottomTabsProps() {
    const {modalVisible} = this.state
    return {
      icon: modalVisible ? 'check' : 'map-marker-alt',
      type: modalVisible ? 'light' : 'solid',
      onPress: modalVisible
        ? this.onCloseLocationSearch
        : this.onOpenLocationSearch
    }
  }

  navigationButtonPressed({buttonId}) {
    switch (buttonId) {
      case 'listings.Feed#filters':
        Navigation.showModal({
          component: {name: SearchFiltersScreen.screenName}
        })
        break
      case 'listings.Feed#logo':
        this.resetScrollPosition()
        break
    }
  }

  resetScrollPosition = () => {
    if (!this.listRef.current) return
    this.listRef.current.scrollToOffset({animated: true, offset: 0})
  }

  onLoadMore = () => {
    const {
      listingsFeed: {loading, fetchMore}
    } = this.props
    if (!loading) {
      this.setState(
        (state) => ({
          loadMoreCount: state.loadMoreCount + 1
        }),
        () => {
          fetchMore()
          this.props.logSearchLoadMore({
            loadMoreCount: this.state.loadMoreCount
          })
        }
      )
    }
  }

  onOpenLocationSearch = debounceTransition(() =>
    this.setState({modalVisible: true}, () =>
      Modal.show({
        passProps: {
          onDismissed: () => this.setState({modalVisible: false}),
          bottomTabs: {
            ...this.bottomTabsProps,
            onSwitchTab: this.onCloseLocationSearch
          },
          children: (
            <SearchLocation
              districts={this.props.districts}
              onDismiss={this.onCloseLocationSearch}
            />
          )
        }
      })
    )
  )

  onCloseLocationSearch = debounceTransition(() => {
    if (this.state.modalVisible) Modal.hide()
  })

  onClearFilters = () => {
    this.props.clearFilters()
    this.props.logFiltersClear({
      filters: Object.keys(this.props.filters),
      values: {}
    })
  }

  onSelect = debounceTransition((id) =>
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  )

  onBottomTabsLayout = (height) =>
    this.setState({
      scrollIndicatorInsets: {
        right: 0,
        left: 0,
        top: 0,
        bottom: height
      }
    })

  renderListFooter = () => {
    const {
      listingsFeed: {loading}
    } = this.props
    return (
      <View>
        <View
          height={15}
          p="5px"
          mb="40px"
          justifyContent="center"
          alignItems="center"
        >
          {loading && <Spinner size={15} />}
        </View>
        <BottomTabsSpacer />
      </View>
    )
  }

  renderListEmpty = () => {
    const {
      listingsFeed: {loading}
    } = this.props
    return (
      <ListEmpty
        loading={loading}
        title="Nenhum resultado encontrado"
        buttonText="Limpar filtros"
        image={require('@/assets/img/icons/sad_smartphone.png')}
        onPress={this.onClearFilters}
      >
        A sua pesquisa não retornou nenhum imóvel. Altere ou limpe os filtros
        para ver resultados.
      </ListEmpty>
    )
  }

  render() {
    const {
      listingsFeed: {data, loading, remainingCount}
    } = this.props
    const {scrollIndicatorInsets} = this.state
    return (
      <Shell testID="@listings.Feed" bottomTabs={this.bottomTabsProps}>
        <Body loading={loading}>
          <BottomTabsSpacer onChange={this.onBottomTabsLayout} />
          <InfiniteScroll
            loading={loading}
            hasNextPage={remainingCount > 0}
            onLoad={this.onLoadMore}
          >
            <Feed
              ref={this.listRef}
              testID="listing_feed"
              automaticallyAdjustContentInsets={false}
              data={data}
              scrollIndicatorInsets={scrollIndicatorInsets}
              onSelect={this.onSelect}
              ListHeaderComponent={ListHeader}
              ListFooterComponent={this.renderListFooter}
              ListEmptyComponent={this.renderListEmpty}
            />
          </InfiniteScroll>
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      citySlug: getSearchCity(state),
      filters: getSearchFiltersQuery(state)
    }),
    {logFiltersClear, logSearchLoadMore, clearFilters}
  ),
  withListingsFeed(({filters}) => ({
    filters,
    pageSize: 15,
    fetchPolicy: 'network-only'
  })),
  withDistricts(() => ({
    fetchPolicy: 'cache-and-network'
  }))
)(ListingsFeedScreen)
