import {Query} from 'react-apollo'

import {GET_ALL_DISTRICTS} from '@/graphql/modules/meta/queries'

function DistrictsQuery({nameSlug, citySlug, stateSlug, ...props}) {
  return (
    <Query
      query={GET_ALL_DISTRICTS}
      fetchPolicy="cache-and-network"
      variables={{nameSlug, citySlug, stateSlug}}
      {...props}
    />
  )
}

export const withDistricts = (getOptions) => (Target) => (props) => (
  <DistrictsQuery {...(getOptions ? getOptions(props) : {})}>
    {(response) => (
      <Target
        {...props}
        districts={{
          loading: response.loading,
          data: response.data
            ? response.data.districts || response.data.district
            : [],
          refetch: response.refetch
        }}
      />
    )}
  </DistrictsQuery>
)
