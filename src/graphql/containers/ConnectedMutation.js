import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

export const OPERATION_COMPLETED = 'graphql/OPERATION_COMPLETED'

const getOperationName = (op) => {
  const definition = op.definitions.find(
    ({kind}) => kind == 'OperationDefinition'
  )
  if (definition) return definition.name.value
}

// Redux action factory for
export const forward = ({operation, data}) => ({
  type: OPERATION_COMPLETED,
  name: getOperationName(operation),
  operation,
  data
})

export default connect(
  null,
  {forward}
)(function ConnectedMutation({onCompleted, forward, mutation, ...props}) {
  return (
    <Mutation
      {...props}
      mutation={mutation}
      onCompleted={(data) => {
        forward({operation: mutation, data})
        if (onCompleted) onCompleted(data)
      }}
    />
  )
})
