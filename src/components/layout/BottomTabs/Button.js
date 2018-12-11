import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from '@emcasa/ui-native'

import {touchable} from '@/components/shared/Touchable'

const SIZE = 60

const ButtonIcon = styled(Icon)`
  transform: rotate(45deg);
`

const Button = styled(function Button({icon, type, active, ...props}) {
  let colors = ['#FB0090', '#F50057']
  if (active) colors[1] = colors[0]
  return (
    <LinearGradient colors={colors} {...props}>
      <ButtonIcon
        name={icon}
        type={type}
        color="white"
        stroke="white"
        strokeWidth={10}
      />
    </LinearGradient>
  )
})`
  justify-content: center;
  align-items: center;
  width: ${SIZE};
  height: ${SIZE};
  border-radius: 20;
  transform: rotate(-45deg);
`

export default touchable(Button)
