import AccountKit, {
  Color,
  StatusBarStyle
} from 'react-native-facebook-account-kit'

import theme from './theme'

export default function configureAccountKit() {
  AccountKit.configure({
    responseType: 'token',
    defaultCountry: 'BR',
    receiveSMS: true,
    initialPhoneCountryPrefix: '+55',
    theme: {
      // Button
      buttonBackgroundColor: Color.hex(theme.colors.pink),
      buttonBorderColor: Color.hex(theme.colors.pink),
      buttonTextColor: Color.hex('#fff'),
      // Button disabled
      buttonDisabledBackgroundColor: Color.hex('#fff'),
      buttonDisabledBorderColor: Color.hex(theme.colors.lightGrey),
      buttonDisabledTextColor: Color.hex(theme.colors.disabled),
      // Header
      headerBackgroundColor: Color.hex(theme.colors.pink),
      headerButtonTextColor: Color.hex('#fff'),
      headerTextColor: Color.hex('#fff'),
      // Input
      inputBackgroundColor: Color.hex('#fff'),
      inputBorderColor: Color.hex(theme.colors.blue),
      inputTextColor: Color.hex(theme.colors.dark),
      // Others
      iconColor: Color.hex(theme.colors.pink),
      textColor: Color.hex(theme.colors.dark),
      titleColor: Color.hex(theme.colors.dark),
      statusBarStyle: StatusBarStyle.LightContent
    }
  })
}
