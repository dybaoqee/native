import {PureComponent, Fragment} from 'react'
import {Dimensions} from 'react-native'
import styled from 'styled-components/native'
import {themeGet, width, height} from 'styled-system'
import {View, Row, Text, Icon} from '@emcasa/ui-native'

import Image from '@/components/listings/Image'
import Gallery from '@/components/listings/Gallery'
import Matterport from '../Matterport'

const GalleryContainer = styled.View`
  flex: 1;
  border-bottom-width: 0.5px;
  border-color: ${themeGet('colors.lightGrey')};
  ${width};
  ${height};
`

const PlayButton = styled((props) => (
  <View {...props}>
    <View mt="-5px">
      <Icon name="triangle" color="white" size={25} />
    </View>
  </View>
))`
  z-index: 1;
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border-width: 2px;
  border-color: white;
  transform: rotate(90deg);
`

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${themeGet('colors.dark')};
  opacity: 0.45;
`

const TourOverlay = styled((props) => (
  <View {...props}>
    <PlayButton />
    <Background />
  </View>
))`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const addressDescription = ({type, address: {street, city}}) =>
  `${type} na ${street}, ${city}`

const injectCssScript = (css) => `requestAnimationFrame(function() {
  var css = '${css.replace(' ', '')}';
  var node = document.createElement('style');
  node.type = 'text/css';
  document.body.appendChild(node);
  if ('textContent' in node) { node.textContent = css; }
  else { node.innerText = css; }
  window.node = node;
});`

const openFloorPlanScript = () => `
setTimeout(function () {
  const element = document.querySelector(".ui-icon.floorplan");
  element.click();
}, 2500);
`

export default class ListingHeader extends PureComponent {
  state = {
    galleryData: undefined
  }

  get images() {
    const images = this.props.images.slice(0, 4)
    if (this.props.matterportCode) images.unshift(this.renderTour())
    return images
  }

  onPressImage = (index) => {
    if (index === 0) this.props.onOpenTour()
    else this.props.onOpenGallery(index - 1)
  }

  renderTour() {
    return (
      <View
        key={this.props.matterportCode}
        bg="dark"
        width="100%"
        height="100%"
      >
        <TourOverlay />
        {this.props.ready && (
          <Matterport
            useWebKit
            play={false}
            code={this.props.matterportCode}
            injectedJavaScript={`
            ${injectCssScript('#cta-container {display: none}')}
            ${openFloorPlanScript()}
            `.trim()}
            pointerEvents="none"
            q={{
              title: 0, // Hide top bar
              help: 0, // Don't show help
              hl: 0, // Don't show highlight reel
              vr: 0, // Hide VR button
              dh: 1, // Hide dollhouse & floor-plan buttons
              gt: 0, // Hide guided tour button
              qs: 1,
              ts: 0
            }}
          />
        )}
      </View>
    )
  }

  render() {
    const {testID} = this.props
    const images = this.images
    let {width, height} = Dimensions.get('window')
    height = width * 0.64
    return (
      <Fragment>
        <GalleryContainer testID={testID} width={width} height={height}>
          {images && images.length ? (
            <Gallery
              lazy={false}
              testID={`${testID}_gallery`}
              width={width}
              height={height}
              onPressImage={this.onPressImage}
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