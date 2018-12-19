import {get} from 'lodash/fp'
import styled from 'styled-components'
import {color, zIndex} from 'styled-system'
import LinearGradient from 'react-native-linear-gradient'

const getAxis = (getValue) => ({axis, ...props}) => ({
  x: 0,
  y: 0,
  [axis]: getValue(props)
})
const GradientOverlay = styled(LinearGradient).attrs({
  colors: ({opacity, ...props}) => {
    let toColor = color(props).color
    const fromColor = toColor + '00'
    if (opacity && opacity < 1) toColor += (opacity * 100).toFixed(0).toString()
    return [fromColor, toColor]
  },
  locations: ({size}) => [1 - size, 1],
  start: getAxis(get('from')),
  end: getAxis(get('to')),
  pointerEvents: 'none'
})`
  ${zIndex};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

GradientOverlay.defaultProps = {
  opacity: 1,
  zIndex: 1,
  color: 'white',
  size: 0.5,
  from: 0,
  to: 1
}

export default GradientOverlay
