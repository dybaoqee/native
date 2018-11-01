import _ from 'lodash'
import {Platform} from 'react-native'

// Simulate drop shadow elevation across all platforms
export const elevation = (value) =>
  Platform.select({
    android: {
      elevation: value
    },
    ios: {
      shadowColor: '#666',
      shadowOpacity: 0.35,
      shadowRadius: value * 1.5,
      shadowOffset: {
        width: 0,
        height: value / 2
      }
    }
  })

// Mimic CSS's shorthand padding/margin syntax
export const spacing = (prefix) =>
  function(top, right, bottom, left) {
    const style = {top, left, bottom, right}
    if (arguments.length === 1) return {[prefix]: top}
    if (typeof bottom === 'undefined') style.bottom = top
    if (typeof left === 'undefined') style.left = right
    return _.mapKeys(style, (__, key) => prefix + _.upperFirst(key))
  }

export const padding = spacing('padding')

export const margin = spacing('margin')

export const rightTriangle = ({color, size}) => ({
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderRightWidth: size,
  borderTopWidth: size,
  borderRightColor: 'transparent',
  borderTopColor: color
})
