export const LOG_EVENT = 'amplitude/LOG_EVENT'

export const logEvent = (event, data = {}) => ({type: LOG_EVENT, event, data})
