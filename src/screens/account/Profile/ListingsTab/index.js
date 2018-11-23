import {PureComponent} from 'react'
import {Linking} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {View, Text} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {withUserListings} from '@/graphql/containers'
import Feed from '@/components/listings/Feed/Listing'
import ListEmpty from '@/components/shared/ListEmpty'

import {FRONTEND_URL} from '@/config/const'
import ListingScreen from '@/screens//listing/Listing'

class UserListingsTab extends PureComponent {
  onSelect = (id) => {
    const {componentId} = this.props
    Navigation.push(componentId, {
      component: {
        name: ListingScreen.screenName,
        passProps: {params: {id}}
      }
    })
  }

  onCreateListing = () => {
    const url = `${FRONTEND_URL}/saiba-mais-para-vender`
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url)
    })
  }

  render() {
    const {
      userListings: {data, loading}
    } = this.props
    return (
      <Feed
        testID="listing_feed"
        automaticallyAdjustContentInsets={false}
        data={data}
        onSelect={this.onSelect}
        ListHeaderComponent={
          data.length ? (
            <View m="15px" mb="0px">
              <Text fontWeight="500" fontSize={16}>
                Meus Imóveis
              </Text>
            </View>
          ) : (
            undefined
          )
        }
        ListEmptyComponent={
          <ListEmpty
            loading={loading}
            title="Você não tem nenhum imóvel anunciado"
            buttonText="Começar"
            image={require('@/assets/img/icons/sad_smartphone.png')}
            onPress={this.onCreateListing}
          >
            Quer anunciar seu imóvel aqui na EmCasa? Vamos te redirecionar para
            o nosso site para você anunciar seu imóvel.
          </ListEmpty>
        }
      />
    )
  }
}

export default composeWithRef(withUserListings)(UserListingsTab)
