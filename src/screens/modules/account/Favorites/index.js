import {uniqueId} from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import composeWithRef from '@/lib/composeWithRef'
import {withFavoriteListings} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import ListEmpty from './ListEmpty'

import ListingScreen from '@/screens/modules/listing/Listing'
import HeaderLogo from '@/screens/modules/shared/Header/Logo'

class FavoritesScreen extends PureComponent {
  static defaultProps = {
    favorites: {}
  }

  static screenName = 'account.Favorites'

  static get options() {
    return {
      topBar: {
        title: {text: 'Meus imóveis favoritos'},
        backButton: {title: 'Favoritos'},
        leftButtons: [
          {id: uniqueId('logo'), component: {name: HeaderLogo.screenName}}
        ]
      }
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

  render() {
    const {favorites} = this.props
    return (
      <Shell bottomTabs>
        <Body loading={favorites.loading}>
          <Feed
            data={favorites.data}
            onSelect={this.onSelect}
            ListEmptyComponent={favorites.loading ? undefined : ListEmpty}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(withFavoriteListings)(FavoritesScreen)
