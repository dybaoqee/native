import * as listings from '../listings/selectors'
import {map} from './selectors'

export async function navigate() {
  await waitFor(element(listings.nthCard(1)))
    .toBeVisible()
    .withTimeout(3000)
  await element(listings.nthCard(1)).tap()
  await waitFor(element(map()))
    .toExist()
    .withTimeout(5000)
}
