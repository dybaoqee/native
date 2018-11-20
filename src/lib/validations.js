import _ from 'lodash/fp'
import {validate as validateEmail} from 'email-validator'

export default function composeValidations(...validators) {
  return (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    )
}

const createValidation = (name, fun, defaultMessage = '') => (message) => {
  const validation = (value) => {
    if (message === false) return null
    if (!fun(value)) return message || defaultMessage
  }
  validation._name = name
  return validation
}

export const required = createValidation(
  'required',
  _.identity,
  'Este campo é obrigatório'
)

export const email = createValidation(
  'email',
  (value) => !value || validateEmail(value),
  'Este email é inválido'
)

const countryCode = '(\\+?\\d{1,3}|\\d{1,4})?'
const areaCode = '\\(?\\d{2,3}\\)?'
const number = '\\d{3,5}'
const sep = '[ \\-]?'
const pattern = countryCode + sep + areaCode + sep + number + sep + number
const EXPRESSION = new RegExp(`^${pattern}\\s*$`)

export const phone = createValidation(
  'phone',
  (value) => !value || EXPRESSION.test(value),
  'Este número não é inválido'
)
