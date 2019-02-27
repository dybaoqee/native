import * as listing from '../listing/selectors'
import * as shared from '../shared/selectors'
import {login, navigateToLogin} from '../auth/interactions'
import * as select from './selectors'
import * as action from './interactions'

async function init() {
  try {
    await navigateToLogin()
    await login()
  } finally {
    await action.navigate()
  }
}

describe('interest.Form', () => {
  beforeAll(init)

  it('autofills user data', async () => {
    await action.selectInterestType('Me ligue dentro de 5 minutos')
    await expect(element(select.nameInput())).toHaveValue('John Doe')
  })

  it('opens a modal on success', async () => {
    await action.submitForm()
    await expect(element(select.successScreen())).toBeVisible()
    await element(shared.modalCloseButton()).tap()
    await waitFor(element(listing.listingScreen()))
      .toBeVisible()
      .withTimeout(2000)
    await expect(element(listing.listingScreen())).toBeVisible()
  })
})
