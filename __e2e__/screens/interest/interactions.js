import * as select from './selectors'
import * as listing from '../listing/selectors'
import {navigate as navigateToListingScreen} from '../listing/interactions'

export async function navigate() {
  await navigateToListingScreen()
  await element(listing.scheduleVisitButton()).tap()
  await waitFor(element(select.interestFormScreen()))
    .toBeVisible()
    .withTimeout(2000)
}

export async function selectInterestType(type) {
  await element(select.interestTypeInput()).tap()
  await element(by.text(type)).tap()
}

export async function submitForm({name, email, phone} = {}) {
  if (name) await element(select.nameInput()).replaceText(name)
  if (email) await element(select.emailInput()).replaceText(email)
  if (phone) await element(select.phoneInput()).replaceText(phone)
  await element(by.text('Enviar')).tap()
}
