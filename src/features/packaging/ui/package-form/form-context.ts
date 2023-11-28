import { createFormContext } from '@mantine/form'
import { PackageFields } from '../../types/package-fields'

export const [FormProvider, useFormContext, useForm] =
  createFormContext<PackageFields>()
