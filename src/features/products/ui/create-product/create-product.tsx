import { FormEvent } from 'react'

import { ProductForm } from '../product-form/product-form'
import { useCreateProduct } from '../../queries/queries'
import { ProductFields } from '../../types/product-fields'

export const CreateProduct = () => {
  const createMutation = useCreateProduct()

  const handleSubmit = async (
    data: ProductFields,
    event: FormEvent<HTMLFormElement>,
  ) => {
    const formData = new FormData(event?.currentTarget!)
    formData.set('image', data.image!)
    formData.set('price', data.price)
    formData.set('horeca_price', data.horeca_price)

    try {
      await createMutation.mutateAsync(formData)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <ProductForm
      submit={handleSubmit}
      loading={createMutation.isLoading}
      error={createMutation.error?.message || ''}
      titleSubmit="Создать"
    />
  )
}
