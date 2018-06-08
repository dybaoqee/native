import {navigateToLogin, login} from '../Auth/interactions'
import {loginScreen} from '../Auth/selectors'
import * as actions from './interactions'

describe('newListing', () => {
  context('authenticated', () => {
    beforeAll(actions.navigate)

    it('redirects to the login page', async () => {
      await expect(element(loginScreen())).toBeVisible()
    })
  })

  context.only('unauthenticated', () => {
    beforeAll(() => device.reloadReactNative())
    beforeAll(async () => {
      await navigateToLogin()
      await login({email: 'test@example.com', password: 'passwd'})
      await actions.navigate()
    })
    require('./Address')
    require('./Properties')
  })
})
