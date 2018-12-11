import styled from 'styled-components/native'
import {themeGet, bgColor, opacity} from 'styled-system'
import {View, Row, Col, Text} from '@emcasa/ui-native'

import IconButton from '@/components/shared/IconButton'
import Shell from './Shell'

const Background = styled.View`
  z-index: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  ${bgColor};
  ${opacity};
`

const Modal = styled(function Modal({children, bg, opacity, ...props}) {
  return (
    <View flex={1}>
      <Shell zIndex={1} {...props}>
        {children}
      </Shell>
      {Boolean(bg && bg !== 'transparent') && (
        <Background bg={bg} opacity={opacity} />
      )}
    </View>
  )
})`
  margin-top: ${themeGet('size.statusBar', 0)};
`

Modal.defaultProps = {
  bg: 'white'
}

export default Modal

Modal.Header = styled(function ModalHeader({
  children,
  color,
  onDismiss,
  fontSize,
  fontWeight,
  textAlign,
  ...props
}) {
  return (
    <Row {...props}>
      <Col flex={1}>
        {children && (
          <Text color={color} {...{fontSize, fontWeight, textAlign}}>
            {children}
          </Text>
        )}
      </Col>
      <Col>
        {onDismiss && (
          <IconButton
            testID="close_modal_button"
            name="times"
            type="light"
            size={24}
            color={color}
            onPress={onDismiss}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          />
        )}
      </Col>
    </Row>
  )
})`
  justify-content: center;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  ${({translucent}) =>
    translucent && {
      position: 'absolute',
      top: 0,
      left: 0
    }};
`

Modal.Header.defaultProps = {
  zIndex: 1,
  fontSize: 'large',
  color: 'dark'
}
