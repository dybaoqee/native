import {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {Navigation} from 'react-native-navigation'
import {connect} from 'react-redux'

import {getOptions} from '@/redux/modules/listings/feed/selectors'
import {getNeighborhoods} from '@/redux/modules/neighborhoods/selectors'
import {MultiSelectOptions} from '@/components/listings/Search/Field'
import HeaderButton from '@/screens/shared/Header/TextButton'

@connect(
  (state) => ({
    neighborhoods: getNeighborhoods(state),
    options: getOptions(state, {type: 'search'})
  }),
  null,
  null,
  {withRef: true}
)
export default class NeighborhoodsScreen extends PureComponent {
  static screen = 'listings.Search.Neighborhoods'

  static options = {
    topBar: {
      title: {text: 'Bairros'}
    }
  }

  static defaultProps = {
    neighborhoods: [],
    options: {}
  }

  state = {
    value: undefined
  }

  constructor(props) {
    super(props)
    this.state.value = props.value
  }

  componentDidAppear() {
    const {componentId} = this.props
    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [
          {
            id: `${componentId}_resetButton`,
            passProps: {
              label: 'Limpar',
              onPress: this.onReset
            },
            component: {name: HeaderButton.screen}
          }
        ]
      }
    })
  }

  onChange = (value) => {
    this.setState({value})
    this.props.onChange(value)
  }

  onReset = () => {
    this.setState({value: undefined})
    this.props.onChange(undefined)
  }

  get options() {
    const {neighborhoods} = this.props
    return neighborhoods.map((value) => ({label: value, value}))
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <MultiSelectOptions
          value={this.state.value}
          options={this.options}
          onChange={this.onChange}
        />
      </ScrollView>
    )
  }
}
