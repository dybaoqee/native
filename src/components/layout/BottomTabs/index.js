import styled from 'styled-components/native'
import {Fragment} from 'react'
import {themeGet, bottom} from 'styled-system'
import {compose} from 'recompose'
import {connect} from 'react-redux'

import getBottomTabs from '@/config/tabs'
import {switchTab} from '@/redux/modules/navigation'
import {getCurrentTabIndex} from '@/redux/modules/navigation/selectors'
import {withUserProfile} from '@/graphql/containers'
import Button from './Button'
import Tabs from './Tabs'
import Background from './Background'

const Center = styled.View.attrs({
  pointerEvents: 'box-none'
})`
  z-index: 2;
  position: absolute;
  align-items: center;
  bottom: 0;
  margin-bottom: 17px;
  padding: 10px;
  left: 50%;
  margin-left: ${({theme}) => -(theme.size.bottomTabsBg.width / 2)};
  width: ${themeGet('size.bottomTabsBg.width', '100%')};
  ${bottom};
`

const BaseBottomTabs = function BottomTabs({
  testID,
  tabs,
  tabIndex,
  onChange,
  icon,
  type,
  bottom,
  onPress
}) {
  const hasButton = Boolean(icon)
  return (
    <Fragment>
      {hasButton && (
        <Center bottom={bottom}>
          <Button icon={icon} type={type} onPress={onPress} />
        </Center>
      )}
      <Background hasButton={hasButton} testID={testID} bottom={bottom}>
        <Tabs
          tabs={tabs}
          tabIndex={tabIndex}
          hasButton={hasButton}
          onChange={onChange}
        />
      </Background>
    </Fragment>
  )
}

const BottomTabs = compose(
  withUserProfile,
  connect(
    (state, {user}) => ({
      tabs: getBottomTabs(state, {user: user || {}}),
      tabIndex: getCurrentTabIndex(state)
    }),
    {onChange: switchTab}
  )
)(BaseBottomTabs)

export default BottomTabs
