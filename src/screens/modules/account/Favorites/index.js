import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withFavoriteListings} from '@/graphql/containers'
import {switchTab} from '@/screens/modules/navigation'
import {Shell, Body} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import Empty from './Empty'

import ListingScreen from '@/screens/modules/listing/Listing'

class FavoritesScreen extends PureComponent {
  static defaultProps = {
    favorites: {}
  }

  static screenName = 'account.Favorites'

  static options = {
    topBar: {
      title: {text: 'Meus imóveis favoritos'},
      backButton: {title: 'Favoritos'}
    }
  }

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, this.constructor.options)
  }

  onSelect = (id) =>
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })

  onExplore = () => {
    this.props.switchTab(0)
  }

  render() {
    const {
      favorites: {data, loading}
    } = this.props
    return (
      <Shell bottomTabs>
        <Body loading={loading}>
          <Feed
            data={data}
            onSelect={this.onSelect}
            ListEmptyComponent={
              <Empty loading={loading} onPress={this.onExplore} />
            }
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {switchTab}
  ),
  withFavoriteListings
)(FavoritesScreen)
