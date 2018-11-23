import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Tab} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {updateStackRoot} from '@/redux/modules/navigation'
import {
  withUserListings,
  withSignOutMutation,
  withUserProfile,
  withJwt
} from '@/graphql/containers'
import {Shell, Body} from '@/components/layout'
import ProfileTab from './ProfileTab'
import ListingsTab from './ListingsTab'

class UserProfileScreen extends PureComponent {
  static screenName = 'account.Profile'

  static options = {
    topBar: {
      title: {text: 'Meu Perfil'},
      elevation: 0,
      noBorder: true,
      leftButtons: [
        {
          id: 'account.Profile#logo',
          icon: require('@/assets/img/icons/logo.png')
        }
      ]
    }
  }

  state = {
    tabIndex: 0
  }

  onSignOut = async () => {
    const {signOut, updateStackRoot} = this.props
    await signOut()
    updateStackRoot()
  }

  onChangeTab = (tabIndex) => this.setState({tabIndex})

  render() {
    const {user, jwt} = this.props
    const tabIndex = this.state

    return (
      <Shell bottomTabs>
        {Boolean(jwt) && (
          <Body mb="auto" height="auto">
            <Tab.Group
              onChange={this.onChangeTab}
              tabBarProps={{pl: 15, pr: 15}}
            >
              <Tab label="Meu Perfil">
                <ProfileTab
                  tabIndex={tabIndex}
                  user={user}
                  onSignOut={this.onSignOut}
                />
              </Tab>
              <Tab label="Meus Imóveis">
                <ListingsTab />
              </Tab>
            </Tab.Group>
          </Body>
        )}
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
  withUserProfile,
  withJwt
)(UserProfileScreen)
