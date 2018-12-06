import gql from 'graphql-tag'

import * as frag from '@/graphql/fragments'

export const EDIT_EMAIL = gql`
  mutation changeEmail($id: ID!, $email: String!) {
    changeEmail(id: $id, email: $email) {
      id
      email
    }
  }
`

export const EDIT_PASSWORD = gql`
  mutation changePassword(
    $id: ID!
    $newPassword: String!
    $currentPassword: String!
  ) {
    changePassword(
      id: $id
      newPassword: $newPassword
      currentPassword: $currentPassword
    ) {
      id
      email
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation editUserProfile(
    $id: ID!
    $name: String
    $phone: String
    $deviceToken: String
    $notificationPreferences: NotificationPreferencesInput
  ) {
    editUserProfile(
      id: $id
      name: $name
      phone: $phone
      deviceToken: $deviceToken
      notificationPreferences: $notificationPreferences
    ) {
      ...UserProfile
    }
  }
  ${frag.UserProfile}
`

export const AK_SIGN_IN = gql`
  mutation accountKitSignIn($token: String!) {
    accountKitSignIn(accessToken: $token) {
      jwt
      user {
        ...UserProfile
      }
    }
  }
  ${frag.UserProfile}
`

export const SIGN_UP = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $phone: String
    $password: String!
    $deviceToken: String
  ) {
    register(
      name: $name
      email: $email
      phone: $phone
      password: $password
      deviceToken: $deviceToken
    ) {
      jwt
      user {
        ...UserProfile
      }
    }
  }
  ${frag.UserProfile}
`

export const SIGN_OUT = gql`
  mutation signOut {
    storeCredentials(jwt: "", user: "") @client {
      jwt
    }
  }
`

export const STORE_CREDENTIALS = gql`
  mutation storeCredentials($jwt: String, $user: User) {
    storeCredentials(jwt: $jwt, user: $user) @client {
      jwt
    }
  }
`
