import {first, last} from 'lodash'
import fp, {__} from 'lodash/fp'
import {View, Text} from '@emcasa/ui-native'
import styled from 'styled-components/native'

const initials = (name = '') => {
  const nameParts = name.trim().split(' ')
  if (nameParts.length === 1) return name.slice(0, 2).toUpperCase()
  else return (first(nameParts)[0] + last(nameParts)[0]).toUpperCase()
}

const Avatar = styled(function Avatar({user, color, fontSize, ...props}) {
  return (
    <View {...props}>
      <Text fontSize={fontSize} color={color}>
        {user.name ? initials(user.name) : '?'}
      </Text>
    </View>
  )
})`
  border-radius: ${fp.flow(
    fp.get('size'),
    parseInt,
    fp.divide(__, 2)
  )};
  width: ${fp.get('size')};
  height: ${fp.get('size')};
  justify-content: center;
  align-items: center;
`

export default Avatar

Avatar.defaultProps = {
  size: '90px',
  fontSize: '38px',
  color: 'white',
  bg: 'blue'
}
