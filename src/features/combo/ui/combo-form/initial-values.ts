import { ComboFields } from '../../types/combo-fields'

export const initialValues: ComboFields = {
  name: '',
  point: '',
  price: '',
  combos: [
    {
      id: 1,
      limit: '',
      products: [],
    },
  ],
}
