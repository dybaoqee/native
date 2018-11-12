import {PureComponent} from 'react'
import {Linking} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {View, Text} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {withUserListings} from '@/graphql/containers'
import Feed from '@/components/listings/Feed/Listing'
import Empty from './Empty'

import {FRONTEND_URL} from '@/config/const'
import ListingScreen from '@/screens/modules/listing/Listing'

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
            <View m="15px" mb="-10px">
              <Text fontWeight="500" fontSize={16}>
                Meus Imóveis
              </Text>
            </View>
          ) : (
            undefined
          )
        }
        ListEmptyComponent={
          <Empty loading={loading} onPress={this.onCreateListing} />
        }
      />
    )
  }
}

export default composeWithRef(withUserListings)(UserListingsTab)
