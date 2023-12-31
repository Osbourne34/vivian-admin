import {
  Card,
  Grid,
  Switch,
  TextInput,
  Text,
  Group,
  Alert,
  Title,
  Stack,
  NumberInput,
  Button,
  ScrollArea,
  Badge,
} from '@mantine/core'
import { isNotEmpty } from '@mantine/form'

import { MaterialsList } from '@/features/materials'
import { ProductCard, ProductsModal } from '@/features/products'

import { useForm, FormProvider } from './form-context'
import { AddMaterial } from './add-material/add-material'
import { DeleteMaterial } from './delete-material/delete-material'
import { AddProduct } from './add-product/add-product'
import { DeleteProduct } from './delete-product/delete-product'
import { initialValues } from './initial-values'
import { PackageFields } from '../../types/package-fields'

import { Error } from '@/shared/types/http'

interface RecipeFormProps {
  initialData?: PackageFields
  submit: (body: PackageFields) => Promise<unknown>
  loading: boolean
  error: string
  submitTitle: string
}

export const PackageForm = (props: RecipeFormProps) => {
  const {
    error,
    loading,
    submit,
    submitTitle,
    initialData = initialValues,
  } = props

  const form = useForm({
    initialValues: initialData,
    validate: {
      product_id: isNotEmpty('Добавьте продукт'),
      name: isNotEmpty('Обязательное поле'),
      materials: {
        count: isNotEmpty('Обязательное поле'),
      },
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    if (form.values.materials.length === 0) {
      form.setFieldError('materials', 'Добавьте материалы')
      return
    }

    try {
      await submit(data)
      form.reset()
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach((error) => {
          form.setFieldError(error.input, error.message)
        })
      }
    }
  }

  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, xl: 6 }}>
            <Stack>
              {error && (
                <Alert title="Ошибка" color="red" variant="filled">
                  {error}
                </Alert>
              )}
              <TextInput
                label={'Название'}
                withAsterisk
                size={'md'}
                {...form.getInputProps('name')}
              />
              <Switch
                label={'Активен'}
                {...form.getInputProps('active', {
                  type: 'checkbox',
                })}
              />
              <Group justify={'space-between'}>
                <Text>Продукт:</Text>
                <ProductsModal
                  productAction={(product) => <AddProduct product={product} />}
                >
                  {(open) => (
                    <Button variant={'light'} onClick={open}>
                      Выбрать продукт
                    </Button>
                  )}
                </ProductsModal>
              </Group>
              {form.errors.product_id && (
                <Text c="red" ta="center" size="xl">
                  {form.errors.product_id}
                </Text>
              )}
              {form.values.product && (
                <ProductCard
                  action={<DeleteProduct />}
                  {...form.values.product}
                />
              )}

              <Text>Материалы:</Text>
              {form.errors.materials && (
                <Text c="red" ta="center" size="xl">
                  {form.errors.materials}
                </Text>
              )}
              {form.values.materials.length > 0 && (
                <Grid>
                  {form.values.materials.map((material, index) => (
                    <Grid.Col key={material.id} span={{ base: 12, sm: 6 }}>
                      <Card shadow={'sm'} withBorder py={'xs'} px={'sm'}>
                        <Group justify={'space-between'} wrap={'nowrap'}>
                          <Text lineClamp={2}>{material.name}</Text>
                          <Switch
                            disabled={
                              material.states?.empty || material.states?.deleted
                            }
                            label={'Хорека'}
                            {...form.getInputProps(
                              `materials.${index}.is_horeca`,
                              { type: 'checkbox' },
                            )}
                          />
                        </Group>
                        <Group
                          align={'flex-start'}
                          justify={'space-between'}
                          wrap={'nowrap'}
                          mt={'xs'}
                        >
                          <NumberInput
                            disabled={
                              material.states?.empty || material.states?.deleted
                            }
                            w={'100%'}
                            label={`Количество (${material.unit})`}
                            allowNegative={false}
                            hideControls
                            withAsterisk
                            {...form.getInputProps(`materials.${index}.count`)}
                          />
                          <DeleteMaterial index={index} mt={26} size={'lg'} />
                        </Group>
                        {(material.states?.deleted ||
                          material.states?.empty) && (
                          <Group mt={'xs'} gap={'xs'}>
                            {material.states.deleted && (
                              <Badge color={'red'}>УДАЛЕН</Badge>
                            )}
                            {material.states.empty && (
                              <Badge color={'red'}>ОТСУТСТВУЕТ</Badge>
                            )}
                          </Group>
                        )}
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </Stack>
            <Group justify={'flex-end'} mt={'lg'}>
              <Button
                disabled={!form.isDirty()}
                loading={loading}
                type={'submit'}
              >
                {submitTitle}
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xl: 6 }}>
            <Title order={3} mb={'md'}>
              Материалы
            </Title>
            <ScrollArea.Autosize mah={700} offsetScrollbars={'y'}>
              <MaterialsList
                materialAction={(material) => (
                  <AddMaterial material={material} />
                )}
              />
            </ScrollArea.Autosize>
          </Grid.Col>
        </Grid>
      </form>
    </FormProvider>
  )
}
