export const getNavigation = (state) => state.navigation

export const getStackRootId = (state) => getNavigation(state).rootId

export const getTabIndexHistory = (state) =>
  getNavigation(state).tabIndexHistory

export const getCurrentTabIndex = (state) => getTabIndexHistory(state)[0]

export const getCurrentScreen = (state) => getNavigation(state).screen
