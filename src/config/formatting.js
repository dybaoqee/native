import 'moment/locale/pt-br'
import moment from 'moment'
import * as libPhone from 'libphonenumber-js'

import abbrev from 'number-abbreviate'

moment.locale('pt-br')

export const number = (num) => {
  let [int, dec] = num.toString().split('.', 2)
  let result = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  if (dec) result += `,${dec}`
  return result
}

export const abbrevPrice = (num, length = 2) =>
  abbrev(num, length)
    .toString()
    .toUpperCase()
    .replace('.', ',')

export const timeElapsed = (a, b = Date.now()) => {
  const then = moment.utc(a)
  const now = moment(b)
  const hours = moment.duration(now.diff(then)).asHours()
  if (hours <= 12) return then.from(now)
  else if (hours < 24) return then.format('HH:mm')
  else if (hours < 48) return 'ontem'
  else return then.format('MM/D')
}

export const phone = (phoneNumber) =>
  libPhone.formatNumber(phoneNumber, 'BR', 'National')
