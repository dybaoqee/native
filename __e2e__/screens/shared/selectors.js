export const backButton = () => by.type('_UIButtonBarButton')

export const bottomTabs = () => by.id('bottom_tabs')

export const bottomTabButton = (label) =>
  by.text(label).withAncestor(bottomTabs())

export const modalCloseButton = () => by.id('close_modal_button')

export const input = (label) => by.type('RCTUITextField').and(by.label(label))

export const dropDown = (label) =>
  by.type('RCTView').and(by.label(label + ' dropdown'))
