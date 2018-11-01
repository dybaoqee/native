import _ from 'lodash'
import {PureComponent, Fragment} from 'react'
import {Navigation} from 'react-native-navigation'
import styled from 'styled-components/native'
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
  line-height: ${themeGet('size.topBar', 0)};
  ${({translucent, theme: {colors}}) =>
    translucent && `text-shadow: 0 1px 4px ${colors.dark}`};
`

const StatusBar = styled.View`
  z-index: 1;
  height: ${themeGet('size.statusBar', 0)};
  width: 100%;
  ${bgColor};
`

const TopBar = styled(View)`
  z-index: 1;
  background-color: white;
  justify-content: center;
  min-height: ${themeGet('size.topBar', 0)};
  ${({translucent, statusBar, theme}) =>
    Boolean(translucent) && {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: statusBar ? theme.size.statusBar : 0,
      left: 0,
      right: 0
    }};
  ${bgColor};
`

function Header({children, backButton, rightButtons, ...props}) {
  const childProps = _.pick(props, ['translucent', 'statusBar', 'color'])
  const statusBarProps =
    typeof props.statusBar === 'object' ? props.statusBar : {}
  if (props.translucent) childProps.color = childProps.color || 'white'
  return (
    <Fragment>
      {Boolean(props.statusBar) && <StatusBar {...statusBarProps} />}
      <TopBar {...props}>
        <Row alignItems="center" flex={1} style={{position: 'relative'}}>
          {Boolean(backButton) && (
            <Col zIndex={1} ml="15px">
              <BackButton componentId={backButton} {...childProps} />
            </Col>
          )}
          {Boolean(rightButtons) && (
            <Col zIndex={1} flex={1} mr="15px">
              <Row justifyContent="flex-end">{rightButtons}</Row>
            </Col>
          )}
          {Boolean(children) &&
            (typeof children === 'string' ? (
              <Title pointerEvents="none" {...childProps}>
                {children}
              </Title>
            ) : (
              children
            ))}
        </Row>
      </TopBar>
    </Fragment>
  )
}

Header.defaultProps = {
  statusBar: {bg: 'white'}
}

Header.StatusBar = StatusBar

export default Header
