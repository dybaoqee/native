import _ from 'lodash'
import {TouchableOpacity} from 'react-native'
import {View, Icon} from '@emcasa/ui-native'

const touchableProps = `
testID style onPress onPressIn onPressOut hitSlop disabled
pointerEvents activeOpacity accessible accessibilityLabel`.split(/\s+/)

export default function IconButton(props) {
  return (
    <TouchableOpacity
      {..._.pick(props, touchableProps)}
      pointerEvents="box-only"
    >
      <View pointerEvents="none">
        <Icon {..._.omit(props, touchableProps)} />
      </View>
    </TouchableOpacity>
  )
}
