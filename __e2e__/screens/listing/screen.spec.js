import * as shared from '../shared/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listing', () => {
  beforeAll(actions.navigate)

  it('has a listing gallery', async () => {
    await expect(element(select.headerGallery())).toBeVisible()
  })

  describe('3d tour', () => {
    const galleryTour = () =>
      by.type('RCTWebView').withAncestor(select.headerGallery())
    const mainTour = () =>
      by.type('RCTWebview').withAncestor(select.tourScreen())
  })

  describe('gallery', () => {
    const galleryImage = (index) =>
      by.type('RCTImageView').withAncestor(select.gallerySlide(index))

    it('has listing images', async () => {
      await expect(element(galleryImage(1))).toBeVisible()
      await element(select.headerGallery()).swipe('left', 'fast', 0.6)
      await expect(element(galleryImage(2))).toBeVisible()
    })

    it('opens gallery modal at selected slide', async () => {
      await element(select.headerGallery()).tap()
      await waitFor(element(select.listingScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeVisible()
      await expect(
        element(galleryImage(2).withAncestor(select.galleryScreen()))
      )
    })

    it('closes gallery modal', async () => {
      await element(shared.modalCloseButton()).tap()
      await waitFor(element(select.galleryScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeNotVisible()
    })
  })
})
