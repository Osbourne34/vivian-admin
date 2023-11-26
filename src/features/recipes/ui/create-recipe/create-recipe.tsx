import { RecipeForm } from '../recipe-form/recipe-form'
import { useCreateRecipe } from '../../queries/queries'
import { RecipeFields } from '../../types/recipe-fields'

export const CreateRecipe = () => {
  const createMutation = useCreateRecipe()

  const handleSubmit = async (data: RecipeFields) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <RecipeForm
      submit={handleSubmit}
      submitTitle={'Создать'}
      loading={createMutation.isLoading}
      error={createMutation.error?.message || ''}
    />
  )
}
