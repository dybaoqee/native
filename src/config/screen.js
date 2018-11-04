import theme from './theme'

/**
 * react-native-navigation default screen options
 * https://wix.github.io/react-native-navigation/v2/#/docs/styling?id=options-object-format
 */
export default {
  layout: {
    backgroundColor: 'white',
    orientation: ['portrait']
  },
  statusBar: {
    visible: true,
    style: 'dark',
    backgroundColor: 'white'
  },
  topBar: {
    buttonColor: theme.colors.pink,
    height: 50,
    elevation: 1,
    borderColor: theme.colors.border,
    backButton: {
      icon: require('@/assets/img/back.png'),
      title: '',
      color: theme.colors.pink
    },
    visible: true,
    animate: false,
    title: {
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.dark,
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
