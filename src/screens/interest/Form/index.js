import _ from 'lodash/fp'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Navigation} from 'react-native-navigation'
import {Button} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {
  logInterestOpen,
  logInterestClose,
  logInterestCreated
} from '@/redux/modules/amplitude/logs/interest'
import {
  withUserProfile,
  withInterestTypes,
  withInterestMutation
} from '@/graphql/containers'
import {Shell, Body, Footer} from '@/components/layout'
import Form from '@/components/interest/Form'

import SuccessScreen from '@/screens//interest/Created'

class InterestFormScreen extends PureComponent {
  static screenName = 'interest.Form'

  static options = {
    topBar: {
      title: {text: 'Falar com Especialista'},
      backButton: {title: ''}
    }
  }

  state = {values: {}, valid: false}

  openSuccessModal = _.once(() => {
    const {params, componentId, logInterestCreated} = this.props
    logInterestCreated(params)
    Navigation.showModal({
      component: {
        id: `${componentId}_success`,
        name: SuccessScreen.screenName,
        passProps: {
          onDismiss: async () => {
            await Navigation.pop(componentId)
            await Navigation.dismissModal(`${componentId}_success`)
          }
        }
      }
    })
  })

  get initialValues() {
    const {user} = this.props
    if (user)
      return {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
  }

  componentDidAppear() {
    this.setState({active: true})
    this.props.logInterestOpen(this.props.params)
  }

  componentDidDisappear() {
    this.setState({active: false})
    this.props.logInterestClose(this.props.params)
  }

  onChange = (state) => this.setState(state)

  onSubmit = async () => {
    const {
      submitInterest,
      params: {id}
    } = this.props
    const {loading, values, valid} = this.state
    if (!values.interestTypeId || !valid || loading) return
    this.setState({loading: true, error: undefined})
    try {
      await submitInterest({variables: {listingId: id, ...values}})
      this.openSuccessModal()
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({loading: false})
    }
  }

  render() {
    const {
      interestTypes: {data}
    } = this.props
    const {loading} = this.state

    return (
      <Shell testID="@interest.Form">
        <Body scroll bounces={false}>
          <Form
            interestTypes={data || []}
            initialValues={this.initialValues}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Body>
        <Footer p="15px">
          <Button
            active
            height="tall"
            onPress={loading ? undefined : this.onSubmit}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </Footer>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {
      logInterestOpen,
      logInterestClose,
      logInterestCreated
    }
  ),
  withUserProfile,
  withInterestTypes,
  withInterestMutation
)(InterestFormScreen)
