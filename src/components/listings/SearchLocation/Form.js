import {PureComponent} from 'react'

import {withCities} from '@/graphql/containers'
import City from './City'
import Neighborhoods from './Neighborhoods'

class LocationSearchForm extends PureComponent {
  state = {
    selectedView: 'city',
    districts: undefined
  }

  constructor(props) {
    super(props)
    this.state.selectedView = props.cities.length > 1 ? 'city' : 'neighborhoods'
  }

  switchView = (key) => this.setState({selectedView: key})

  onChangeCity = (value) => {
    if (this.props.onChangeCity) this.props.onChangeCity(value)
    this.switchView('neighborhoods')
  }

  render() {
    const {
      selectedCity: selectedCitySlug,
      selectedNeighborhoods,
      cities
    } = this.props
    const {selectedView} = this.state

    switch (selectedView) {
      case 'city':
        return (
          <City
            value={selectedCitySlug}
            cities={cities}
            onChange={this.onChangeCity}
          />
        )
      case 'neighborhoods': {
        const selectedCity = cities.find(
          ({slug}) => slug === selectedCitySlug
        ) || {neighborhoods: []}
        return (
          <Neighborhoods
            neighborhoods={selectedCity.neighborhoods}
            value={selectedNeighborhoods}
            onChange={this.props.onChangeNeighborhoods}
            onDismiss={cities.length > 1 && (() => this.switchView('city'))}
          />
        )
      }
      default:
        return null
    }
  }
}

export default withCities()(LocationSearchForm)
