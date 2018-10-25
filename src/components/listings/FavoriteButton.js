import * as colors from '@/assets/colors'
import IconButton from '@/components/shared/IconButton'
import {mapProps} from 'recompose'

const FavoriteButton = mapProps(({active, size, ...props}) => ({
  ...props,
  size,
  name: 'heart',
  type: active ? 'solid' : 'light',
  color: active ? 'pink' : 'white',
  stroke: active ? 'pink' : 'white',
  strokeWidth: 20,
  strokeLineCap: 'round'
}))(IconButton)

export default FavoriteButton
/*
export default function FavoriteButton({active, contrast, size, ...props}) {
  const color = contrast ? 'black' : 'rgba(0,0,0,0)'
  const border = contrast ? 'white' : colors.gray.dark
  return (
    <IconButton
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
*/
