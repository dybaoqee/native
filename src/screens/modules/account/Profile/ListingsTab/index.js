import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {View, Text} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {withUserListings} from '@/graphql/containers'
import Feed from '@/components/listings/Feed/Listing'

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

  render() {
    const {
      userListings: {data}
    } = this.props
    return (
      <Feed
        testID="listing_feed"
        automaticallyAdjustContentInsets={false}
        data={data}
        onSelect={this.onSelect}
        ListHeaderComponent={
          <View m="15px" mb="-10px">
            <Text fontWeight="500" fontSize={16}>
              Meus Imóveis
            </Text>
          </View>
        }
      />
    )
  }
}

export default composeWithRef(withUserListings)(UserListingsTab)
