import {PureComponent} from 'react'
import {View, Dimensions} from 'react-native'
import {ThemeProvider} from 'styled-components'

import theme from '@/config/theme'

export default class AppThemeProvider extends PureComponent {
  state = {
    ...theme,
    dimensions: {
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen'),
      layout: {height: 0, width: 0}
    }
  }

  onLayout = ({nativeEvent: {layout}}) =>
    this.setState(({dimensions}) => ({
      dimensions: {
        layout,
        containerLayout: layout,
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
        ...dimensions
      }
    }))

  render() {
    return (
      <ThemeProvider theme={this.state}>
        <View style={{flex: 1}} onLayout={this.onLayout}>
          {this.props.children}
        </View>
      </ThemeProvider>
    )
  }
}
