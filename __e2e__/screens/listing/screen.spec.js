import * as shared from '../shared/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listing', () => {
  beforeAll(actions.navigate)

  it.skip('displays a gallery in the thumbnail', async () => {
    await expect(element(select.thumbnailGallery())).toBeVisible()
  })

  it('opens the gallery modal', async () => {
    await element(select.galleryButton()).tap()
    await waitFor(element(select.listingScreen())).toBeNotVisible()
    await expect(element(select.galleryScreen())).toBeVisible()
    await element(shared.modalCloseButton()).tap()
    await waitFor(element(select.galleryScreen())).toBeNotVisible()
    await expect(element(select.galleryScreen())).toBeNotVisible()
  })

  it('opens the 3d tour modal', async () => {
    await element(select.tourButton()).tap()
    await waitFor(element(select.listingScreen())).toBeNotVisible()
    await expect(element(select.tourScreen())).toBeVisible()
    await expect(
      element(by.type('RCTWebView').withAncestor(select.tourScreen()))
    ).toExist()
    await element(shared.modalCloseButton()).tap()
    await waitFor(element(select.tourScreen())).toBeNotVisible()
    await expect(element(select.tourScreen())).toBeNotVisible()
  })
})
