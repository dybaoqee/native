import {Component} from 'react'
import {withTheme} from 'styled-components/native'
import {View} from '@emcasa/ui-native'

export default withTheme(
  class BottomTabsSpacer extends Component {
    shouldComponentUpdate(nextProps) {
      return (
        nextProps.children !== this.props.children ||
        nextProps.theme.Shell.bottomTabsVisible !==
          this.props.theme.Shell.bottomTabsVisible
      )
    }

    render() {
      const {children, theme} = this.props
      const height = theme.Shell.bottomTabsVisible ? theme.size.bottomTabs : 0
      if (typeof children === 'function')
        return children({height, visible: theme.Shell.bottomTabsVisible})
      else return <View height={height} />
    }
  }
)
