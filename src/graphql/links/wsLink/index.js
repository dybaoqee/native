import WSLink from './Link'

import {WEB_SOCKET_URL} from '@/config/const'

export default () => new WSLink(WEB_SOCKET_URL)
