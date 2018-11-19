export const listingScreen = () => by.id('@listing.Listing')

export const galleryScreen = () => by.id('@listing.Gallery')

export const tourScreen = () => by.id('@listing.Tour')

export const map = () => by.id('listing_map')

export const header = () => by.id('listing_header')

export const headerGallery = () => by.id('listing_header_gallery')

export const modalGallery = () => by.id('listing_gallery')

export const gallerySlide = (index) => by.id(`gallery_slide(${index})`)

export const likeButton = () => by.label('Acidionar aos favoritos')

export const unlikeButton = () => by.label('Remover dos favoritos')
