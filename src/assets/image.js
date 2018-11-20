import _ from 'lodash'
import {Image} from 'react-native'
import {CDN_URL} from '@/config/const'

export const withRatio = (dimensions) => (options) => {
  const style = _.defaults(
    {},
    _.pick(options, ['width', 'height', 'resizeMode']),
    {position: 'relative'},
    dimensions
  )
  const {width, height, resizeMode} = options
  if (width && height) style.resizeMode = resizeMode || 'cover'
  else if (height) style.width = (dimensions.width * height) / dimensions.height
  else if (width) style.height = (dimensions.height * width) / dimensions.width
  return style
}

export const url = (filename, options = {}) => {
  let display = ['f_auto']
  if (options.height) display.push(`h_${Math.ceil(options.height)}`)
  if (options.width) display.push(`w_${Math.ceil(options.width)}`)
  if (options.mode) display.push(`c_${options.mode}`)
  else if (options.height && options.width)
    // Default to fill mode on images with fixed size
    display.push('c_fill')
  return `${CDN_URL}/${display.join(',')}/v1513818385/${filename}`
}
