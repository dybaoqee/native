import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {Col} from '@emcasa/ui-native'

export default styled(Col).attrs({elevation: 4})`
  border-top-color: ${themeGet('colors.lightGrey')};
  border-top-width: 1px;
  background-color: white;
`
