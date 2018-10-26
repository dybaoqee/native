import _ from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import styled from 'styled-components'
import {themeGet, bgColor} from 'styled-system'
import {View, Row, Col, Text} from '@emcasa/ui-native'

import IconButton from '@/components/shared/IconButton'

class BackButton extends PureComponent {
  onPress = _.once(() => {
    Navigation.pop(this.props.componentId)
  })

  render() {
    return (
      <IconButton
        name="chevron-left"
        type="light"
        color="pink"
        size={22}
        onPress={this.onPress}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        {...this.props}
      />
    )
  }
}

const Title = styled(Text)`
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 18;
  text-align: center;
  line-height: ${themeGet('size.topBar')};
  ${({translucent, theme: {colors}}) =>
    translucent && `text-shadow: 0 1px 4px ${colors.dark}`};
`

export default styled(function Header({
  children,
  backButton,
  rightButtons,
  translucent,
  ...props
}) {
  let color
  if (translucent) color = 'white'
  color = color || props.color
  return (
    <View {...props}>
      <Row alignItems="center" flex={1} style={{position: 'relative'}}>
        {Boolean(backButton) && (
          <Col zIndex={1} ml="15px">
            <BackButton componentId={backButton} color={color} />
          </Col>
        )}
        {Boolean(rightButtons) && (
          <Col zIndex={1} flex={1} mr="15px">
            <Row justifyContent="flex-end">{rightButtons}</Row>
          </Col>
        )}
        {Boolean(children) &&
          (typeof children === 'string' ? (
            <Title color={color} translucent={translucent} pointerEvents="none">
              {children}
            </Title>
          ) : (
            children
          ))}
      </Row>
    </View>
  )
})`
  z-index: 1;
  background-color: white;
  justify-content: center;
  min-height: ${themeGet('size.topBar')};
  margin-top: ${themeGet('size.statusBar')};
  ${({translucent}) =>
    translucent && {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    }};
  ${bgColor};
`
