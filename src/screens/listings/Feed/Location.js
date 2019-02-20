import _ from 'lodash'
import {PureComponent} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import Location from '@/components/listings/SearchLocation'

import {updateCity, updateFilters} from '@/redux/modules/search'
import {
  logNeighborhoodsOpen,
  logNeighborhoodsClose,
  logChangeCity,
  logNeighborhoodsApply,
  logNeighborhoodsClear
} from '@/redux/modules/amplitude/logs/search'
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
    this.props.logNeighborhoodsOpen()
  }

  componentWillUnmount() {
    const citySlug = this.state.citySlug
    const neighborhoodsSlugs = _.isEmpty(this.state.neighborhoodsSlugs)
      ? undefined
      : this.state.neighborhoodsSlugs
    this.props.logNeighborhoodsClose()
    if (citySlug !== this.props.citySlug) {
      this.props.updateCity(citySlug)
      this.props.logChangeCity({city: citySlug})
    }
    if (neighborhoodsSlugs !== this.props.filters.neighborhoodsSlugs) {
      this.props.updateFilters({
        ...this.props.filters,
        neighborhoodsSlugs
      })
      if (_.isEmpty(neighborhoodsSlugs)) this.props.logNeighborhoodsClear()
      else this.props.logNeighborhoodsApply({neighborhoods: neighborhoodsSlugs})
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
      logNeighborhoodsOpen,
      logNeighborhoodsClose,
      logChangeCity,
      logNeighborhoodsApply,
      logNeighborhoodsClear,
      updateCity,
      updateFilters
    }
  )
)(LocationContainer)
