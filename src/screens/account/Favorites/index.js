import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import {View, Text} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {withFavoriteListings} from '@/graphql/containers'
import {switchTab} from '@/redux/modules/navigation'
import {Shell, Body} from '@/components/layout'
import Feed from '@/components/listings/Feed/Listing'
import ListEmpty from '@/components/shared/ListEmpty'

import ListingScreen from '@/screens//listing/Listing'

class FavoritesScreen extends PureComponent {
  static defaultProps = {
    favorites: {}
  }

  static screenName = 'account.Favorites'

  static options = {
    topBar: {
      title: {text: 'Meus Favoritos'},
      backButton: {title: 'Favoritos'},
      leftButtons: [
        {
          id: 'account.Favorites#logo',
          icon: require('@/assets/img/icons/logo.png')
        }
      ]
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
            ListHeaderComponent={
              data.length ? (
                <View m="15px" mb="0px">
                  <Text fontWeight="500" fontSize={16}>
                    Meus Imóveis favoritos
                  </Text>
                </View>
              ) : (
                undefined
              )
            }
            ListEmptyComponent={
              <ListEmpty
                loading={loading}
                title="Você ainda não favoritou nenhum imóvel"
                buttonText="Explorar"
                image={require('@/assets/img/icons/heart_plus.png')}
                onPress={this.onExplore}
              >
                Navegue pelos nosso imóveis e dê um coração para os que você
                mais gostar. Esses imóveis ficarão salvos aqui nessa lista para
                você ver e rever quando quiser.
              </ListEmpty>
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
