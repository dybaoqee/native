export const getFirebaseConfig = (state) => state.firebase.config
export const getConfig = (state, {key}) => getFirebaseConfig(state)[key]
