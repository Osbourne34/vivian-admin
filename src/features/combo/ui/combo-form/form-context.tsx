import { createFormContext } from '@mantine/form'
import { ComboFields } from '@/features/combo/types/combo-fields'

export const [FormProvider, useFormContext, useForm] =
  createFormContext<ComboFields>()