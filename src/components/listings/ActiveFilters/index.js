import _ from 'lodash'
import fp from 'lodash/fp'
import {Fragment} from 'react'
import {ScrollView} from 'react-native'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {withPropsOnChange} from 'recompose'
import {Row, Text} from '@emcasa/ui-native'

import * as parse from './parseFilters'
import IconButton from '@/components/shared/IconButton'

const Filter = styled(function Filter({children, onPress, ...props}) {
  return (
    <Row {...props}>
      <Text color="white" fontSize={12}>
        {children}
      </Text>
      <IconButton
        name="times-circle"
        color="white"
        onPress={onPress}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        size={16}
        ml="5px"
      />
    </Row>
  )
})`
  align-items: center;
  border-radius: 20px;
  padding: 5px;
  padding-left: 10px;
  background-color: ${themeGet('colors.pink')};
  margin-vertical: 5px;
  margin-right: 5px;
`

function FilterArray({name, value, onChange}) {
  const toString = parse[name] || _.identity
  return (
    <Fragment>
      {value.map((val) => (
        <Filter
          key={val}
          onPress={() => onChange({[name]: _.without(value, val)})}
        >
          {toString(val)}
        </Filter>
      ))}
    </Fragment>
  )
}

function ActiveFilters({filters, onChange}) {
  return (
    <ScrollView style={{maxHeight: 110}}>
      <Row flexWrap="wrap">
        {filters.map(
          ({key, value}) =>
            _.isArray(value) ? (
              <FilterArray
                key={key}
                name={key}
                value={value}
                onChange={onChange}
              />
            ) : (
              <Filter key={key} onPress={() => onChange({[key]: undefined})}>
                {key in parse ? parse[key](value) : value}
              </Filter>
            )
        )}
      </Row>
    </ScrollView>
  )
}

const sortFilters = fp.flow(
  fp.entries,
  fp.map(([key, value]) => ({key, value})),
  fp.sortBy(['key'])
)

export default withPropsOnChange(['filters'], ({filters, props}) => ({
  filters: sortFilters(filters),
  ...props
}))(ActiveFilters)
