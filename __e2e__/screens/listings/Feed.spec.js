import * as select from './selectors'

describe('listings.Feed', () => {
  beforeAll(async () => {
    await waitFor(element(select.feed())).toBeVisible()
  })

  it('loads more listings on scroll', async () => {
    await expect(element(select.nthCard(1))).toExist()
    await expect(element(select.nthCard(16))).toNotExist()
    await element(select.feed()).swipe('up', 'fast', 0.6)
    await element(select.feed()).swipe('up', 'fast', 0.6)
    await waitFor(element(select.nthCard(16)))
      .toExist()
      .withTimeout(3000)
    await expect(element(select.nthCard(16))).toExist()
    await device.reloadReactNative()
  })

  const iterations = 3

  it('saves client-side favorited listings', async () => {
    for (let i = 1; i <= iterations; ++i) {
      const likeButton = element(select.nthLikeButton(i))
      await expect(likeButton).toBeVisible()
      await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
      await likeButton.tap()
      await expect(likeButton).toHaveLabel('Remover dos favoritos')
      await likeButton.tap()
      await expect(likeButton).toHaveLabel('Adicionar aos favoritos')
      if (i < iterations) await element(select.feed()).swipe('up', 'slow', 0.25)
    }
  })
})
