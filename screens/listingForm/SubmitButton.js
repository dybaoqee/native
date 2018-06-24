import {PureComponent} from 'react'
import {connect} from 'react-redux'

import * as colors from '@/assets/colors'
import composeWithRef from '@/lib/composeWithRef'
import {submit} from './reducer'
import {isLoading, hasUnsavedChanges} from './selectors'
import Button from '@/screens/shared/Header/TextButton'

class ListingFormSubmitButton extends PureComponent {
  static screenName = 'listingForm.SubmitButton'

  onPress = () => {
    const {loading, hasChanges, submit} = this.props
    if (!loading && hasChanges) submit()
  }

  render() {
    const {loading, hasChanges} = this.props

    return (
      <Button
        label="Salvar e sair"
        style={hasChanges ? undefined : {color: colors.gray.medium}}
        loading={loading}
        onPress={this.onPress}
      />
    )
  }
}

export default composeWithRef(
  connect(
    (state) => ({
      loading: isLoading(state),
      hasChanges: hasUnsavedChanges(state)
    }),
    {submit}
  )
)(ListingFormSubmitButton)
