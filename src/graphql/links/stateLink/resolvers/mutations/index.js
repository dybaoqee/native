import {merge} from 'lodash'

import * as favorites from './favorites'
import * as credentials from './credentials'

export default merge(favorites, credentials)
