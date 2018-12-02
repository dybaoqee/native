import {PureComponent} from 'react'
import {Navigation} from 'react-native-navigation'

import {Modal, Body} from '@/components/layout'

const fadeInAnimation = {
  enabled: true,
  y: {from: 0, to: 0},
  x: {from: 0, to: 0},
  alpha: {
    from: 0,
    to: 1,
    duration: 500,
    startDelay: 0,
    interpolation: 'accelerate'
  }
}

const fadeOutAnimation = {
  enabled: true,
  y: {from: 0, to: 0},
  x: {from: 0, to: 0},
  alpha: {
    from: 1,
    to: 0,
    duration: 500,
    startDelay: 0,
    interpolation: 'decelerate'
  }
}

export default class BottomTabsModal extends PureComponent {
  static screenName = 'shared.BottomTabsModal'

  static defaultProps = {
    bottomTabs: {},
    bg: 'white',
    opacity: 0.8
  }

  static options = {
    statusBar: {
      style: 'dark',
      backgroundColor: 'white'
    },
    layout: {
      backgroundColor: 'transparent'
    },
    animations: {
      dismissModal: fadeOutAnimation,
      showModal: fadeInAnimation
    },
    screenBackgroundColor: 'transparent',
    modalPresentationStyle: 'overCurrentContext',
    modalTransitionStyle: 'crossDissolve'
  }

  static show(options) {
    Navigation.showModal({
      component: {
        id: 'bottom_tabs_modal',
        name: this.screenName,
        ...options
      }
    })
  }

  static hide(id = 'bottom_tabs_modal') {
    Navigation.dismissModal(id)
  }

  onDismiss = () => Navigation.dismissAllModals()

  render() {
    const {children, bg, opacity, bottomTabs} = this.props
    return (
      <Modal bg={bg} opacity={opacity} bottomTabs={bottomTabs}>
        <Body p={30} flex={1} alignItems="center" justifyContent="center">
          {children}
        </Body>
      </Modal>
    )
  }
}
