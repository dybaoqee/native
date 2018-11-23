import React, {PureComponent} from 'react'

export default (Screen) =>
  class ScreenDelegator extends PureComponent {
    static displayName = `delegate(${Screen.displayName || Screen.name})`

    static options = Screen.options

    screen = React.createRef()

    getWrappedInstance() {
      let instance = this.screen.current
      try {
        while (instance && instance.getWrappedInstance)
          instance = instance.getWrappedInstance()
      } catch (error) {
        throw new Error(
          `Unable to access ref for screen ${Screen.screenName}.\n${
            error.message
          }`,
          error
        )
      }
      return instance
    }

    resendEvent = (eventName, ...params) => {
      const instance = this.getWrappedInstance()
      if (instance && instance[eventName]) {
        instance[eventName](...params)
      }
    }

    componentDidAppear() {
      this.resendEvent('componentDidAppear')
    }

    componentDidDisappear() {
      this.resendEvent('componentDidDisappear')
    }

    navigationButtonPressed(...params) {
      this.resendEvent('navigationButtonPressed', ...params)
    }

    render() {
      return <Screen ref={this.screen} {...this.props} />
    }
  }
