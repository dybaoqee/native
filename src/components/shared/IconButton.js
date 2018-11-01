import _ from 'lodash'
import {TouchableOpacity} from 'react-native'
import {Icon} from '@emcasa/ui-native'

const touchableProps = [
  'testID',
  'style',
  'onPress',
  'hitSlop',
  'disabled',
  'activeOpacity'
]

export default function IconButton(props) {
  return (
    <TouchableOpacity {..._.pick(props, touchableProps)}>
      <Icon {..._.omit(props, touchableProps)} />
    </TouchableOpacity>
  )
}
