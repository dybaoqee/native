import _ from 'lodash'
import {Mutation} from 'react-apollo'

import {EDIT_EMAIL} from '@/graphql/modules/user/mutations'
import {withUserProfile} from './CredentialsQuery'

const EmailMutation = withUserProfile(function _EmailMutation({
  children,
  user = {}
}) {
  return (
    <Mutation mutation={EDIT_EMAIL}>
      {(mutate, props) =>
        children(
          (variables) => mutate({variables: {id: user.id, ...variables}}),
          {...props, user}
        )
      }
    </Mutation>
  )
})

export default EmailMutation

export const withEmailMutation = (Target) => (props) => (
  <EmailMutation>
    {(mutate, ctx) => (
      <Target
        {...props}
        {...ctx}
        loading={props.loading || ctx.loading}
        changeEmail={mutate}
      />
    )}
  </EmailMutation>
)
