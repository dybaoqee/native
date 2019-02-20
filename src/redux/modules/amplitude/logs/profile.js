import {logEvent} from '../index'

export const logProfileOpen = () => logEvent('profile-open')

export const logProfileClose = () => logEvent('profile-close')

export const logProfileEdit = () => logEvent('profile-edit')

export const logProfileEditSave = ({error} = {}) =>
  logEvent(`profile-edit-${error ? 'fail' : 'success'}`, {
    error: error ? error.message : undefined
  })

export const logProfileEditCancel = () => logEvent('profile-edit-cancel')

export const logProfileListingsOpen = () => logEvent('profile-listings-open')

export const logProfileListingsClose = () => logEvent('profile-listings-close')

export const logProfileDetailsOpen = () => logEvent('profile-details-open')

export const logProfileDetailsClose = () => logEvent('profile-details-close')
