import {Mutation} from 'react-apollo'

import {MESSENGER_RECEIVER_ID} from '@/config/const'
import {GET_CHANNEL_FEED} from '@/graphql/modules/messenger/queries'
import {MARK_AS_READ} from '@/graphql/modules/messenger/mutations'

export default function MarkAsReadMutation({children, ...options}) {
  return (
    <Mutation
      mutation={MARK_AS_READ}
      refetchQueries={[{query: GET_CHANNEL_FEED}]}
      {...options}
    >
      {(mutate, ctx) =>
        children(
          (id) =>
            mutate({
              variables: {id}
            }),
          ctx
        )
      }
    </Mutation>
  )
}

MarkAsReadMutation.defaultProps = {
  receiver: {id: MESSENGER_RECEIVER_ID}
}

export const withMarkAsReadMutation = (getOptions) => (Target) => (props) => (
  <MarkAsReadMutation {...(getOptions ? getOptions(props) : {})}>
    {(markAsRead) => <Target {...props} markAsRead={markAsRead} />}
  </MarkAsReadMutation>
)
