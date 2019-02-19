import _ from 'lodash/fp'
import {Query} from 'react-apollo'

import {GET_ALL_DISTRICTS} from '@/graphql/modules/meta/queries'
import {compose, withPropsOnChange} from 'recompose'

const mapToProp = (prop) => (value) => ({[prop]: value})

const groupByCity = _.groupBy(_.get('citySlug'))

const parseNeighborhoods = _.map((district) => ({
  city: district.city,
  citySlug: district.citySlug,
  name: district.name,
  slug: district.nameSlug
}))

const parseNeighborhoodsNames = _.flow(
  parseNeighborhoods,
  _.reduce(
    (names, district) => ({
      ...names,
      [district.slug]: district.name
    }),
    {}
  )
)

const parseCities = _.flow(
  groupByCity,
  _.values,
  _.map((districts) => ({
    name: districts[0].city,
    slug: districts[0].citySlug,
    neighborhoods: parseNeighborhoods(districts)
  }))
)

function DistrictsQuery(props) {
  return (
    <Query query={GET_ALL_DISTRICTS} fetchPolicy="cache-first" {...props} />
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

export const withCities = (getOptions) =>
  compose(
    withDistricts(getOptions),
    withPropsOnChange(
      ['districts'],
      _.flow(
        _.get('districts.data'),
        parseCities,
        mapToProp('cities')
      )
    )
  )

export const withNeighborhoods = (getOptions) =>
  compose(
    withDistricts(getOptions),
    withPropsOnChange(
      ['districts'],
      _.flow(
        _.get('districts.data'),
        parseNeighborhoods,
        mapToProp('neighborhoods')
      )
    )
  )

export const withNeighborhoodsNames = (getOptions) =>
  compose(
    withDistricts(getOptions),
    withPropsOnChange(
      ['districts'],
      _.flow(
        _.get('districts.data'),
        parseNeighborhoodsNames,
        mapToProp('neighborhoodsNames')
      )
    )
  )
