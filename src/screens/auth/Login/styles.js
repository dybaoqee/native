import {StyleSheet} from 'react-native'

import * as colors from '@/assets/colors'

export default StyleSheet.create({
  notice: {
    flex: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: colors.blue.light,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.blue.medium
  },
  noticeText: {
    lineHeight: 15,
    fontSize: 12,
    textAlign: 'center',
    color: colors.blue.medium
  }
})
