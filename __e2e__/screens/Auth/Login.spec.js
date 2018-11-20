import * as listings from '../listings/selectors'
import * as select from './selectors'
import * as action from './interactions'

describe('auth.Login', () => {
  beforeAll(action.navigateToLogin)

  it('redirects to the main screen on success', async () => {
    await action.login()
    await waitFor(element(select.accountKitScreen()))
      .toBeNotVisible()
      .withTimeout(500)
    await waitFor(element(select.loginScreen()))
      .toBeNotVisible()
      .withTimeout(500)
    await expect(element(listings.feedScreen())).toBeVisible()
  })
})
