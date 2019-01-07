import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import {View, Text} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {debounceTransition} from '@/lib/navigation/helpers'
import {withFavoriteListings} from '@/graphql/containers'
import {switchTab} from '@/redux/modules/navigation'
import {Shell, Body} from '@/components/layout'
import BottomTabsSpacer from '@/components/layout/BottomTabs/Spacer'
import Feed from '@/components/listings/Feed/Vertical'
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

  list = React.createRef()

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, this.constructor.options)
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'account.Favorites#logo') {
      this.resetScrollPosition()
    }
  }

  resetScrollPosition = () => {
    if (!this.list.current) return
    this.list.current.scrollToOffset({animated: true, offset: 0})
  }

  onSelect = debounceTransition((id) =>
    Navigation.push(this.props.componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  )

  onExplore = debounceTransition(() => {
    this.props.switchTab(0)
  })

  render() {
    const {
      favorites: {data, loading}
    } = this.props
    return (
      <Shell bottomTabs>
        <Body loading={loading}>
          <BottomTabsSpacer>
            {(bottomTabs) => (
              <Feed
                data={data}
                onSelect={this.onSelect}
                scrollIndicatorInsets={{
                  right: 0,
                  left: 0,
                  top: 0,
                  bottom: bottomTabs.height
                }}
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
                ListFooterComponent={<View height={bottomTabs.height} />}
                ListEmptyComponent={
                  <ListEmpty
                    loading={loading}
                    title="Você ainda não favoritou nenhum imóvel"
                    buttonText="Explorar"
                    image={require('@/assets/img/icons/heart_plus.png')}
                    onPress={this.onExplore}
                  >
                    Navegue pelos nosso imóveis e dê um coração para os que você
                    mais gostar. Esses imóveis ficarão salvos aqui nessa lista
                    para você ver e rever quando quiser.
                  </ListEmpty>
                }
              />
            )}
          </BottomTabsSpacer>
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
