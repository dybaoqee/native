import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {View} from '@emcasa/ui-native'

export default styled(View).attrs({elevation: 4})`
  border-top-color: ${themeGet('colors.lightGrey')};
  border-top-width: 1px;
  background-color: white;
`
