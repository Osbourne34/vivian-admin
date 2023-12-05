import { FormEvent } from 'react'
import { useRouter } from 'next/router'

import { Alert, Center, Loader } from '@mantine/core'

import { ProductForm } from '../product-form/product-form'
import { useFetchProduct, useUpdateProduct } from '../../queries/queries'
import { ProductFields } from '../../types/product-fields'

export const UpdateProduct = () => {
  const { query } = useRouter()

  const updateMutation = useUpdateProduct(Number(query.id))

  const handleSubmit = async (
    data: ProductFields,
    event: FormEvent<HTMLFormElement>,
  ) => {
    const formData = new FormData(event.currentTarget)
    if (typeof data.image !== 'string') {
      formData.set('image', data.image!)
    }
    formData.set('price', data.price)
    formData.set('horeca_price', data.horeca_price)
    formData.append('_method', 'PUT')

    try {
      await updateMutation.mutateAsync({
        id: Number(query.id),
        body: formData,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const { data, status, error } = useFetchProduct(Number(query.id))

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  return (
    <>
      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}

      {isError && (
        <Alert title="Ошибка" color="red" variant="filled">
          {error?.message}
        </Alert>
      )}

      {isSuccess && (
        <ProductForm
          initialData={{
            ...data!.data,
            category_id: String(data?.data.category_id),
            description: data?.data.description ? data.data.description : '',
            image: data?.data.image ? data.data.image : null,
            price: String(data?.data.price),
            point: String(data?.data.point),
            horeca_price: String(data?.data.horeca_price),
            horeca_point: String(data?.data.horeca_point),
            volume: String(data?.data.volume),
            keeping: String(data?.data.keeping),
          }}
          submit={handleSubmit}
          loading={updateMutation.isLoading}
          error={updateMutation.error?.message || ''}
          titleSubmit="Сохранить"
        />
      )}
    </>
  )
}
