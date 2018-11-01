import {View, Text, Button} from '@emcasa/ui-native'

import GhostButton from '@/components/shared/GhostButton'

export default function City({value, cities, onChange}) {
  return (
    <View>
      <Text color="white">Você está procurando um imóvel em qual cidade?</Text>
      <Button.Group
        onChange={onChange}
        flexDirection="row"
        flexWrap="wrap"
        selectedValue={value}
        mt={15}
        renderOption={(option) => (
          <View mb={10} mr={10}>
            {option}
          </View>
        )}
      >
        {cities.map(({name, slug}) => (
          <GhostButton key={slug} value={slug}>
            {name}
          </GhostButton>
        ))}
      </Button.Group>
    </View>
  )
}
