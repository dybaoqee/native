import theme from './theme'
import * as colors from '@/assets/colors'

/**
 * react-native-navigation default screen options
 * https://wix.github.io/react-native-navigation/v2/#/docs/styling?id=options-object-format
 */
export default {
  layout: {
    backgroundColor: 'white',
    orientation: ['portrait']
  },
  topBar: {
    buttonColor: colors.blue.medium,
    height: 50,
    elevation: 1,
    backButton: {title: ''},
    visible: true,
    animate: false,
    title: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.gray.dark,
      fontFamily: theme.fontFamily
    }
  },
  bottomTabs: {
    visible: false,
    drawBehind: true
  },
  bottomTab: {
    icon: require('@/assets/img/empty.png')
  }
}
