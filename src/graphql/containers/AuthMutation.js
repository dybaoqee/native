import {Mutation} from 'react-apollo'

import {
  AK_SIGN_IN,
  SIGN_OUT,
  STORE_CREDENTIALS
} from '@/graphql/modules/user/mutations'
import ConnectedMutation from './ConnectedMutation'

const withAuthMutation = (mutationName, Mutation) => (Target) => (props) => (
  <Mutation>
    {(mutate, state) => (
      <Target
        {...{
          ...props,
          [mutationName]: Object.assign(
            (variables = {}) => mutate({variables}),
            state
          )
        }}
      />
    )}
  </Mutation>
)

export function SignInMutation({children}) {
  return (
    <Mutation ignoreResults mutation={STORE_CREDENTIALS}>
      {(storeCredentials) => (
        <ConnectedMutation mutation={AK_SIGN_IN}>
          {(signIn, state) =>
            children(async (...args) => {
              const result = await signIn(...args)
              const {
                data: {accountKitSignIn}
              } = result
              if (accountKitSignIn)
                await storeCredentials({variables: accountKitSignIn})
              return result
            }, state)
          }
        </ConnectedMutation>
      )}
    </Mutation>
  )
}

export const withSignInMutation = withAuthMutation('signIn', SignInMutation)

export function SignOutMutation({children}) {
  return (
    <ConnectedMutation mutation={SIGN_OUT}>
      {(signOut, state) => children(signOut, state)}
    </ConnectedMutation>
  )
}

export const withSignOutMutation = withAuthMutation('signOut', SignOutMutation)
