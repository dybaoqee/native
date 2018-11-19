import {Mutation} from 'react-apollo'

import {INSERT_INTEREST} from '@/graphql/modules/interest/mutations'

export default function InterestMutation({children}) {
  return (
    <Mutation mutation={INSERT_INTEREST}>
      {(mutate, props) =>
        children(
          ({variables}) => mutate({variables: {input: variables}}),
          props
        )
      }
    </Mutation>
  )
}

export const withInterestMutation = (Target) => (props) => (
  <InterestMutation>
    {(mutation, ctx) => (
      <Target submitInterest={mutation} {...props} {...ctx} />
    )}
  </InterestMutation>
)
