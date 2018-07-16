import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {Shell, Body} from '@/components/layout'
import {getToken} from '@/redux/modules/auth/selectors'

import LoginScreen from '@/screens/modules/auth/Login'

@connect((state) => ({jwt: getToken(state)}))
export default class AuthRequired extends PureComponent {
  state = {loginRequested: false}

  requestLogin() {}

  componentDidMount() {
    const {jwt, componentId} = this.props
    if (!jwt)
      this.subscription = Navigation.events().registerComponentDidAppearListener(
        (screen) => {
          if (screen === componentId) this.componentDidAppear()
        }
      )
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.remove()
  }

  componentDidAppear() {
    const {componentId, jwt, notice} = this.props
    if (!this.state.loginRequested) {
      this.setState({loginRequested: true})
      Navigation.push(componentId, {
        component: {
          id: `${componentId}_login`,
          name: LoginScreen.screenName,
          passProps: {params: {parentId: componentId, notice}}
        }
      })
    } else if (!jwt) Navigation.pop(componentId)
  }

  render() {
    const {jwt, children} = this.props
    if (jwt) return children
    return (
      <Shell>
        <Body loading />
      </Shell>
    )
  }
}

export const authRequired = (getOptions) => (Target) => (props) => (
  <AuthRequired
    {...(getOptions ? getOptions(props) : {})}
    componentId={props.componentId}
  >
    <Target {...props} />
  </AuthRequired>
)
