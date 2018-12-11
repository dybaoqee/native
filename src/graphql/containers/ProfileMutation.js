import {Mutation} from 'react-apollo'

import {EDIT_PROFILE} from '@/graphql/modules/user/mutations'
import {withUserProfile} from './CredentialsQuery'

const ProfileMutation = withUserProfile(function _ProfileMutation({
  children,
  user = {}
}) {
  return (
    <Mutation mutation={EDIT_PROFILE} variables={{id: user.id}}>
      {(mutate, props) =>
        children(
          (variables) =>
            mutate({
              variables: {id: user.id, ...variables}
            }),
          {...props, user}
        )
      }
    </Mutation>
  )
})

export default ProfileMutation

export const withProfileMutation = (Target) => (props) => (
  <ProfileMutation>
    {(mutate, ctx) => (
      <Target
        {...props}
        {...ctx}
        loading={props.loading || ctx.loading}
        editUserProfile={mutate}
      />
    )}
  </ProfileMutation>
)
