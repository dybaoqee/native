import qs from 'qs'
import {PureComponent} from 'react'
import {WebView, View} from 'react-native'
import {Row} from '@emcasa/ui-native'

import styled from 'styled-components/native'
import Spinner from '@/components/shared/Spinner'

const Container = styled(View)`
  flex: 1;
  z-index: 0;
  position: relative;
`

const Content = styled(View)`
  position: absolute;
  z-index: 100;
`

export default class Matterport extends PureComponent {
  static defaultProps = {
    q: {},
    width: '100%',
    height: '100%',
    useWebKit: true
  }

  state = {loading: true}

  get display() {
    return {width: this.props.width, height: this.props.height}
  }

  onLoadEnd = () => this.setState({loading: false}, this.props.onLoadEnd)

  onShouldStartLoadWithRequest = () => this.state.loading

  renderLoading = () => {
    return (
      <Row flex={1} bg="dark" justifyContent="center" alignItems="center">
        <Spinner size={40} color="white" />
      </Row>
    )
  }

  render() {
    const {q, code, ...props} = this.props
    const queryString = qs.stringify({
      ...q,
      m: code
    })
    let uri = `https://my.matterport.com/show?${queryString}`
    return (
      <Container style={this.display}>
        <Content style={this.display}>
          <WebView
            startInLoadingState
            javaScriptEnabled
            scalesPageToFit
            source={{uri}}
            style={this.display}
            renderLoading={this.renderLoading}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            onLoadEnd={this.onLoadEnd}
            {...props}
          />
        </Content>
      </Container>
    )
  }
}
