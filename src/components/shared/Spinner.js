import {withTheme} from 'styled-components/native'
import BaseSpinner from 'react-native-spinkit'

const Spinner = withTheme(function Spinnner({color, size, theme}) {
  return (
    <BaseSpinner
      isVisible
      type="Circle"
      size={size}
      color={theme.colors[color] || color}
    />
  )
})

Spinner.defaultProps = {
  color: 'pink',
  size: 40
}

export default Spinner
