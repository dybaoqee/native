import {cloneDeep} from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {updateFilters} from '@/redux/modules/search'
import {getSearchFilters} from '@/redux/modules/search/selectors'
import {Modal, Body} from '@/components/layout'
import SearchFilters from '@/components/listings/SearchFilters'

class ListingSearchScreen extends PureComponent {
  static screenName = 'listings.Search'

  static options = {
    layout: {
      backgroundColor: 'transparent'
    },
    screenBackgroundColor: 'transparent',
    modalPresentationStyle: 'overCurrentContext'
  }

  state = {
    initialValues: undefined,
    values: {},
    pristine: true
  }

  static getDerivedStateFromProps({filters}, {initialValues}) {
    return {
      initialValues: initialValues || cloneDeep(filters)
    }
  }

  componentDidDisappear() {
    const {updateFilters} = this.props
    const {values, pristine} = this.state
    if (!pristine) updateFilters(values)
  }

  onChange = (formState) => this.setState(formState)

  onDismiss = () => Navigation.dismissAllModals()

  render() {
    const {filters} = this.props
    const {initialValues} = this.state
    return (
      <Modal bg="pink" opacity={0.9}>
        <Modal.Header onDismiss={this.onDismiss} />
        <Body scroll>
          <SearchFilters
            initialValues={initialValues}
            onChange={this.onChange}
          />
        </Body>
      </Modal>
    )
  }
}

export default connect(
  (state) => ({
    filters: getSearchFilters(state)
  }),
  {updateFilters},
  null,
  {withRef: true}
)(ListingSearchScreen)
