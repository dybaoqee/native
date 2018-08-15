import {PureComponent} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withPermission} from '@/containers/Permission'
import {watchPosition, unwatchPosition} from './module'
import {isWatchingPosition} from './module/selectors'
import * as colors from '@/assets/colors'
import FilterScreen from '@/screens/modules/listings/Search'
import Text from '@/components/shared/Text'
import Icon from '@/components/shared/Icon'

const Button = ({children, active, icon, style, onPress}) => {
  const color = active ? colors.blue.medium : colors.gray.medium
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{alignItems: 'center'}, style]}
      hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
    >
      <Icon name={icon} size={14} color={color} />
      <Text style={{fontSize: 10, color}}>{children}</Text>
    </TouchableOpacity>
  )
}

class MapHeaderButton extends PureComponent {
  static screenName = 'listings.MapHeaderButton'

  onPress = async () => {
    if (this.props.watchingPosition) this.props.unwatchPosition()
    else if ((await this.props.onRequestPermission()) === 'authorized')
      this.props.watchPosition()
  }

  onShowFilters = () => {
    Navigation.push(this.props.componentId, {
      component: {name: FilterScreen.screenName}
    })
  }

  render() {
    const {watchingPosition} = this.props

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button icon="map" active={watchingPosition} onPress={this.onPress}>
          Meu local
        </Button>
        <Button
          active
          icon="filter"
          style={{marginLeft: 10}}
          onPress={this.onShowFilters}
        >
          Filtros
        </Button>
      </View>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      watchingPosition: isWatchingPosition(state)
    }),
    {watchPosition, unwatchPosition}
  ),
  withPermission('location', 'whenInUse')
)(MapHeaderButton)
