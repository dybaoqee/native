export const interestFormScreen = () => by.id('@interest.Form')

export const successScreen = () => by.id('@interest.Created')

export const interestTypeInput = () => by.text('Como fazemos?')

export const nameInput = () =>
  by.type('UIAccessibilityTextFieldElement').and(by.label('Nome'))

export const phoneInput = () =>
  by.type('UIAccessibilityTextFieldElement').and(by.label('Telefone'))

export const emailInput = () =>
  by.type('UIAccessibilityTextFieldElement').and(by.label('Email'))
