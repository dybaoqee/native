import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Tab} from '@emcasa/ui-native'

import composeWithRef from '@/lib/composeWithRef'
import {updateStackRoot, switchTab} from '@/redux/modules/navigation'
import {getTabIndexHistory} from '@/redux/modules/navigation/selectors'
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

  get isValidUser() {
    const {jwt, user} = this.props
    return jwt && user && user.id
  }

  componentDidMount() {
    if (!this.isValidUser) this.onSignOut()
  }

  onSignOut = async () => {
    const {previousTabIndex, signOut, switchTab, updateStackRoot} = this.props
    await signOut()
    updateStackRoot()
    switchTab(previousTabIndex)
  }

  onChangeTab = (tabIndex) => this.setState({tabIndex})

  render() {
    const {user} = this.props
    const tabIndex = this.state

    return (
      <Shell bottomTabs>
        {this.isValidUser ? (
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
        ) : (
          <Body loading height="auto" />
        )}
      </Shell>
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({previousTabIndex: getTabIndexHistory(state)[1]}),
    {updateStackRoot, switchTab}
  ),
  withSignOutMutation,
  withUserListings,
  withUserProfile,
  withJwt
)(UserProfileScreen)
