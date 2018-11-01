import _ from 'lodash/fp'
import {PureComponent} from 'react'

import City from './City'
import Neighborhoods from './Neighborhoods'

const groupByCity = _.groupBy(_.get('citySlug'))

const parseCities = _.flow(
  _.values,
  _.map(([district]) => ({
    name: district.city,
    slug: district.citySlug
  }))
)

const parseNeighborhoods = _.mapValues(
  _.map((district) => ({
    name: district.name,
    slug: district.nameSlug
  }))
)

const parseDistricts = _.flow(
  groupByCity,
  (districts) => ({
    cities: parseCities(districts),
    neighborhoods: parseNeighborhoods(districts)
  })
)

export default class LocationSearchForm extends PureComponent {
  state = {
    selectedView: 'city',
    districts: undefined
  }

  static getDerivedStateFromProps(props, state) {
    if (state.districts) return null
    const districts = parseDistricts(props.districts)
    return {
      districts,
      selectedView: districts.cities.length > 1 ? 'city' : 'neighborhoods'
    }
  }

  switchView = (key) => this.setState({selectedView: key})

  onChangeCity = (value) => {
    if (this.props.onChangeCity) this.props.onChangeCity(value)
    this.switchView('neighborhoods')
  }

  onChangeNeighborhoods = (value) =>
    this.props.onChangeNeighborhoods && this.props.onChangeNeighborhoods(value)

  render() {
    const {selectedCity, selectedNeighborhoods} = this.props
    const {selectedView, districts} = this.state

    switch (selectedView) {
      case 'city':
        return (
          <City
            value={selectedCity}
            cities={districts.cities}
            onChange={this.onChangeCity}
          />
        )
      case 'neighborhoods':
        return (
          <Neighborhoods
            neighborhoods={districts.neighborhoods[selectedCity] || []}
            value={selectedNeighborhoods}
            onChange={this.onChangeNeighborhoods}
            onDismiss={
              districts.cities.length > 1 && (() => this.switchView('city'))
            }
          />
        )
      default:
        return null
    }
  }
}
