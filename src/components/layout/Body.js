import {PureComponent} from 'react'
import {ScrollView as RCTScrollView, ActivityIndicator} from 'react-native'
import styled from 'styled-components/native'
import {justifyContent, alignItems} from 'styled-system'
import {View as BaseView} from '@emcasa/ui-native'

import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'

const View = styled(BaseView)`
  ${justifyContent};
  ${alignItems};
`

const ScrollView = View.withComponent(RCTScrollView)

const Overlay = styled.View`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff20;
`

export default class Body extends PureComponent {
  state = {
    children: undefined
  }

  static getDerivedStateFromProps({children, loading}) {
    if (!loading) return {children}
    return null
  }

  renderOverlay() {
    return (
      <Overlay>
        <ActivityIndicator size="large" />
      </Overlay>
    )
  }

  render() {
    const {scroll, loading, testID, hasBottomTabs, ...props} = this.props
    const {children} = this.state
    const ViewComponent = scroll ? ScrollView : View

    const component = (
      <ViewComponent
        automaticallyAdjustContentInsets={false}
        testID={testID}
        zIndex={1}
        flex={1}
        {...props}
      >
        {Boolean(loading && !children) && this.renderOverlay()}
        {children}
      </ViewComponent>
    )
    if (!(scroll && hasBottomTabs)) return component
    return (
      <BottomTabsAvoidingScrollView>{component}</BottomTabsAvoidingScrollView>
    )
  }
}
