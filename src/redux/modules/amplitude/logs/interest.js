import {logEvent} from '../index'

export const logInterestOpen = ({id}) => logEvent('listing-interest-open', {id})

export const logInterestClose = ({id}) =>
  logEvent('listing-interest-close', {id})

export const logInterestCreated = ({id}) =>
  logEvent('listing-interest-created', {id})
