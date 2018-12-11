import {withTheme} from 'styled-components/native'
import {View} from '@emcasa/ui-native'

export default withTheme(function BottomTabsSpacer({children, theme}) {
  const height = theme.Shell.bottomTabsVisible ? theme.size.bottomTabs : 0
  if (typeof children === 'function')
    return children({height, visible: theme.Shell.bottomTabsVisible})
  else return <View height={height} />
})
