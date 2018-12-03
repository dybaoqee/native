import * as shared from '../shared/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listing.Listing', () => {
  beforeAll(actions.navigate)

  describe('3d tour', () => {
    const tourView = () => by.type('RCTWKWebView')
    const galleryTour = () => tourView().withAncestor(select.gallerySlide(1))

    it('has a 3d tour', async () => {
      await expect(element(galleryTour())).toExist()
    })

    it('opens tour modal', async () => {
      await element(select.headerGallery()).tap()
      await waitFor(element(select.listingScreen())).toBeNotVisible()
      await expect(element(select.tourScreen())).toBeVisible()
      await expect(
        element(tourView().withAncestor(select.tourScreen()))
      ).toBeVisible()
    })

    it('closes tour modal', async () => {
      await element(shared.modalCloseButton()).tap()
      await waitFor(element(select.galleryScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeNotVisible()
    })
  })

  describe('gallery', () => {
    const galleryImage = (index) =>
      by.type('RCTImageView').withAncestor(select.gallerySlide(index))

    it('has listing images', async () => {
      await actions.swipeGallery()
      await expect(element(galleryImage(2))).toBeVisible()
      await actions.swipeGallery()
      await expect(element(galleryImage(3))).toBeVisible()
    })

    it('opens gallery modal at selected slide', async () => {
      await element(select.headerGallery()).tap()
      await waitFor(element(select.listingScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeVisible()
      await expect(
        element(select.gallerySlide(2).withAncestor(select.galleryScreen()))
      ).toBeVisible()
    })

    it('closes gallery modal', async () => {
      await element(shared.modalCloseButton()).tap()
      await waitFor(element(select.galleryScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeNotVisible()
    })
  })
})
