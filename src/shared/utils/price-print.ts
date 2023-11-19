import { priceFormat } from './price-format'
import { CURRENCY } from '../constants/currency'

export const pricePrint = (price: number) => {
  return `${priceFormat(price)} ${CURRENCY}`
}
