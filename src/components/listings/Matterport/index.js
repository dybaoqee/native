import qs from 'qs'
import {PureComponent} from 'react'
import {WebView, View, Platform} from 'react-native'

import styles from './styles'

const hasWebglSupport = Platform.OS === 'ios' || Platform.Version >= 19 // >= Android 4.4 kitkat

export default class Matterport extends PureComponent {
  static defaultProps = {
    q: {},
    width: '100%',
    height: '100%',
    useWebKit: true
  }

  render() {
    const {children, q, code, width, height, ...props} = this.props
    const queryString = qs.stringify({
      ...q,
      m: code
    })
    let uri = `https://my.matterport.com/show?${queryString}`
    const display = {width, height}
    return (
      <View style={[styles.container, display]}>
        {code &&
          hasWebglSupport && (
            <View style={[styles.content, display]}>
              <WebView
                javaScriptEnabled
                source={{uri}}
                style={[styles.webview, display]}
                {...props}
              />
            </View>
          )}
        <View style={[styles.fallback, display]}>{children}</View>
      </View>
    )
  }
}
