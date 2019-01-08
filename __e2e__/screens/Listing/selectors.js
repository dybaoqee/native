export const listingScreen = () => by.id('@listing.Listing')

export const galleryScreen = () => by.id('@listing.Gallery')

export const tourScreen = () => by.id('@listing.Tour')

export const map = () => by.id('listing_map')

export const header = () => by.id('listing_header')

export const headerGallery = () => by.id('listing_header_gallery')

export const modalGallery = () => by.id('listing_gallery')

export const gallerySlide = (index) => by.id(`gallery_slide(${index})`)

export const scheduleVisitButton = () => by.text('Marcar visita')

export const tourButton = () => by.id('tour_button')

export const likeButton = () => by.id('favorite_button')

export const backButton = () => by.id('header_back_button')
