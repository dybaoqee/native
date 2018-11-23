import * as colors from '@/assets/colors'
import {Icon} from '@emcasa/ui-native'

export default function LikeIcon({active, contrast, size, ...props}) {
  const color = contrast ? 'black' : 'rgba(0,0,0,0)'
  const border = contrast ? 'white' : colors.gray.dark
  return (
    <Icon
      name="heart"
      type="solid"
      size={size}
      stroke={active ? colors.red.medium : border}
      strokeWidth={size + 12}
      strokeLinecap="round"
      color={active ? colors.red.medium : color}
      fillOpacity={active ? 1 : 0.2}
      {...props}
    />
  )
}

LikeIcon.defaultProps = {
  size: 20
}
