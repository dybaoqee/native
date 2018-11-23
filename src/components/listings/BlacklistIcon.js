import * as colors from '@/assets/colors'
import {Icon} from '@emcasa/ui-native'

export default function BlacklistIcon({active, contrast, size, ...props}) {
  const color = contrast ? 'black' : 'rgba(0,0,0,0)'
  const border = contrast ? 'white' : colors.gray.dark
  return (
    <Icon
      name="eye-slash"
      type="solid"
      size={size}
      stroke={active ? colors.gray.mediumDark : border}
      strokeWidth={size + 12}
      strokeLinecap="round"
      color={active ? colors.gray.lighter : color}
      fillOpacity={active ? 1 : 0.2}
      {...props}
    />
  )
}

BlacklistIcon.defaultProps = {
  size: 20
}
