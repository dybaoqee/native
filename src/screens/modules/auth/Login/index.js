import {uniqueId} from 'lodash'
import {PureComponent, Fragment} from 'react'
import {View, ActivityIndicator, Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import AccountKit from 'react-native-facebook-account-kit'
import {connect} from 'react-redux'
import {Button, Text} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {withSignInMutation} from '@/graphql/containers'
import {updateStackRoot} from '@/screens/modules/navigation'
import {withPermission} from '@/containers/Permission'
import {Shell, Body} from '@/components/layout'
import styles from './styles'

import HeaderLogo from '@/screens/modules/shared/Header/Logo'

const isRegistrationComplete = (user) => Boolean(user.name)

class LoginScreen extends PureComponent {
  static screenName = 'auth.Login'

  static get options() {
    return {
      topBar: {
        title: {text: 'Login'},
        leftButtons: [
          {id: uniqueId('logo'), component: {name: HeaderLogo.screenName}}
        ]
      }
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
        })
        .catch((error) => this.setState({error, akActive: false}))
    )
  }

  async componentDidAppear() {
    const {onRequestPermission, permission} = this.props
    if (Platform.OS === 'android' && permission === 'undetermined')
      await onRequestPermission()
    if (!this.state.viewActive && process.env.NODE_ENV !== 'e2e')
      this.setState({viewActive: true}, this.accountKitLogin)
  }

  componentDidDisappear() {
    if (!this.state.akActive) this.setState({viewActive: false})
  }

  onChange = (value) => this.setState({value})

  onSubmit = async ({token}) => {
    const {signIn} = this.props
    if (this.state.loading) return
    this.setState({loading: true, error: undefined})
    try {
      const {
        data: {accountKitSignIn}
      } = await signIn({token})
      if (!accountKitSignIn) return
      if (isRegistrationComplete(accountKitSignIn.user)) this.onSuccess()
      else this.onSignUp()
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({loading: false})
    }
  }

  onSuccess = () => {
    const {
      updateStackRoot,
      params: {tabIndex}
    } = this.props
    updateStackRoot({tabIndex})
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

  renderLoginButton() {
    const {
      params: {notice}
    } = this.props
    return (
      <Fragment>
        {notice && (
          <View style={styles.notice}>
            <Text style={styles.noticeText}>{notice}</Text>
          </View>
        )}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button testID="login_button" onPress={this.accountKitLogin}>
            Faça login
          </Button>
        </View>
      </Fragment>
    )
  }

  renderActivityIndicator() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  renderBody() {
    if (this.state.akActive || this.state.loading)
      return this.renderActivityIndicator()
    return this.renderLoginButton()
  }

  render() {
    return (
      <Shell testID="@auth.Login" bottomTabs>
        <Body>{this.renderBody()}</Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withPermission('receiveSms'),
  withSignInMutation,
  connect(
    null,
    {updateStackRoot}
  )
)(LoginScreen)
