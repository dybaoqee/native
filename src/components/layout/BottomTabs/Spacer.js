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

    get isVisible() {
      return this.props.theme.Shell.bottomTabsVisible
    }

    get height() {
      return this.isVisible ? this.props.theme.size.bottomTabs : 0
    }

    _onChangeCallback() {
      const {onChange} = this.props
      if (onChange) onChange(this.height)
    }

    componentDidUpdate = this._onChangeCallback

    componentDidMount = this._onChangeCallback

    render() {
      const {children} = this.props
      if (!children) return null
      else if (typeof children === 'function')
        return children({height: this.height, visible: this.isVisible})
      else return <View height={this.height} />
    }
  }
)
