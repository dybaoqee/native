import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {width, bgColor, border, borderColor, borderRadius} from 'styled-system'
import {buttonHeight} from '@emcasa/ui/lib/styles'
import {Svg, G, Path} from 'react-native-svg'

const TooltipPaths = {
  bottom({width, height, borderRadius, borderWidth, tipHeight}) {
    const left = -width / 2
    const right = width / 2
    const top = -tipHeight - height
    const bottom = -tipHeight
    const path = `M 0,0
    L ${-tipHeight},${bottom}
    H ${left + borderRadius}
    Q ${left},${bottom} ${left},${bottom - borderRadius}
    V ${top + borderRadius}
    Q ${left},${top} ${left + borderRadius},${top}
    H ${right - borderRadius}
    Q ${right},${top} ${right},${top + borderRadius}
    V ${bottom - borderRadius}
    Q ${right},${bottom} ${right - borderRadius},${bottom}
    H ${tipHeight}
    L 0,0 z`
    return {d: path, x: -left + borderWidth, y: -top + borderWidth}
  }
}

const Tooltip = styled(function Tooltip({tipPosition, tipHeight, ...props}) {
  const style = StyleSheet.flatten(props.style)
  const width = style.width + style.borderWidth * 2
  const height = style.height + tipHeight + style.borderWidth * 2
  return (
    <Svg
      version="1.1"
      width={width}
      height={height}
      x={style.borderWidth}
      y={style.borderWidth}
      onLayout={() => console.log('done')}
    >
      <G>
        <Path
          fill={style.backgroundColor}
          stroke={style.borderColor}
          strokeWidth={style.borderWidth}
          {...TooltipPaths[tipPosition]({...style, tipHeight})}
        />
      </G>
    </Svg>
  )
})`
  ${width};
  ${bgColor};
  ${buttonHeight};
  ${border};
  ${borderColor};
  ${borderRadius};
`

Tooltip.defaultProps = {
  bg: 'pink',
  width: 200,
  height: 'medium',
  border: 0,
  borderColor: 'transparent',
  borderRadius: 4,
  tipHeight: 10,
  tipPosition: 'bottom'
}

export default Tooltip
