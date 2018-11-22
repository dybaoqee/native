import {Query} from 'react-apollo'

import {GET_INTEREST_TYPES} from '@/graphql/modules/interest/queries'

function InterestTypeQuery({children}) {
  return <Query query={GET_INTEREST_TYPES}>{children}</Query>
}

export const withInterestTypes = (Target) => (props) => (
  <InterestTypeQuery>
    {({data, ...response}) => (
      <Target
        {...props}
        interestTypes={{
          loading: response.loading,
          data: data ? data.interestTypes : undefined
        }}
      />
    )}
  </InterestTypeQuery>
)
