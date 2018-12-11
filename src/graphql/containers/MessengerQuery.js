import _ from 'lodash'
import {Query} from 'react-apollo'

import {GET_MESSAGES} from '@/graphql/modules/messenger/queries'
import {MESSAGE_SENT} from '@/graphql/modules/messenger/subscriptions'
import {withUserProfile} from './CredentialsQuery'

const MessengerQuery = withUserProfile(function _MessengerQuery({
  children,
  listing,
  user = {},
  ...options
}) {
  const isThisChannel = (message) =>
    message.listing.id == listing.id &&
    (message.sender.id == user.id || message.receiver.id == user.id)
  if (!user) return children({})
  return (
    <Query
      notifyOnNetworkStatusChange
      query={GET_MESSAGES}
      variables={{listingId: listing.id, senderId: user.id}}
      {...options}
    >
      {({subscribeToMore, ...response}) =>
        children({
          ...response,
          subscribeToMoreMessages: () =>
            subscribeToMore({
              document: MESSAGE_SENT,
              updateQuery: (prev, {subscriptionData}) => {
                const newMessage = subscriptionData.data.messageSent
                if (!isThisChannel(newMessage)) return prev
                return _.defaultsDeep(
                  {
                    listingUserMessages: {
                      messages: (
                        prev.listingUserMessages.messages || []
                      ).concat(newMessage)
                    }
                  },
                  prev
                )
              }
            })
        })
      }
    </Query>
  )
})

MessengerQuery.defaultProps = {
  fetchPolicy: 'cache-and-network'
}

export default MessengerQuery

export const withMessages = (getOptions) => (Target) => (props) => (
  <MessengerQuery {...(getOptions ? getOptions(props) : {})}>
    {({data, ...response}) => (
      <Target
        {...props}
        messages={{
          loading: response.loading,
          data: data ? data.listingUserMessages : undefined,
          refetch: response.refetch,
          subscribe: response.subscribeToMoreMessages
        }}
      />
    )}
  </MessengerQuery>
)
