import styled from 'styled-components'
import {Button} from '@emcasa/ui-native'

const GhostButton = styled(Button).attrs({
  color: 'white'
})`
  background-color: ${({active, theme: {colors}}) =>
    active ? colors.pink : 'transparent'};
  border-color: ${({active, theme: {colors}}) =>
    active ? colors.pink : 'white'};
`

GhostButton.displayName = 'GhostButton'

export default GhostButton
