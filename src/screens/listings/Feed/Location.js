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
    neighborhoods: undefined
  }

  static getDerivedStateFromProps(props) {
    if (!props.visible && props.filters)
      return {
        neighborhoods: props.filters.neighborhoods || []
      }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(prevProps.visible, this.props.visible) &&
      !this.props.visible
    ) {
      this.props.updateFilters({
        ...this.props.filters,
        neighborhoods: prevState.neighborhoods || []
      })
    }
  }

  onChangeCity = (citySlug) => {
    const nextState = {}
    if (citySlug !== this.props.citySlug) nextState.neighborhoods = []
    this.setState(nextState, () => this.props.updateCity(citySlug))
  }

  onChangeNeighborhoods = (neighborhoods) => this.setState({neighborhoods})

  render() {
    const {citySlug, districts, ...props} = this.props
    const {neighborhoods} = this.state
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
  ),
  withDistricts()
)(LocationContainer)
