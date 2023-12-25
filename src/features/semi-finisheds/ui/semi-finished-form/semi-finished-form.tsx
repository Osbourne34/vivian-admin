import {
  Button,
  Container,
  Group,
  Loader,
  Card,
  Select,
  Stack,
  Table,
  TextInput,
  Textarea,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { initialValues } from './initial-values'
import { useQuery } from '@tanstack/react-query'
import { Filters } from '@/shared/api/filters/filters'
import { selectItemsDto } from '@/shared/utils/select-items-dto'
import { useMemo } from 'react'
import { http } from '@/shared/http/http'
import { ResponseWithData } from '@/shared/types/http'
import { Material } from '@/features/materials'
import { useCreateSemiFinished } from '../../queries/queries'
import { Error } from '@/shared/types/http'

const getInfoMaterials = async (params: { id: number }[]) => {
  const queryParams = params.reduce((acc, item, index) => {
    if (index === 0) return acc + `?materials[]=${item.id}`
    return acc + `&materials[]=${item.id}`
  }, '')

  const { data } = await http<ResponseWithData<Material[]>>(
    `v1/info/materials${queryParams}`,
  )

  return data
}

export const SemiFinishedForm = () => {
  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Обязательное поле'),
      recipe_id: isNotEmpty('Обязательное поле'),
    },
  })

  const createMutation = useCreateSemiFinished()

  const handleSubmit = (body: typeof form.values) => {
    try {
      createMutation.mutateAsync(body).then(() => form.reset())
    } catch (error) {
      const err = error as Error

      if (err.errors) {
        err.errors.forEach((error) => {
          form.setFieldError(error.input, error.message)
        })
      }
    }
  }

  const { data: recipes } = useQuery({
    queryKey: ['recipes-all-with-materials'],
    queryFn: Filters.getRecipes,
    staleTime: 20_000,
  })

  const selectData = useMemo(() => {
    return recipes ? selectItemsDto(recipes?.data, 'id', 'name') : []
  }, [recipes])

  const selectedRecipe = useMemo(() => {
    return recipes?.data.find((recipe) => {
      return recipe.id === Number(form.values.recipe_id)
    })
  }, [form.values.recipe_id, recipes])

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['materials-info', selectedRecipe?.id],
    queryFn: () => getInfoMaterials(selectedRecipe?.materials ?? []),
    enabled: !!selectedRecipe,
    staleTime: 20_000,
  })

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container>
        <Card shadow="sm" withBorder>
          <Stack>
            <TextInput
              label="Название"
              size="md"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <Select
              data={selectData}
              label="Рецепт"
              searchable
              size="md"
              withAsterisk
              {...form.getInputProps('recipe_id')}
            />
            {isFetching && <Loader />}
            {selectedRecipe && isSuccess && (
              <Table.ScrollContainer minWidth={'max-content'} type="native">
                <Table captionSide="top" withTableBorder withColumnBorders>
                  <Table.Caption ta="start">
                    Материалы в составе рецепта:
                  </Table.Caption>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Название</Table.Th>
                      <Table.Th>Тип</Table.Th>
                      <Table.Th>Ед.измерения</Table.Th>
                      <Table.Th>Необходимо</Table.Th>
                      <Table.Th>Остаток</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {selectedRecipe.materials.map((material) => (
                      <Table.Tr key={material.id}>
                        <Table.Td>{material.name}</Table.Td>
                        <Table.Td>{material.type}</Table.Td>
                        <Table.Td>{material.unit}</Table.Td>
                        <Table.Td>{material.count}</Table.Td>
                        <Table.Td>
                          {
                            data.data.find((m) => material.id === m.id)
                              ?.remainder
                          }
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            )}

            <Textarea
              label="Описание"
              size="md"
              minRows={2}
              autosize
              {...form.getInputProps('description')}
            />
          </Stack>

          <Group mt="lg" justify="flex-end">
            <Button
              disabled={!form.isDirty()}
              loading={createMutation.isLoading}
              type="submit"
            >
              Создать
            </Button>
          </Group>
        </Card>
      </Container>
    </form>
  )
}
