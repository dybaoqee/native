import {PureComponent} from 'react'
import {Animated} from 'react-native'

const noop = () => null

export default class Animation extends PureComponent {
  static defaultProps = {
    lazy: false,
    onEnterStart: noop,
    onEnterEnd: noop,
    onLeaveStart: noop,
    onLeaveEnd: noop
  }

  static State = Object.freeze({
    ENTER: 'Enter',
    EXIT: 'Exit'
  })

  static defaultProps = {
    update({value, active}, {easing, timeout, useNativeDriver}) {
      return Animated.timing(value, {
        easing,
        duration: timeout,
        toValue: active ? 1 : 0,
        useNativeDriver
      })
    }
  }

  constructor(props) {
    super(props)
    const {initialValue} = props
    this.state.active = props.in
    this.state.visible = props.in
    if (typeof initialValue === 'function') this.state.value = initialValue()
    else if (!isNaN(initialValue))
      this.state.value = new Animated.Value(initialValue)
    else this.state.value = new Animated.Value(props.in ? 1 : 0)
  }

  state = {
    visible: undefined,
    active: undefined,
    animation: undefined,
    value: undefined
  }

  update(active) {
    const toState = Animation.State[active ? 'ENTER' : 'EXIT']
    let {animation, value} = this.state
    if (animation) animation.stop()
    animation = this.props.update({value, active}, this.props)
    this.setState(
      {
        visible: active || this.state.visible,
        active,
        animation
      },
      () => {
        animation.start(() => {
          this._run(`on${toState}End`)
          if (!active) this.setState({visible: false})
        })
        this._run(`on${toState}Start`)
      }
    )
  }

  _run = (event) => {
    const callback = this.props[event]
    if (callback) callback(this.props)
  }

  componentDidUpdate(prev) {
    if (this.props.in !== prev.in) this.update(this.props.in)
  }

  render() {
    if (this.props.lazy && !this.state.visible) return null
    return this.props.children(this.state)
  }
}

const mapAnimationToProps = ({value, active}) => ({
  animationState: active,
  animationValue: value
})

export const withAnimation = (
  getOptions = {},
  getProps = mapAnimationToProps
) => (Target) => ({
  onEnterStart,
  onEnterEnd,
  onExitStart,
  onExitEnd,
  ...props
}) => (
  <Animation
    in={props.in}
    {...(typeof getOptions === 'function'
      ? getOptions(props)
      : getOptions || {})}
    {...{
      onEnterStart,
      onEnterEnd,
      onExitStart,
      onExitEnd
    }}
  >
    {(state) => <Target {...props} {...getProps(state, props)} />}
  </Animation>
)
