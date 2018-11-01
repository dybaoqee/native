import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {View} from '@emcasa/ui-native'

import {elevation} from '@/assets/styles'

export default styled(View)`
  border-top-color: ${themeGet('colors.lightGrey')};
  border-top-width: 1px;
  background-color: white;
  ${elevation(2)};
`
