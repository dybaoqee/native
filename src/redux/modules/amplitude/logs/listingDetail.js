import {logEvent} from '../index'

export const logListingOpen = ({id}) => logEvent('listing-detail-open', {id})

export const logListingClose = ({id}) => logEvent('listing-detail-close', {id})

export const logGalleryOpen = ({id}) =>
  logEvent('listing-detail-photos-fullscreen-open', {id})

export const logGalleryClose = ({id}) =>
  logEvent('listing-detail-photos-fullscreen-close', {id})

export const logTourOpen = ({id}) =>
  logEvent('listing-detail-matterport-open', {id})

export const logTourClose = ({id}) =>
  logEvent('listing-detail-matterport-close', {id})

export const logRelatedListingOpen = ({id}) =>
  logEvent('listing-detail-view-featured-listing', {id})

export const logMapInteraction = ({id}) => logEvent('listing-detail-map', {id})

export const logGalleryInteraction = ({action, id}) =>
  logEvent(`listing-detail-photos-${action}`, {id})
