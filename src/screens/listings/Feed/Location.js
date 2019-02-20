import _ from 'lodash'
import {PureComponent} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import Location from '@/components/listings/SearchLocation'

import {updateCity, updateFilters} from '@/redux/modules/search'
import {logEvent} from '@/redux/modules/amplitude'
import {getSearchCity, getSearchFilters} from '@/redux/modules/search/selectors'

class LocationContainer extends PureComponent {
  state = {
    neighborhoodsSlugs: undefined
  }

  static getDerivedStateFromProps(props, state) {
    const citySlug = state.citySlug || props.citySlug
    const neighborhoodsSlugs =
      state.neighborhoodsSlugs ||
      (props.citySlug == citySlug
        ? props.filters.neighborhoodsSlugs
        : undefined)
    return {citySlug, neighborhoodsSlugs}
  }

  componentDidMount() {
    this.props.logEvent('listing-search-neighborhood-open')
  }

  componentWillUnmount() {
    const citySlug = this.state.citySlug
    const neighborhoodsSlugs = _.isEmpty(this.state.neighborhoodsSlugs)
      ? undefined
      : this.state.neighborhoodsSlugs
    if (citySlug !== this.props.citySlug) {
      this.props.updateCity(citySlug)
      this.props.logEvent('listing-search-neighborhood-change-city', {
        city: citySlug
      })
    }
    if (neighborhoodsSlugs !== this.props.filters.neighborhoodsSlugs) {
      this.props.updateFilters({
        ...this.props.filters,
        neighborhoodsSlugs
      })
      this.props.logEvent(
        `listing-search-neighborhood-${
          _.isEmpty(neighborhoodsSlugs) ? 'clear' : 'apply'
        }`,
        {neighborhoods: neighborhoodsSlugs}
      )
    }
  }

  onChangeCity = (citySlug) => {
    const nextState = {citySlug}
    if (citySlug !== this.state.citySlug) nextState.neighborhoods = undefined
    this.setState(nextState)
  }

  onChangeNeighborhoods = (neighborhoodsSlugs) => {
    this.setState({neighborhoodsSlugs})
  }

  render() {
    const {citySlug, neighborhoodsSlugs} = this.state
    return (
      <Location
        {...this.props}
        selectedCity={citySlug}
        selectedNeighborhoods={neighborhoodsSlugs}
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
      logEvent,
      updateCity,
      updateFilters
    }
  )
)(LocationContainer)
