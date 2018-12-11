import _ from 'lodash/fp'
import {PureComponent} from 'react'

import composeWithRef from '@/lib/composeWithRef'
import {withEmailMutation, withProfileMutation} from '@/graphql/containers'
import ProfileForm from '@/components/account/ProfileForm'

class ProfileFormContainer extends PureComponent {
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
      loading,
      changeEmail,
      editUserProfile,
      onSuccess,
      onError
    } = this.props
    const {values, pristine, valid} = this.state
    const shouldUpdate = !pristine
    if (!valid || loading) return
    if (shouldUpdate)
      try {
        if (user.email != values.email) await changeEmail({email: values.email})
        if (user.name != values.name || user.phone != values.phone)
          await editUserProfile({name: values.name, phone: values.phone})
      } catch (error) {
        if (onError) onError(error)
        return
      }
    if (onSuccess) onSuccess(shouldUpdate)
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
  ProfileFormContainer
)
