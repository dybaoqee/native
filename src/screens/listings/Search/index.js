import {cloneDeep, isEqual} from 'lodash'
import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'
import {View, Button} from '@emcasa/ui-native'

import {updateFilters} from '@/redux/modules/search'
import {
  logFiltersOpen,
  logFiltersClose,
  logFiltersApply
} from '@/redux/modules/amplitude/logs/search'
import {getSearchFilters} from '@/redux/modules/search/selectors'
import {Modal, Body} from '@/components/layout'
import SearchFilters from '@/components/listings/SearchFilters'

class ListingSearchScreen extends PureComponent {
  static screenName = 'listings.Search'

  static options = {
    statusBar: {
      style: 'light',
      backgroundColor: 'transparent'
    },
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

  componentDidAppear() {
    this.props.logFiltersOpen()
  }

  componentDidDisappear() {
    const {values, initialValues, pristine} = this.state
    this.props.logFiltersClose()
    if (!pristine) {
      this.props.updateFilters(values)
      this.props.logFiltersApply({
        filters: Object.keys(values).filter(
          (key) => !isEqual(values[key], initialValues[key])
        ),
        values
      })
    }
  }

  onChange = (formState) => this.setState(formState)

  onDismiss = () => Navigation.dismissAllModals()

  render() {
    const {initialValues} = this.state
    return (
      <Modal bg="pink">
        <Modal.Header color="white" onDismiss={this.onDismiss} />
        <Body scroll>
          <SearchFilters
            initialValues={initialValues}
            onChange={this.onChange}
          />
        </Body>
        <View p="15px">
          <Button height="tall" onPress={this.onDismiss}>
            Filtrar
          </Button>
        </View>
      </Modal>
    )
  }
}

export default connect(
  (state) => ({
    filters: getSearchFilters(state)
  }),
  {
    updateFilters,
    logFiltersOpen,
    logFiltersClose,
    logFiltersApply
  },
  null,
  {withRef: true}
)(ListingSearchScreen)
