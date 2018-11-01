export const loginScreen = () => by.id('@auth.Login')

export const loginButton = () =>
  by.id('login_button').withAncestor(loginScreen())
