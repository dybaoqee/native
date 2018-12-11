import * as listings from '@/screens//listings/screens'
import * as account from '@/screens//account/screens'
import * as auth from '@/screens//auth/screens'
import {Navigation} from 'react-native-navigation'

/**
 * react-native-navigation bottom tabs layout generator.
 * Returns an array of `component` layouts for each tab.
 * https://wix.github.io/react-native-navigation/v2/#/docs/layout-types?id=component
 * @param {Object} state - redux state
 * @param {Object|null} args.user - logged in user
 */
export default (_, {user}) => [
  {
    key: 'search',
    component: {name: listings.Feed.screenName},
    props: {
      icon: 'search',
      type: 'light',
      label: 'Explorar',
      strokeWidth: 25,
      size: 17,
      scale: 0.95,
      y: 10
    }
  },
  {
    key: 'create_listing',
    props: {
      onPress: () =>
        Navigation.showModal({
          component: {name: listings.Create.screenName}
        }),
      icon: 'flag',
      label: 'Anunciar'
    }
  },
  {
    key: 'favorites',
    component: {name: account.Favorites.screenName},
    props: {
      icon: 'heart',
      label: 'Favoritos'
    }
  },
  {
    key: 'account',
    component: {
      name: user.id ? account.Profile.screenName : auth.Login.screenName
    },
    props: {
      icon: 'user',
      label: user.id ? 'Meu Perfil' : 'Login'
    }
  }
]
