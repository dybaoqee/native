import {logEvent} from '../index'

export const logListingFavorite = ({id}) => logEvent('listing-favorite', {id})

export const logListingUnfavorite = ({id}) =>
  logEvent('listing-unfavorite', {id})

export const logListingShare = ({id, app}) =>
  logEvent('listing-share', {id, app})
