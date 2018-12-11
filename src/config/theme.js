import {Platform, StatusBar, PixelRatio} from 'react-native'
import {fas} from '@fortawesome/pro-solid-svg-icons'
import {fal} from '@fortawesome/pro-light-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import theme from '@emcasa/ui'

export default {
  ...theme,
  fontSizes: theme.fontSizes.map((size) =>
    PixelRatio.roundToNearestPixel(size * 0.85)
  ),
  icons: {
    default: fas,
    solid: fas,
    light: fal,
    brands: fab
  },
  fontFamily: Platform.select({
    ios: 'Fakt Soft Pro',
    android: 'FaktSoftPro'
  }),
  size: {
    statusBar: Platform.select({
      ios: 20,
      android: 0
    }),
    topBar: 50,
    bottomTabs: 55,
    bottomTabsBg: {
      width: 122,
      height: 45
    }
  },
  Dropdown: {
    offset: {
      top: Platform.select({
        android: -StatusBar.currentHeight,
        ios: 0
      })
    }
  }
}
