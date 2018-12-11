import {Mutation} from 'react-apollo'

import {MESSENGER_RECEIVER_ID} from '@/config/const'
import {
  GET_MESSAGES,
  GET_CHANNEL_FEED
} from '@/graphql/modules/messenger/queries'
import {SEND_MESSAGE} from '@/graphql/modules/messenger/mutations'
import {withUserProfile} from './CredentialsQuery'

const SendMessageMutation = withUserProfile(function _SendMessageMutation({
  children,
  listing,
  receiver,
  user = {},
  ...options
}) {
  return (
    <Mutation
      mutation={SEND_MESSAGE}
      refetchQueries={[
        {query: GET_CHANNEL_FEED},
        {
          query: GET_MESSAGES,
          variables: {listingId: listing.id, senderId: user.id}
        }
      ]}
      {...options}
    >
      {(mutate, ctx) =>
        children(
          (variables) =>
            mutate({
              variables: {
                listingId: listing.id,
                receiverId: receiver.id,
                ...variables
              }
            }),
          ctx
        )
      }
    </Mutation>
  )
})

SendMessageMutation.defaultProps = {
  receiver: {id: MESSENGER_RECEIVER_ID}
}

export const withSendMessageMutation = (getOptions) => (Target) => (props) => (
  <SendMessageMutation {...(getOptions ? getOptions(props) : {})}>
    {(sendMessage) => <Target {...props} sendMessage={sendMessage} />}
  </SendMessageMutation>
)
