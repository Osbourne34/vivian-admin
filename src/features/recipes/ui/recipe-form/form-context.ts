import { createFormContext } from '@mantine/form'
import { RecipeFields } from '../../types/recipe-fields'

export const [FormProvider, useFormContext, useForm] =
  createFormContext<RecipeFields>()
