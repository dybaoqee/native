import {Mutation} from 'react-apollo'
import {connect} from 'react-redux'

import {BLACKLIST, WHITELIST} from '@/graphql/modules/listings/mutations'
import {GET_BLACKLISTED_LISTINGS_IDS} from '@/graphql/modules/user/queries'
import {logEvent} from '@/redux/modules/amplitude'
import {withBlacklistedListingByID} from './BlacklistQuery'

const BlacklistMutation = connect(
  null,
  {
    logEvent
  }
)(function _BlacklistMutation({children, id, blacklisted, logEvent}) {
  return (
    <Mutation
      mutation={blacklisted ? WHITELIST : BLACKLIST}
      variables={{id}}
      refetchQueries={[{query: GET_BLACKLISTED_LISTINGS_IDS}]}
      update={() =>
        logEvent(blacklisted ? 'listing-whitelisted' : 'listing-blacklisted', {
          id
        })
      }
    >
      {children}
    </Mutation>
  )
})

export default BlacklistMutation

export const withBlacklistMutation = (Target) =>
  withBlacklistedListingByID((props) => (
    <BlacklistMutation {...props}>
      {(onBlacklist) => <Target {...props} onBlacklist={() => onBlacklist()} />}
    </BlacklistMutation>
  ))
