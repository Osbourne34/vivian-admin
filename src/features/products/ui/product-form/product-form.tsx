import { FormEvent } from 'react'

import {
  Alert,
  Button,
  Grid,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  rem,
  Text,
  Image,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { isNotEmpty, useForm } from '@mantine/form'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'

import { initialValues } from './initial-values'
import { ProductFields } from '../../types/product-fields'

import { Error } from '@/shared/types/http'
import { CategoriesSelect } from '@/features/categories'
import { PriceInput } from '@/shared/ui/price-input/price-input'
import { ProductUnitsSelect } from '@/features/products/ui/product-units-select/product-units-select'

interface ProductFormProps {
  initialData?: ProductFields
  submit: (
    body: ProductFields,
    event: FormEvent<HTMLFormElement>,
  ) => Promise<unknown>
  loading: boolean
  error: string
  titleSubmit: string
}

export const ProductForm = (props: ProductFormProps) => {
  const {
    initialData = initialValues,
    submit,
    loading,
    error,
    titleSubmit,
  } = props

  const {
    getInputProps,
    onSubmit,
    values,
    setFieldValue,
    setFieldError,
    errors,
    reset,
    isDirty,
  } = useForm<ProductFields>({
    initialValues: initialData,
    validate: {
      name: isNotEmpty('Обязательное поле'),
      category_id: isNotEmpty('Обязательное поле'),
      price: isNotEmpty('Обязательное поле'),
      point: isNotEmpty('Обязательное поле'),
      horeca_price: isNotEmpty('Обязательное поле'),
      horeca_point: isNotEmpty('Обязательное поле'),
      unit: isNotEmpty('Обязательное поле'),
      volume: isNotEmpty('Обязательное поле'),
      brand: isNotEmpty('Обязательное поле'),
      keeping: isNotEmpty('Обязательное поле'),
      mode_app: isNotEmpty('Обязательное поле'),
      conditions: isNotEmpty('Обязательное поле'),
      image: isNotEmpty('Обязательное поле'),
    },
  })

  const handleSubmit = async (
    data: typeof values,
    event?: FormEvent<HTMLFormElement>,
  ) => {
    try {
      await submit(data, event!)
      reset()
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach(({ input, message }) => {
          setFieldError(input, message)
        })
      }
    }
  }

  const preview = () => {
    let imageUrl: string
    if (typeof values.image === 'string') {
      imageUrl = values.image
    } else {
      imageUrl = URL.createObjectURL(values.image!)
    }
    return (
      <Image
        src={imageUrl}
        w={180}
        h={250}
        mt="lg"
        radius={'sm'}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        alt="preview"
      />
    )
  }

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      {error && (
        <Alert title="Ошибка" color="red" variant="filled" mb="lg">
          {error}
        </Alert>
      )}
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TextInput
            name="name"
            label="Название"
            size="md"
            withAsterisk
            {...getInputProps('name')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <CategoriesSelect
            name="category_id"
            label="Категория"
            size="md"
            withAsterisk
            searchable
            allowDeselect={false}
            {...getInputProps('category_id')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <PriceInput
            name="price"
            label="Цена"
            size="md"
            withAsterisk
            {...getInputProps('price')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            name="point"
            label="Поинт"
            size="md"
            withAsterisk
            allowNegative={false}
            hideControls
            {...getInputProps('point')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <PriceInput
            name="horeca_price"
            label="(Хорека) Цена"
            size="md"
            withAsterisk
            {...getInputProps('horeca_price')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            name="horeca_point"
            label="(Хорека) Поинт"
            size="md"
            withAsterisk
            allowNegative={false}
            hideControls
            {...getInputProps('horeca_point')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ProductUnitsSelect
            name={'unit'}
            label={'Ед. измерения'}
            size="md"
            withAsterisk
            {...getInputProps('unit')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            name={'volume'}
            label={'Объём'}
            size="md"
            withAsterisk
            allowNegative={false}
            hideControls
            {...getInputProps('volume')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TextInput
            name="brand"
            label="Бренд"
            size="md"
            withAsterisk
            {...getInputProps('brand')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <NumberInput
            name="keeping"
            label="Срок хранения"
            size="md"
            withAsterisk
            allowNegative={false}
            hideControls
            {...getInputProps('keeping')}
          />
        </Grid.Col>
        <Grid.Col>
          <Textarea
            name="mode_app"
            label="Способ применения (инструкция)"
            autosize
            minRows={2}
            size="md"
            withAsterisk
            {...getInputProps('mode_app')}
          />
        </Grid.Col>
        <Grid.Col>
          <Textarea
            name="conditions"
            label="Условия"
            autosize
            minRows={2}
            size="md"
            withAsterisk
            {...getInputProps('conditions')}
          />
        </Grid.Col>
        <Grid.Col>
          <Dropzone
            name="image"
            data-reject={errors.image}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            maxSize={2 * 1024 ** 2}
            onDrop={(file) => {
              setFieldValue('image', file[0])
            }}
            onReject={(file) => {
              notifications.show({
                message: file[0].errors[0].message,
                title: 'Ошибка валидаций',
                color: 'red',
              })
            }}
          >
            <Group
              justify="center"
              gap="xl"
              mih={100}
              style={{ pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: 'var(--mantine-color-blue-6)',
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: 'var(--mantine-color-red-6)',
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: errors.image
                      ? 'var(--mantine-color-red-6)'
                      : 'var(--mantine-color-dimmed)',
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl">
                  Перетащите изображение сюда или нажмите, чтобы выбрать файл
                </Text>
                <Text size="sm" c="dimmed" mt="xs">
                  Доступные форматы изображения: png, jpg, jpeg, svg, webp.
                </Text>
                <Text size="sm" c="dimmed" mt={6}>
                  Размер файла не больше 2 мб.
                </Text>
              </div>
            </Group>
          </Dropzone>
          {errors.image && (
            <Text c="red" size="sm" mt={4}>
              {errors.image}
            </Text>
          )}
          {values.image && preview()}
        </Grid.Col>
        <Grid.Col>
          <Textarea
            name="description"
            label="Описание"
            autosize
            minRows={2}
            size="md"
            {...getInputProps('description')}
          />
        </Grid.Col>
      </Grid>

      <Group justify="flex-end" mt="xl">
        <Button disabled={!isDirty()} loading={loading} type="submit">
          {titleSubmit}
        </Button>
      </Group>
    </form>
  )
}
