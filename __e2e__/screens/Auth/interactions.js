import * as select from './selectors'
import * as shared from '../shared/selectors'

export async function navigateToLogin() {
  await waitFor(element(shared.bottomTabs()))
    .toBeVisible()
    .withTimeout(3000)
  await element(shared.bottomTabButton('Login')).tap()
  await waitFor(element(select.accountKitScreen()))
    .toBeVisible()
    .withTimeout(1000)
}

export async function login() {
  await element(by.text('Login').withAncestor(select.accountKitScreen())).tap()
}
