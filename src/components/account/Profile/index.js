import {Row, Col, Text} from '@emcasa/ui-native'

import * as format from '@/assets/format'

export default function UserProfile({user}) {
  return (
    <Col flex={1} alignItems="center" justifyContent="flex-start">
      <Row>
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
  )
}
