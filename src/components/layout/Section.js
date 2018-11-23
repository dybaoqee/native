import {View, Text} from '@emcasa/ui-native'

export default function Section({title, children}) {
  return (
    <View bg="#f0f0f0" pt="25px" pb="40px">
      <View ml="15px" mr="15px" mb="15px">
        <Text fontWeight="500" fontSize={13}>
          {title.toUpperCase()}
        </Text>
      </View>
      {children}
    </View>
  )
}
