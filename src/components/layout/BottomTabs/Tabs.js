import {chunk} from 'lodash'
import {get} from 'lodash/fp'
import styled from 'styled-components/native'
import {themeGet} from 'styled-system'
import {TouchableOpacity} from 'react-native'
import {View, Icon, Text} from '@emcasa/ui-native'

const Tab = styled(function Tab({
  label,
  icon,
  type,
  active,
  strokeWidth,
  x,
  y,
  size,
  scale,
  ...props
}) {
  const color = active ? 'pink' : 'dark'
  return (
    <TouchableOpacity {...props}>
      <Icon
        name={icon}
        type={type}
        color={color}
        stroke={color}
        strokeWidth={strokeWidth}
        {...{strokeWidth, x, y, scale, size}}
      />
      <Text fontSize={9} color={color}>
        {label}
      </Text>
    </TouchableOpacity>
  )
})`
  flex: 1;
  justify-content: space-between;
  padding-top: 14;
  padding-bottom: 6;
  align-items: center;
`

Tab.defaultProps = {
  type: 'solid',
  size: 16
}

const renderTabs = ({tabIndex, onChange}) => (tabs, offset = 0) =>
  tabs.map(({key, props, component}, i) => {
    const index = i + offset
    return (
      <Tab
        key={key}
        active={component && tabIndex == index}
        onPress={() => onChange(index)}
        {...props}
      />
    )
  })

export default styled(function Tabs({hasButton, tabs, ...props}) {
  const [left, right] = chunk(tabs, Math.ceil(tabs.length / 2))
  const $renderTabs = renderTabs(props)
  return (
    <View zIndex={2} {...props}>
      {$renderTabs(left)}
      {hasButton && <View width={60} height={1} alignSelf="flex-end" />}
      {$renderTabs(right, left.filter(get('component')).length)}
    </View>
  )
})`
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  background-color: transparent;
  height: ${themeGet('size.bottomTabs', 0)};
`
