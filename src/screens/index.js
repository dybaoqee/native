import _ from 'lodash/fp'
import {Navigation} from 'react-native-navigation'

import {withProvider} from '@/containers/Provider'
import * as authScreens from './auth/screens'
import * as accountScreens from './account/screens'
import * as listingScreens from './listing/screens'
import * as listingsScreens from './listings/screens'
import * as interestScreens from './interest/screens'
import * as sharedScreens from './shared/screens'

const screens = _.flow(
  _.map(_.values),
  ([...screens]) => [].concat(...screens),
  _.filter((screen) => screen.screenName)
)([
  authScreens,
  accountScreens,
  listingScreens,
  listingsScreens,
  interestScreens,
  sharedScreens
])

export default screens

export const getScreenByName = (name) =>
  screens.find((Screen) => Screen.screenName === name)

export const registerScreens = () =>
  screens.map((Screen) =>
    Navigation.registerComponent(Screen.screenName, () => withProvider(Screen))
  )
