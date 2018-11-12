import styled from 'styled-components/native'
import {themeGet} from 'styled-system'
import {Col} from '@emcasa/ui-native'

export default styled(Col)`
  border-top-width: 0.5px;
  border-color: ${themeGet('colors.lightGrey')};
`
