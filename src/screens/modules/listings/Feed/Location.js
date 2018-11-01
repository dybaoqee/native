import _ from 'lodash'
import {PureComponent} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withDistricts} from '@/graphql/containers'
import Location from '@/components/listings/SearchLocation'

import {updateCity, updateFilters} from '@/redux/modules/search'
import {getSearchCity, getSearchFilters} from '@/redux/modules/search/selectors'

class LocationContainer extends PureComponent {
  state = {
    neighborhoodsSlugs: undefined
  }

  update() {
    const {neighborhoodsSlugs} = this.state
    this.props.updateFilters({
      ...this.props.filters,
      neighborhoodsSlugs
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.neighborhoodsSlugs && props.filters)
      return {
        neighborhoodsSlugs: props.filters.neighborhoodsSlugs || []
      }
    return null
  }

  componentDidUpdate(prev) {
    if (!_.isEqual(prev.visible, this.props.visible) && !this.props.visible) {
      this.update()
    }
  }

  onChangeCity = (citySlug) => {
    const nextState = {}
    if (citySlug !== this.props.citySlug) nextState.neighborhoodsSlugs = []
    this.setState(nextState, () => this.props.updateCity(citySlug))
  }

  onChangeNeighborhoods = (neighborhoodsSlugs) =>
    this.setState({neighborhoodsSlugs})

  render() {
    const {citySlug, districts, ...props} = this.props
    const {neighborhoodsSlugs} = this.state
    return (
      <Location
        {...props}
        districts={districts.data || []}
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
      updateCity,
      updateFilters
    }
  ),
  withDistricts()
)(LocationContainer)
