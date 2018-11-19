import {abbrevPrice} from '@/assets/format'

export const garageSpots = ({max}) => {
  if (!max) return 'Sem garagem'
  return `Até ${max} vagas`
}

export const rooms = ({max}) => `Até ${max} quartos`

export const price = ({min, max}) => {
  if (!max) return `R$${abbrevPrice(min)}+`
  return `R$${abbrevPrice(min)} a ${abbrevPrice(max)}`
}
export const area = ({min, max}) => {
  if (!max) return `${min}m²+`
  return `${min} a ${max}m²`
}
