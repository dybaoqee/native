import {View, Row, Col, Button, Text} from '@emcasa/ui-native'

import * as format from '@/assets/format'
import Avatar from '../Avatar'

export default function UserProfile({user, onSignOut, onEditProfile}) {
  return (
    <View flex={1}>
      <Col flex={1} alignItems="center" justifyContent="center">
        <Avatar user={user} />
        <Row mt="15px" mb="5px">
          <Text fontSize={24} fontWeight="500">
            {user.name}
          </Text>
        </Row>
        {user.email && (
          <Row mt="15px">
            <Text color="grey" fontSize={18}>
              {user.email}
            </Text>
          </Row>
        )}
        {user.phone && (
          <Row mt="15px">
            <Text color="grey" fontSize={18}>
              {format.phone(user.phone)}
            </Text>
          </Row>
        )}
      </Col>
      <Col>
        <Button active m="25px" mb="20px" height="tall" onPress={onEditProfile}>
          Editar
        </Button>
        <Button m="25px" mb="20px" mt="0" height="tall" onPress={onSignOut}>
          Sair
        </Button>
      </Col>
    </View>
  )
}
