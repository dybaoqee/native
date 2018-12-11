import {Image} from 'react-native'
import {Row, Col, Text, Button} from '@emcasa/ui-native'

export default function ListEmpty({
  loading,
  image,
  title,
  children,
  buttonText,
  onPress
}) {
  if (loading) return null
  return (
    <Col alignItems="center" p="25px" mt="15px">
      <Row>
        <Text fontSize="24px" textAlign="center">
          {title}
        </Text>
      </Row>
      {image && (
        <Row mt="30px" mb="10px">
          <Image source={image} style={{width: 70, height: 70}} />
        </Row>
      )}
      <Row mt="25px">
        <Text color="grey">{children}</Text>
      </Row>
      {buttonText && (
        <Row mt="25px">
          <Button fluid active height="tall" onPress={onPress}>
            {buttonText}
          </Button>
        </Row>
      )}
    </Col>
  )
}
