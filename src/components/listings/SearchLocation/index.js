import {PureComponent} from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {View} from '@emcasa/ui-native'

import IconButton from '@/components/shared/IconButton'
import Form from './Form'

const Body = styled(View)`
  position: absolute;
  bottom: ${themeGet('size.bottomTabs', 0)};
  width: 100%;
  margin-horizontal: 30px;
  margin-bottom: 45px;
  padding: 30px;
  border-radius: 25px;
  background-color: rgba(60, 72, 88, 0.9);
`

const Background = styled(View)`
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
`

export default class LocationSearch extends PureComponent {
  state = {
    value: {}
  }

  render() {
    const {onDismiss, ...props} = this.props
    return (
      <Background {...props}>
        <Body>
          <View alignItems="flex-end" mt={-10} mr={-10}>
            <IconButton
              name="times"
              type="light"
              color="white"
              onPress={onDismiss}
            />
          </View>
          <Form {...this.props} />
        </Body>
      </Background>
    )
  }
}
