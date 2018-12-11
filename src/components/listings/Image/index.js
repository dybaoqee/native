import {negate as not, cond, get, stubTrue} from 'lodash/fp'
import styled from 'styled-components'
import {PixelRatio, Image} from 'react-native'
import PhotoView from 'react-native-photo-view'

import * as image from '@/assets/image'

const px = PixelRatio.getPixelSizeForLayoutSize

const url = (filename, {thumbnail, width, height}) => {
  if (!filename) return require('@/assets/img/no-image.jpg')
  let options
  if (width && height) options = {width, height}
  else if (thumbnail) options = {width: px(400), height: px(200)}
  else options = {width: px(600), height: px(400)}
  return {uri: image.url(filename, options)}
}

const ListingImage = styled(function ListingImage({
  scalable,
  filename,
  thumbnail,
  width,
  height,
  resolution,
  ...props
}) {
  delete props.position
  const source = url(filename, {
    thumbnail,
    width: px(width) * resolution,
    height: px(height) * resolution
  })
  if (scalable)
    return <PhotoView source={source} resizeMode="cover" {...props} />
  else return <Image source={source} {...props} />
})`
  justify-content: center;
  align-items: center;
  resize-mode: center;
  ${cond([
    [not(get('scalable')), image.withRatio({width: 400, height: 200})],
    [stubTrue, () => ({position: 'relative', width: '100%', height: '100%'})]
  ])};
`

ListingImage.url = url

ListingImage.defaultProps = {
  resolution: 1,
  minimumZoomScale: 1
}

export default ListingImage
