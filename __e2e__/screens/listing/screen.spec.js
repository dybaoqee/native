import * as shared from '../shared/selectors'
import * as listings from '../listings/selectors'
import * as select from './selectors'
import * as actions from './interactions'

describe('listing.Listing', () => {
  beforeAll(actions.navigate)

  describe('gallery', () => {
    let currentSlide = 1
    const galleryImage = (index) =>
      by.type('RCTImageView').withAncestor(select.gallerySlide(index))

    it('has listing images', async () => {
      for (; currentSlide <= 3; ++currentSlide) {
        await expect(element(galleryImage(currentSlide))).toBeVisible()
        await actions.swipeGallery()
      }
    })

    it('opens gallery modal at selected slide', async () => {
      await element(select.headerGallery()).tap()
      await waitFor(element(select.listingScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeVisible()
      await expect(
        element(
          select.gallerySlide(currentSlide).withAncestor(select.galleryScreen())
        )
      ).toBeVisible()
    })

    it('closes gallery modal', async () => {
      await element(shared.modalCloseButton()).tap()
      await waitFor(element(select.galleryScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeNotVisible()
    })
  })

  describe('3d tour', () => {
    const tourView = () => by.type('RCTWKWebView')
    const galleryTour = () => tourView().withAncestor(select.headerGallery())

    it('has a webview slide', async () => {
      await expect(element(galleryTour())).toExist()
    })

    it('scrolls to webview slide', async () => {
      await element(select.tourButton()).tap()
      await waitFor(element(galleryTour()))
        .toBeVisible()
        .withTimeout(500)
      await expect(element(galleryTour())).toBeVisible()
    })

    it('opens tour modal', async () => {
      await element(select.headerGallery()).tap()
      await waitFor(element(select.listingScreen()))
        .toBeNotVisible()
        .withTimeout(1000)
      await expect(element(select.tourScreen())).toBeVisible()
      await expect(element(tourView())).toBeVisible()
    })

    it('closes tour modal', async () => {
      await element(shared.modalCloseButton()).tap()
      await waitFor(element(select.galleryScreen())).toBeNotVisible()
      await expect(element(select.galleryScreen())).toBeNotVisible()
    })
  })

  describe('action bar', () => {
    it('saves to favorites', async () => {
      const likeButton = element(select.likeButton())
      await expect(likeButton).toBeVisible()
      await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
      await likeButton.tap()
      await expect(likeButton).toHaveLabel('Remover dos favoritos')
      await likeButton.tap()
      await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
    })

    it('returns to the previous screen', async () => {
      const backButton = element(select.backButton())
      await expect(backButton).toBeVisible()
      await backButton.tap()
      await waitFor(element(select.listingScreen())).toBeNotVisible()
      await expect(element(listings.feedScreen())).toBeVisible()
    })
  })
})
