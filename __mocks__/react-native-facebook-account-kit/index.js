import {Navigation} from 'react-native-navigation'
import AccountKitScreen from './AccountKitScreen'

export default {
  configure() {
    Navigation.registerComponent('mock.AccountKit', () => AccountKitScreen)
  },
  loginWithPhone() {
    return new Promise((resolve) => {
      Navigation.showModal({
        component: {
          name: 'mock.AccountKit',
          passProps: {resolve}
        }
      })
    })
  }
}

export const Color = {
  hex() {}
}

export const StatusBarStyle = {}
