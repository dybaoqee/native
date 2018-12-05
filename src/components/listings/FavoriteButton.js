import IconButton from '@/components/shared/IconButton'
import {mapProps} from 'recompose'

const FavoriteButton = mapProps(({active, size, hitSlop, ...props}) => ({
  accessible: true,
  accessibilityLabel: active
    ? 'Remover dos favoritos'
    : 'Adicionar aos favoritos',
  ...props,
  size,
  name: 'heart',
  type: active ? 'solid' : 'light',
  color: active ? 'pink' : 'white',
  stroke: active ? 'pink' : 'white',
  strokeWidth: 20,
  strokeLineCap: 'round',
  hitSlop:
    typeof hitSlop !== 'number'
      ? hitSlop
      : {
          top: hitSlop,
          bottom: hitSlop,
          left: hitSlop,
          right: hitSlop
        }
}))(IconButton)

export default FavoriteButton
