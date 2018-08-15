export const getFirebaseMessaging = (state) => state.firebase.messaging
export const getToken = (state) => getFirebaseMessaging(state).token
export const hasPermission = (state) =>
  getFirebaseMessaging(state).hasPermission
