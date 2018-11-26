import {ScrollView} from 'react-native'
import {View, Row, Col, Text, Button} from '@emcasa/ui-native'
import IconButton from '@/components/shared/IconButton'
import GhostButton from '@/components/shared/GhostButton'
import styled from 'styled-components/native'

const maxHeight = ({theme}) => {
  const height = theme.dimensions.window.height * 0.45
  const buttonHeight = theme.buttonHeight[0] + 20
  return {maxHeight: Math.ceil(height / buttonHeight) * buttonHeight}
}

const OptionsContainer = styled(ScrollView).attrs({
  endFillColor: 'white',
  indicatorStyle: 'white'
})`
  ${maxHeight};
  margin-right: -10;
  margin-top: 15;
`

export default function Neighborhood({
  value,
  neighborhoods,
  onChange,
  onDismiss
}) {
  const allOptions = neighborhoods.map(({name}) => name)
  const allOptionsSelected = value && value.length === allOptions.length
  return (
    <View>
      <Row alignItems="flex-start">
        {Boolean(onDismiss) && (
          <Col pr={15} mt="5px">
            <IconButton
              onPress={onDismiss}
              name="chevron-left"
              type="light"
              color="white"
              size={20}
            />
          </Col>
        )}
        <Col flex={1}>
          <Text fontSize={16} fontWeight="500" color="white">
            Selecione os bairros desejados
          </Text>
        </Col>
      </Row>
      <OptionsContainer>
        <Button.Group
          strategy="multi"
          onChange={onChange}
          flexDirection="row"
          flexWrap="wrap"
          selectedValue={value}
          renderItem={(option) => (
            <View mb={10} mr={10}>
              {option}
            </View>
          )}
        >
          <GhostButton
            active={allOptionsSelected}
            onPress={() =>
              allOptionsSelected ? onChange([]) : onChange(allOptions)
            }
          >
            Todos os bairros
          </GhostButton>
          {neighborhoods.map(({name, slug}) => (
            <GhostButton key={slug} value={name}>
              {name}
            </GhostButton>
          ))}
        </Button.Group>
      </OptionsContainer>
    </View>
  )
}
