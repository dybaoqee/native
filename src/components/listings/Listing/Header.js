import {PureComponent, Fragment} from 'react'
import {Dimensions} from 'react-native'
import styled from 'styled-components/native'
import {themeGet, width, height} from 'styled-system'
import {View, Row, Col, Text} from '@emcasa/ui-native'

import Image from '@/components/listings/Image'
import Gallery from '@/components/listings/Gallery'

const GalleryContainer = styled.View`
  flex: 1;
  border-bottom-width: 0.5px;
  border-color: ${themeGet('colors.lightGrey')};
  ${width};
  ${height};
`

const addressDescription = ({type, address: {street, city}}) =>
  `${type} na ${street}, ${city}`

export default class ListingHeader extends PureComponent {
  state = {
    galleryData: undefined
  }

  get images() {
    const images = this.props.images.slice(0, 4)
    return images
  }
  onPressSlide = (index) => {
    if (index === 0) this.onPressTour(index)
    else this.onPressImage(index)
  }

  onPressImage = (index) => this.props.onOpenGallery(index)

  onPressTour = () => {}

  render() {
    const {testID, matterportCode} = this.props
    const images = this.images
    let {width, height} = Dimensions.get('window')
    height = width * 0.64
    return (
      <Fragment>
        <GalleryContainer testID={testID} width={width} height={height}>
          {images && images.length ? (
            <Gallery
              testID={`${testID}_gallery`}
              width={width}
              height={height}
              onPressSlide={this.onPressSlide}
            >
              {images}
            </Gallery>
          ) : (
            <Image width={width} height={height} />
          )}
        </GalleryContainer>
        <Row pt="25px" pb="15px" pl="15px" pr="15px">
          <Text fontSize={18}>{addressDescription(this.props)}</Text>
        </Row>
      </Fragment>
    )
  }
}
