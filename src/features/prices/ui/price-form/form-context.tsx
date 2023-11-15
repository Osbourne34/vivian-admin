import { createFormContext } from '@mantine/form'
import { PriceFields } from '../../types/price-fields'

export const [FormProvider, useFormContext, useForm] =
  createFormContext<PriceFields>()
