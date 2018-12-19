import _ from 'lodash'
import {PureComponent, Fragment} from 'react'
import styled from 'styled-components/native'
import {themeGet, bgColor, zIndex} from 'styled-system'
import {View, Row, Col, Text} from '@emcasa/ui-native'

import renderProp from '@/lib/renderProp'
import IconButton from '@/components/shared/IconButton'

class BackButton extends PureComponent {
  onPress = _.once(this.props.onDismiss)

  render() {
    return (
      <IconButton
        name="chevron-left"
        type="light"
        color="pink"
        size={22}
        onPressIn={this.onPress}
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
`

const TopBar = styled(View)`
  z-index: 1;
  ${zIndex};
  background-color: white;
  justify-content: center;
  min-height: ${themeGet('size.topBar', 0)};
  ${({translucent}) =>
    Boolean(translucent) && {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    }};
  ${bgColor};
`

function Header({children, onDismiss, RightButtons, ...props}) {
  const childProps = _.pick(props, ['translucent', 'color'])
  return (
    <Fragment>
      <TopBar {...props} pointerEvents="box-none">
        <Row
          alignItems="center"
          flex={1}
          style={{position: 'relative'}}
          pointerEvents="box-none"
        >
          {Boolean(onDismiss) && (
            <Col zIndex={1} ml="15px" pointerEvents="box-none">
              <BackButton
                accessible
                accessibilityLabel="Voltar para a tela anterior"
                testID="header_back_button"
                onDismiss={onDismiss}
                {...childProps}
              />
            </Col>
          )}
          {Boolean(RightButtons) && (
            <Col zIndex={1} flex={1} mr="15px" pointerEvents="box-none">
              <Row justifyContent="flex-end">{renderProp(RightButtons)}</Row>
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

export default Header
