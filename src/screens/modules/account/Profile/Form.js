import _ from 'lodash/fp'
import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withEmailMutation, withProfileMutation} from '@/graphql/containers'
import ProfileForm from '@/components/account/ProfileForm'

class EditProfileScreen extends PureComponent {
  state = {}

  constructor(props) {
    super(props)
    this.state.initialValues = _.flow(
      _.pick(['name', 'phone', 'email']),
      _.mapValues((value) => value || '')
    )(props.user)
  }

  onSubmit = async () => {
    const {
      user,
      changeEmail,
      editUserProfile,
      setContext,
      onSubmit
    } = this.props
    const {values, pristine} = this.state
    const shouldUpdate = !pristine
    if (shouldUpdate) {
      setContext({loading: true})
      if (user.email != values.email) await changeEmail({email: values.email})
      if (user.name != values.name || user.phone != values.phone)
        await editUserProfile({name: values.name, phone: values.phone})
      setContext({loading: false})
    }
    if (onSubmit) onSubmit(shouldUpdate)
  }

  onChange = (formState) => this.setState(formState)

  render() {
    const {initialValues} = this.state

    return (
      <ProfileForm
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    )
  }
}

export default composeWithRef(withProfileMutation, withEmailMutation)(
  EditProfileScreen
)
