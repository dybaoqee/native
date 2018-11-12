import {PureComponent} from 'react'
import {View, ActivityIndicator, Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import AccountKit from 'react-native-facebook-account-kit'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withSignInMutation} from '@/graphql/containers'
import {getTabIndexHistory} from '@/screens/modules/navigation/selectors'
import {updateStackRoot, switchTab} from '@/screens/modules/navigation'
import {withPermission} from '@/containers/Permission'
import {Shell, Body} from '@/components/layout'

import SignUpScreen from '@/screens/modules/auth/SignUp'

const isRegistrationComplete = (user) => Boolean(user.name)

class LoginScreen extends PureComponent {
  static screenName = 'auth.Login'

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      translucent: true,
      height: 0,
      backButton: {title: 'Login'}
    }
  }

  state = {
    viewActive: false,
    akActive: false,
    loading: false,
    error: undefined
  }

  accountKitLogin = () => {
    this.setState({akActive: true}, () =>
      AccountKit.loginWithPhone()
        .then((response) => {
          this.setState({akActive: false})
          if (response) this.onSubmit(response)
          else this.onDismiss()
        })
        .catch(() => this.onDismiss())
    )
  }

  async componentDidAppear() {
    const {onRequestPermission, permission} = this.props
    if (Platform.OS === 'android' && permission === 'undetermined')
      await onRequestPermission()
    if (!this.state.viewActive)
      this.setState({viewActive: true}, this.accountKitLogin)
  }

  componentDidDisappear() {
    if (!this.state.akActive) this.setState({viewActive: false})
  }

  onSubmit = async ({token}) => {
    const {signIn} = this.props
    if (this.state.loading) return
    this.setState({loading: true, error: undefined})
    try {
      const {
        data: {accountKitSignIn}
      } = await signIn({token})
      if (!accountKitSignIn) this.onDismiss()
      else if (isRegistrationComplete(accountKitSignIn.user)) this.onSuccess()
      else this.onSignUp()
    } catch (error) {
      // TODO handle error
      this.onDismiss()
    } finally {
      this.setState({loading: false})
    }
  }

  onDismiss = () => {
    const {switchTab, previousTabIndex} = this.props
    switchTab(previousTabIndex)
  }

  onSuccess = () => {
    const {
      updateStackRoot,
      params: {previousTabIndex}
    } = this.props
    updateStackRoot({tabIndex: previousTabIndex})
    Navigation.dismissAllModals()
  }

  onSignUp = () => {
    const {componentId} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_signUp`,
        name: SignUpScreen.screenName,
        passProps: {
          onSuccess: this.onSuccess
        }
      }
    })
  }

  render() {
    return (
      <Shell testID="@auth.Login" bottomTabs>
        <Body>
          <View
            style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
          >
            <ActivityIndicator size="large" />
          </View>
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withPermission('receiveSms'),
  withSignInMutation,
  connect(
    (state) => ({previousTabIndex: getTabIndexHistory(state)[1]}),
    {updateStackRoot, switchTab}
  )
)(LoginScreen)
