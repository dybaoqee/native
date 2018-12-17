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
    Shell: {
      layout: {width: 0, height: 0},
      bottomTabsVisible: false
    }
  }

  keyboardAvoidingView = React.createRef()

  static getDerivedStateFromProps({bottomTabs}, {Shell}) {
    if (Shell.bottomTabsVisible !== Boolean(bottomTabs))
      return {Shell: {...Shell, bottomTabsVisible: Boolean(bottomTabs)}}
    return null
  }

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState(({Shell}) => ({Shell: {...Shell, layout}}))

  render() {
    const {zIndex, children, testID, behavior, bottomTabs} = this.props
    const bottomTabProps = typeof bottomTabs === 'object' ? bottomTabs : {}
    return (
      <ThemeProvider theme={this.state}>
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
            {this.state.Shell.bottomTabsVisible && (
              <BottomTabs testID="bottom_tabs" {...bottomTabProps} />
            )}
          </Container>
        </SafeAreaView>
      </ThemeProvider>
    )
  }
}
