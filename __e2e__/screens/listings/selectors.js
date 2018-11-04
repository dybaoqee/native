export const feedScreen = () => by.id('@listings.Feed')

export const feed = () => by.id('listing_feed').withAncestor(feedScreen())

export const nthCard = (n) =>
  by.id(`listing_card(${n})`).withAncestor(feedScreen())

export const nthLikeButton = (n) =>
  by.id('favorite_button').withAncestor(nthCard(n))
