import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30
  },
  icon: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    position: 'absolute',
    height: 30,
    top: 0,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  }
})
