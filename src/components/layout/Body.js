import {PureComponent} from 'react'
import {ScrollView as RCTScrollView} from 'react-native'
import styled from 'styled-components/native'
import {compose} from 'recompose'
import {justifyContent, alignItems} from 'styled-system'
import {View as BaseView} from '@emcasa/ui-native'

import Spinner from '@/components/shared/Spinner'
import BottomTabsSpacer from './BottomTabs/Spacer'

const View = styled(BaseView)`
  ${({mb, theme}) => {
    let marginBottom = mb
    if (mb === 'auto')
      marginBottom = theme.Shell.bottomTabsVisible ? theme.size.bottomTabs : 0
    else if (mb == 'none') marginBottom = 0
    return {marginBottom}
  }};
  ${justifyContent};
  ${alignItems};
`

const withContentContainerStyle = (Target) => styled(({style, ...props}) => (
  <Target contentContainerStyle={style} {...props} />
))`
  ${({height, theme}) =>
    Boolean(theme.Shell.bottomTabsVisible && height === 'auto') && {
      minHeight: theme.Shell.layout.height - theme.size.bottomTabs
    }};
`

const ScrollView = compose(withContentContainerStyle)(styled(
  BaseView.withComponent(({children, mb, ...props}) => (
    <RCTScrollView {...props}>
      {children}
      {mb === 'auto' && <BottomTabsSpacer />}
    </RCTScrollView>
  ))
)`
  ${({mb}) => ({marginBottom: ['auto', 'none'].includes(mb) ? 0 : mb})};
  ${({height}) => ({height: height === 'auto' ? undefined : height})};
`)

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

  renderSpinner() {
    return (
      <Overlay>
        <Spinner />
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
        {Boolean(loading && !children) && this.renderSpinner()}
        {children}
      </ViewComponent>
    )
  }
}
