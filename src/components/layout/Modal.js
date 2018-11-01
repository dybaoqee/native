import styled from 'styled-components/native'
import {bgColor, opacity} from 'styled-system'
import {Platform} from 'react-native'
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
    <Shell {...props}>
      <View zIndex={1} flex={1}>
        {children}
      </View>
      {Boolean(bg && bg !== 'transparent') && (
        <Background bg={bg} opacity={opacity} />
      )}
    </Shell>
  )
})`
  margin-top: ${Platform.select({ios: 20, android: 0})};
`

Modal.defaultProps = {
  bg: 'pink'
}

export default Modal

Modal.Header = styled(function ModalHeader({
  children,
  iconColor,
  onDismiss,
  fontSize,
  fontWeight,
  ...props
}) {
  return (
    <Row {...props}>
      <Col flex={1}>
        {children && (
          <Text color="white" {...{fontSize, fontWeight}}>
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
            color={iconColor}
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
  ${({absolute}) =>
    absolute && {
      position: 'absolute',
      top: 0,
      left: 0
    }};
`

Modal.Header.defaultProps = {
  zIndex: 1,
  fontSize: 'large',
  iconColor: 'white'
}
