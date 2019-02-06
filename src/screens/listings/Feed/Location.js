import _ from 'lodash'
import {PureComponent} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import Location from '@/components/listings/SearchLocation'

import {updateCity, updateFilters} from '@/redux/modules/search'
import {getSearchCity, getSearchFilters} from '@/redux/modules/search/selectors'

class LocationContainer extends PureComponent {
  state = {
    neighborhoods: undefined
  }

  static getDerivedStateFromProps(props, state) {
    const citySlug = state.citySlug || props.citySlug
    const neighborhoods =
      state.neighborhoods ||
      (props.citySlug == citySlug ? props.filters.neighborhoods : undefined)
    return {citySlug, neighborhoods}
  }

  componentWillUnmount() {
    const citySlug = this.state.citySlug
    const neighborhoods = _.isEmpty(this.state.neighborhoods)
      ? undefined
      : this.state.neighborhoods
    if (citySlug !== this.props.citySlug) this.props.updateCity(citySlug)
    if (neighborhoods !== this.props.filters.neighborhoods)
      this.props.updateFilters({
        ...this.props.filters,
        neighborhoods
      })
  }

  onChangeCity = (citySlug) => {
    const nextState = {citySlug}
    if (citySlug !== this.state.citySlug) nextState.neighborhoods = undefined
    this.setState(nextState)
  }

  onChangeNeighborhoods = (neighborhoods) => {
    this.setState({neighborhoods})
  }

  render() {
    const {districts, ...props} = this.props
    const {citySlug, neighborhoods} = this.state
    return (
      <Location
        {...props}
        districts={districts.data || []}
        selectedCity={citySlug}
        selectedNeighborhoods={neighborhoods}
        onChangeCity={this.onChangeCity}
        onChangeNeighborhoods={this.onChangeNeighborhoods}
      />
    )
  }
}

export default compose(
  connect(
    (state) => ({
      citySlug: getSearchCity(state),
      filters: getSearchFilters(state)
    }),
    {
      updateCity,
      updateFilters
    }
  )
)(LocationContainer)
