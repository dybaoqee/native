import {logEvent} from '../index'

export const logAppLaunched = () => logEvent('app-launched')

export const logBreadcrumb = ({id, name}) =>
  logEvent('screen-appeared', {
    screen: {id, name}
  })
