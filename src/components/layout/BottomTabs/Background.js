import styled from 'styled-components/native'
import {Fragment} from 'react'
import {Dimensions, Image} from 'react-native'
import {themeGet, left, right, width} from 'styled-system'
import {View} from '@emcasa/ui-native'

const bgWidth = ({theme}) =>
  (Dimensions.get('window').width - theme.size.bottomTabsBg.width) / 2

const bgColorHeight = ({theme}) =>
  theme.size.bottomTabs - theme.size.bottomTabsBg.height

const FloatingBackgroundImage = styled.Image.attrs({
  source: {
    ...Image.resolveAssetSource(
      require('@/assets/img/bg-bottom-bar-floating-bt.png')
    ),
    cache: 'force-cache'
  }
})`
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 0;
  resize-mode: stretch;
  margin-left: ${({theme}) => -(theme.size.bottomTabsBg.width / 2)};
  width: ${themeGet('size.bottomTabsBg.width')};
  height: ${themeGet('size.bottomTabsBg.height')};
`

export const BarBackgroundImage = styled.Image.attrs({
  source: {
    ...Image.resolveAssetSource(require('@/assets/img/bg-bottom-bar.png')),
    cache: 'force-cache'
  }
})`
  z-index: 1;
  position: absolute;
  resize-mode: stretch;
  top: 0;
  height: ${themeGet('size.bottomTabsBg.height')};
  width: ${bgWidth};
  ${width};
  ${left};
  ${right};
`

export const BackgroundColor = styled.View`
  z-index: 1;
  position: absolute;
  height: ${bgColorHeight};
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
`

export default styled(function TabBackground({children, hasButton, ...props}) {
  return (
    <View {...props}>
      {hasButton && <FloatingBackgroundImage />}
      {children}
      <BackgroundColor />
      {hasButton ? (
        <Fragment>
          <BarBackgroundImage left={0} />
          <BarBackgroundImage right={0} />
        </Fragment>
      ) : (
        <BarBackgroundImage width={1.0} />
      )}
    </View>
  )
})`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: ${themeGet('size.bottomTabs')};
`
