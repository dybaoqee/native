import _ from 'lodash/fp'
import React, {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {setContext, clearContext} from '@/screens/modules/context'
import {getContext} from '@/screens/modules/context/selectors'
import {withEmailMutation, withProfileMutation} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import ProfileForm from '@/components/account/ProfileForm'

class EditProfileScreen extends PureComponent {
  static screenName = 'account.EditProfile'

  static options = {
    topBar: {
      title: {text: 'Editar perfil'}
    }
  }

  state = {}

  constructor(props) {
    super(props)
    this.state.initialValues = _.flow(
      _.pick(['name', 'phone', 'email']),
      _.mapValues((value) => value || '')
    )(props.user)
  }

  onSubmit = async () => {
    const {user, changeEmail, editUserProfile, setContext} = this.props
    const {value} = this.state
    setContext({loading: true})
    if (user.email != value.email) await changeEmail({email: value.email})
    if (user.name != value.name || user.phone != value.phone)
      await editUserProfile({name: value.name, phone: value.phone})
    setContext({loading: false})
  }

  onChange = (formState) => this.setState(formState)

  render() {
    const {initialValues} = this.state

    return (
      <Shell bottomTabs>
        <Body mb="auto">
          <ProfileForm
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
          />
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  withProfileMutation,
  withEmailMutation,
  connect(
    (state) => getContext(state, {screen: 'account'}),
    {
      setContext: setContext('account'),
      clearContext: clearContext('account')
    }
  )
)(EditProfileScreen)
