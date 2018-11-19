import _ from 'lodash/fp'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {Button} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {
  withUserProfile,
  withInterestTypes,
  withInterestMutation
} from '@/graphql/containers'
import {Shell, Body, Footer} from '@/components/layout'
import Form from '@/components/interest/Form'

import SuccessScreen from '@/screens/modules/shared/Success'

class InterestFormScreen extends PureComponent {
  static screenName = 'interest.Form'

  static options = {
    topBar: {
      title: {text: 'Marcar visita'},
      backButton: {title: ''}
    }
  }

  state = {value: undefined, interestType: undefined, active: false}

  openSuccessModal = _.once(() => {
    const {componentId} = this.props
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: SuccessScreen.screenName,
        passProps: {
          title: 'Agente EmCasa notificado',
          children:
            'Entraremos em contato o mais rápido possível para agendarmos uma visita!',
          onDismiss: async () => {
            await Navigation.dismissModal(`${componentId}_success`)
            await Navigation.pop(componentId)
          }
        }
      }
    })
  })

  get defaultValue() {
    const {user} = this.props
    if (user)
      return {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
  }

  componentDidUpdate(prev) {
    const {loading, error} = this.props
    const finishedLoading = prev.loading && !loading
    if (finishedLoading && !error && this.state.active) this.openSuccessModal()
  }

  componentDidAppear() {
    this.setState({active: true})
  }

  componentDidDisappear() {
    this.setState({active: false})
  }

  onChange = (value) => this.setState({value})

  onSubmit = () => {
    const {
      request,
      loading,
      params: {id}
    } = this.props
    const {value} = this.state
    const interestType = value.interest_type_id
    if (loading) return
    request(id, value)
    this.setState({interestType})
  }

  render() {
    const {
      interestTypes: {data, loading}
    } = this.props
    const {value} = this.state

    return (
      <Shell>
        <Body scroll bounces={false}>
          <Form
            interestTypes={data || []}
            value={value}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer p="15px">
          <Button
            active
            disabled={loading}
            height="tall"
            onPress={this.onSubmit}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  withUserProfile,
  withInterestTypes,
  withInterestMutation
)(InterestFormScreen)
