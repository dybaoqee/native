import {PureComponent} from 'react'
import {Platform, AppState, Alert} from 'react-native'
import Permissions from 'react-native-permissions'

export default class PermissionProvider extends PureComponent {
  state = {}

  componentDidMount() {
    this.initialRequest = this.onUpdatePermission()
    AppState.addEventListener('change', this.onAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChange)
  }

  onAppStateChange = (state) => {
    if (state === 'active') this.onUpdatePermission()
  }

  onUpdatePermission = async () => {
    const {permission, options} = this.props
    let response
    try {
      response = await Permissions.check(permission, options)
    } catch (err) {
      response = 'undetermined'
    }
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    this.setState({value: response})
    return response
  }

  onRequestPermission = async (alert = true) => {
    const {permission, options, showAlert} = this.props
    const currentResponse = this.state.value || (await this.initialRequest)
    let response
    switch (currentResponse) {
      case 'authorized':
      case 'restricted':
        // already authorized or blocked
        return currentResponse
      case 'denied':
        if (!alert) break
        if (Platform.OS === 'ios') return this.showSettingsAlertIOS()
        else response = await Permissions.request(permission, options)
        break
      default:
        if (showAlert) await this.showAlert()
        response = await Permissions.request(permission, options)
        break
    }
    this.setState({value: response})
    return response
  }

  showAlert(options = [{text: 'OK'}]) {
    return new Promise((resolve) => {
      Alert.alert(
        this.props.title,
        this.props.reason,
        options.map((option) => ({
          ...option,
          onPress: () => {
            if (option.onPress) option.onPress()
            resolve()
          }
        }))
      )
    })
  }

  showSettingsAlertIOS() {
    const options = [{text: 'Cancelar', style: 'cancel', onPress: () => null}]
    if (Permissions.canOpenSettings()) {
      options.push({
        text: 'Configurações',
        onPress: () => Permissions.openSettings().then(this.onUpdatePermission)
      })
    }
    return Alert.alert(this.props.title, this.props.reason, options)
  }

  render() {
    return this.props.children({
      state: this.state.value,
      requestPermission: this.onRequestPermission,
      updatePermission: this.onUpdatePermission
    })
  }
}

export const withPermission = (permission, options) => (Target) => (props) => (
  <PermissionProvider permission={permission} {...options}>
    {(ctx) => (
      <Target
        {...props}
        permissions={{...(props.permissions || {}), [permission]: ctx}}
      />
    )}
  </PermissionProvider>
)
