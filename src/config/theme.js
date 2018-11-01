import {Platform, PixelRatio} from 'react-native'
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
    ios: 'Open Sans',
    android: 'OpenSans'
  }),
  size: {
    bottomTabs: 55,
    bottomTabsBg: {
      width: 122,
      height: 45
    }
  }
}
