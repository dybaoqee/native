import {abbrevPrice} from '@/assets/format'

export const garageSpots = ({min, max}) => {
  if (!max || max >= 4) return `${min}+ vagas`
  return `${min}-${max >= 4 ? '4+' : max} vagas`
}

export const rooms = ({min, max}) => {
  if (!max || max >= 4) return `${min}+ quartos`
  return `${min}-${max >= 4 ? '4+' : max} quartos`
}
export const price = ({min, max}) => {
  if (!max || max >= 10000000) return `R$${abbrevPrice(min)}+`
  return `R$${abbrevPrice(min)}-${abbrevPrice(max)}`
}
export const area = ({min, max}) => {
  if (!max || max >= 1000) return `${min}m²+`
  return `${min}-${max}m²`
}
