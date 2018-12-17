import _ from 'lodash'
import {PureComponent} from 'react'
import {StatusBar, Platform} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {ApolloProvider} from 'react-apollo'
import {Navigation} from 'react-native-navigation'
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'

import defaultOptions from '@/config/screen'
import client from '@/lib/client'
import ThemeProvider from './ThemeProvider'
import ScreenDelegator from './ScreenDelegator'

export default class AppProvider extends PureComponent {
  state = {
    ready: false
  }

  async componentDidMount() {
    await client.ready
    this.setState({ready: true})
  }

  render() {
    const {children} = this.props
    if (!this.state.ready) return null
    return (
      <Provider store={client.store}>
        <PersistGate persistor={client.store.persistor}>
          <ThemeProvider>
            <ApolloProvider client={client.graphql}>{children}</ApolloProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export const withProvider = (Target) =>
  gestureHandlerRootHOC(
    class extends ScreenDelegator(Target) {
      static defaultProps = {params: {}}

      static displayName = `withProvider(${Target.displayName || Target.name})`

      static options = _.defaultsDeep(Target.options || {}, defaultOptions)

      constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
      }

      renderStatusBar() {
        const {
          statusBar: {visible, style, backgroundColor, drawBehind}
        } = this.constructor.options
        if (Platform.OS !== 'ios') return
        return (
          <StatusBar
            animated
            hidden={!visible}
            translucent={drawBehind}
            barStyle={style ? `${style}-content` : undefined}
            backgroundColor={backgroundColor}
          />
        )
      }

      render() {
        return (
          <AppProvider>
            {this.renderStatusBar()}
            <Target ref={this.screen} {...this.props} />
          </AppProvider>
        )
      }
    }
  )
