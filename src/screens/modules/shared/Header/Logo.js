import {PureComponent} from 'react'
import {TouchableOpacity} from 'react-native'

import Logo from '@/components/shared/Logo'

export default class HeaderLogo extends PureComponent {
  static screenName = 'shared.Header.Logo'

  render() {
    const {onPress, hitSlop, ...props} = this.props

    return (
      <TouchableOpacity disabled={!onPress} onPress={onPress} hitSlop={hitSlop}>
        <Logo size={28} {...props} />
      </TouchableOpacity>
    )
  }
}
