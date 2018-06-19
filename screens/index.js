import _ from 'lodash/fp'
import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'

import * as colors from '@/assets/colors'
import {withProvider} from '@/containers/shared/Provider'
import bottomTabs from './tabs'
import * as authScreens from './auth'
import * as accountScreens from './account'
import * as listingsScreens from './listings'
import * as sharedScreens from './shared'

const SCREENS = _.flow(
  _.map(_.values),
  ([...screens]) => [].concat(...screens),
  _.filter((screen) => typeof screen === 'function' || screen.render)
)([authScreens, accountScreens, listingsScreens, sharedScreens])

const setDefaults = () =>
  Navigation.setDefaultOptions({
    topBar: {
      height: 50,
      title: {
        height: 50,
        fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
        color: colors.gray.dark
      }
    },
    bottomTabs: {
      animate: false,
      tabColor: colors.gray.dark,
      selectedTabColor: colors.blue.medium,
      fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans',
      fontSize: 11
    }
  })

const registerScreens = () =>
  SCREENS.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )

const setRoot = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: bottomTabs()
    }
  })

export default function initNavigation() {
  registerScreens()
  Navigation.events().registerAppLaunchedListener(() => {
    setDefaults()
    setRoot()
  })
}
