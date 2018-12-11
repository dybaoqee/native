import React, {PureComponent} from 'react'
import {KeyboardAvoidingView, SafeAreaView, Platform} from 'react-native'
import styled, {ThemeProvider} from 'styled-components/native'

import BottomTabs from './BottomTabs'

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export default class Shell extends PureComponent {
  static defaultProps = {
    bottomTabs: false,
    behavior: 'padding'
  }

  state = {
    layout: {width: 0, height: 0},
    bottomTabsVisible: false
  }

  keyboardAvoidingView = React.createRef()

  static getDerivedStateFromProps({bottomTabs}) {
    return {bottomTabsVisible: Boolean(bottomTabs)}
  }

  onLayout = ({nativeEvent: {layout}}) => this.setState({layout})

  render() {
    const {zIndex, children, testID, behavior, bottomTabs} = this.props
    const bottomTabProps = typeof bottomTabs === 'object' ? bottomTabs : {}
    return (
      <ThemeProvider theme={{Shell: this.state}}>
        <SafeAreaView style={{zIndex, flex: 1}} forceInset={{top: 'never'}}>
          <Container testID={testID} onLayout={this.onLayout}>
            <KeyboardAvoidingView
              ref={this.keyboardAvoidingView}
              style={{flex: 1, position: 'relative'}}
              behavior={behavior !== 'none' ? behavior : undefined}
              enabled={Platform.OS !== 'android' && behavior !== 'none'}
            >
              <Container>{children}</Container>
            </KeyboardAvoidingView>
            {this.state.bottomTabsVisible && (
              <BottomTabs testID="bottom_tabs" {...bottomTabProps} />
            )}
          </Container>
        </SafeAreaView>
      </ThemeProvider>
    )
  }
}
