import {abbrevPrice} from '@/config/formatting'

const rangeFilter = (singular, plural = singular + 's') => ({min, max}) => {
  if (max == 0) return `Sem ${plural}`
  else if (min && max)
    return `${min == max ? min : `${min} a ${max}`} ${
      max > 1 ? plural : singular
    }`
  else if (min) return `${min}+ ${plural}`
  else if (max) return `Até ${max} ${max > 1 ? plural : singular}`
}

export const garageSpots = rangeFilter('vaga')
export const rooms = rangeFilter('quarto')
export const suites = rangeFilter('suíte')
export const price = ({min, max}) => {
  if (!max) return `R$${abbrevPrice(min)}+`
  return `R$${abbrevPrice(min)} a ${abbrevPrice(max)}`
}
export const area = ({min, max}) => {
  if (!max) return `${min}m²+`
  return `${min} a ${max}m²`
}
