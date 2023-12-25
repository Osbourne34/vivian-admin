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

import { useForm, FormProvider } from './form-context'
import { AddMaterial } from './add-material/add-material'
import { DeleteMaterial } from './delete-material/delete-material'
import { initialValues } from './initial-values'
import { RecipeFields } from '../../types/recipe-fields'

import { Error } from '@/shared/types/http'
import { RecipeUnitsSelect } from '@/features/recipes/ui/recipe-units-select/recipe-units-select'

interface RecipeFormProps {
  initialData?: RecipeFields
  submit: (body: RecipeFields) => Promise<unknown>
  loading: boolean
  error: string
  submitTitle: string
}

export const RecipeForm = (props: RecipeFormProps) => {
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
      name: isNotEmpty('Обязательное поле'),
      unit: isNotEmpty('Обязательное поле'),
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
              <Grid>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <NumberInput
                    label={'Количество'}
                    size={'md'}
                    hideControls
                    allowNegative={false}
                    {...form.getInputProps('count')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <RecipeUnitsSelect
                    label={'Ед.измерения'}
                    size={'md'}
                    withAsterisk
                    {...form.getInputProps('unit')}
                  />
                </Grid.Col>
              </Grid>

              <Switch
                label={'Активен'}
                {...form.getInputProps('active', {
                  type: 'checkbox',
                })}
              />
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
                        <Text lineClamp={2}>{material.name}</Text>
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
