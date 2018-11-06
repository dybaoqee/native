import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import composeWithRef from '@/lib/composeWithRef'
import {updateStackRoot} from '@/screens/modules/navigation'
import {
  withUserListings,
  withSignOutMutation,
  withUserProfile
} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import Profile from '@/components/account/Profile'

import EditProfileScreen from '@/screens/modules/account/EditProfile'

class UserProfileScreen extends PureComponent {
  static screenName = 'account.Profile'

  static options = {
    topBar: {
      title: {text: 'Meu Perfil'}
    }
  }

  onEditProfile = () =>
    Navigation.push(this.props.componentId, {
      component: {name: EditProfileScreen.screenName}
    })

  onSignOut = async () => {
    const {signOut, updateStackRoot} = this.props
    await signOut()
    updateStackRoot()
  }

  render() {
    const {user} = this.props
    return (
      <Shell bottomTabs>
        <Body mb="auto">
          {user && (
            <Profile
              user={user}
              onSignOut={this.onSignOut}
              onEditProfile={this.onEditProfile}
            />
          )}
        </Body>
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    null,
    {updateStackRoot}
  ),
  withSignOutMutation,
  withUserListings,
  withUserProfile
)(UserProfileScreen)
