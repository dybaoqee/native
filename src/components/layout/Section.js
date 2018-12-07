import {View, Text} from '@emcasa/ui-native'

export default function Section({title, children, ...props}) {
  return (
    <View pt="25px" pb="40px" {...props}>
      <View ml="15px" mr="15px" mb="10px">
        <Text color="grey">{title.toUpperCase()}</Text>
      </View>
      {children}
    </View>
  )
}
