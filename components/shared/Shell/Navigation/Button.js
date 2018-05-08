import {TouchableOpacity} from 'react-native'

import Icon from '@/components/shared/Icon'
import Text from '@/components/shared/Text'
import styles, {iconColor} from './styles'

export default function NavButton({children, icon, active, ...props}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...props}>
      <Icon
        name={icon}
        color={iconColor[active ? 'active' : 'default']}
        style={styles.icon}
      />
      <Text style={[styles.buttonText, active && styles.buttonTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}
