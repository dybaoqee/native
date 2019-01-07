import _ from 'lodash'

export const debounceTransition = (func) =>
  _.debounce(func, 500, {
    leading: true,
    trailing: false
  })
