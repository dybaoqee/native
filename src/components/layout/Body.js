import {PureComponent} from 'react'
import {ScrollView as RCTScrollView, ActivityIndicator} from 'react-native'
import styled from 'styled-components/native'
import {justifyContent, alignItems} from 'styled-system'
import {View as BaseView} from '@emcasa/ui-native'

import BottomTabsAvoidingScrollView from '@/containers/BottomTabsAvoidingScrollView'

const View = styled(BaseView)`
  ${({hasBottomTabs, mb, theme}) => {
    let marginBottom = mb
    if (mb === 'auto') marginBottom = hasBottomTabs ? theme.size.bottomTabs : 0
    else if (mb == 'none') marginBottom = 0
    return {marginBottom}
  }};
  ${justifyContent};
  ${alignItems};
`

const ScrollView = styled(
  BaseView.withComponent(({hasBottomTabs, ...props}) => {
    let component = <RCTScrollView {...props} />
    if (hasBottomTabs && props.mb === 'auto')
      component = (
        <BottomTabsAvoidingScrollView>{component}</BottomTabsAvoidingScrollView>
      )
    return component
  })
)`
  ${({mb}) => ({marginBottom: ['auto', 'none'].includes(mb) ? 0 : mb})};
`

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
    const {scroll, loading, testID, ...props} = this.props
    const {children} = this.state
    const ViewComponent = scroll ? ScrollView : View

    return (
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
  }
}
