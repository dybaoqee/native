import {PureComponent} from 'react'
import {View, ActivityIndicator, Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import AccountKit from 'react-native-facebook-account-kit'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {withSignInMutation, withUserProfile} from '@/graphql/containers'
import {getTabIndexHistory} from '@/redux/modules/navigation/selectors'
import {updateStackRoot, switchTab} from '@/redux/modules/navigation'
import {withPermission} from '@/containers/Permission'
import {Shell, Body} from '@/components/layout'

import SignUpScreen from '@/screens//auth/SignUp'

const isRegistrationComplete = (user) => Boolean(user.name)

class LoginScreen extends PureComponent {
  static screenName = 'auth.Login'

  static options = {
    topBar: {
      title: {text: 'Login'},
      leftButtons: [
        {
          id: 'auth.Login#logo',
          icon: require('@/assets/img/icons/logo.png')
        }
      ]
    }
  }

  state = {
    viewActive: false,
    akActive: false,
    loading: false,
    error: undefined
  }

  accountKitLogin = () => {
    this.setState({akActive: true}, async () => {
      try {
        const response = await AccountKit.loginWithPhone()
        if (response) this.onSubmit(response)
        else this.onDismiss()
      } catch (e) {
        this.onDismiss()
      } finally {
        this.setState({akActive: false})
      }
    })
  }

  async componentDidAppear() {
    const {onRequestPermission, permission, user} = this.props
    if (Platform.OS === 'android' && permission === 'undetermined')
      await onRequestPermission()
    if (!this.state.viewActive)
      this.setState(
        {viewActive: true},
        user && user.id ? undefined : this.accountKitLogin
      )
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
    this.setState({viewActive: false, akActive: false}, () =>
      switchTab(previousTabIndex)
    )
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
  withUserProfile,
  connect(
    (state) => ({previousTabIndex: getTabIndexHistory(state)[1]}),
    {updateStackRoot, switchTab}
  )
)(LoginScreen)
