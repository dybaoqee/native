export const navButton = () =>
  by.label('Login').withAncestor(by.id('@shared.Shell.Navigation'))
export const loginScreen = () => by.id('@auth.Login')
export const signUpScreen = () => by.id('@auth.SignUp')
export const resetPasswordScreen = () => by.id('@auth.ResetPassword')
export const successScreen = () => by.id('@auth.Success')
export const passwordResetButton = () => by.text('Esqueci a minha senha')
export const signUpButton = () => by.text('Cadastre-se')
export const input = (label) => by.type('RCTUITextField').and(by.label(label))
