import {withTheme} from 'styled-components'
import {Svg, Path} from 'react-native-svg'
import {View} from '@emcasa/ui-native'

const logoPath =
  'm52.44883,15.5c1.3,0 2.6,0.4 3.7,1.1l32.3,23.5c2.1,1.7 3,4.5 2.3,7.1l-12.3,38c-1,2.5 -3.3,4.2 -6,4.4l-40,0c-2.7,-0.1 -5,-1.8 -6,-4.4l-12.4,-38c-0.7,-2.6 0.2,-5.4 2.3,-7.1l32.3,-23.5c1.2,-0.7 2.5,-1.1 3.8,-1.1m0,-13c-4.1,0 -8,1.2 -11.3,3.6l-32.3,23.5c-6.6,5 -9.4,13.6 -7,21.6l12.4,38c2.7,7.9 10,13.2 18.3,13.3l40,0c8.3,-0.1 15.7,-5.5 18.4,-13.3l12.3,-38c2.4,-7.9 -0.4,-16.6 -7,-21.6l-32.3,-23.5c-3.4,-2.4 -7.4,-3.6 -11.5,-3.6'

const Logo = withTheme(function Logo({color, theme, size, ...props}) {
  return (
    <View {...props}>
      <Svg height={size} width={size} version="1.1" viewBox={'0 0 105 105'}>
        <Path d={logoPath} fill={theme.colors[color] || color} {...props} />
      </Svg>
    </View>
  )
})

Logo.defaultProps = {
  color: 'pink'
}

export default Logo
