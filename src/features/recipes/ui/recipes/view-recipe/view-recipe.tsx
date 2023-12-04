import {
  Card,
  Center,
  Grid,
  Group,
  Loader,
  Text,
  Alert,
  Badge,
} from '@mantine/core'

import { useShowRecipe } from '../../../queries/queries'

interface ViewRecipeProps {
  recipeIp: number
}

export const ViewRecipe = (props: ViewRecipeProps) => {
  const { recipeIp } = props

  const { data: recipe, status, error } = useShowRecipe(recipeIp)

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
        <Grid>
          {recipe?.data.map((material) => (
            <Grid.Col key={material.id} span={{ base: 12, sm: 6 }}>
              <Card shadow={'sm'} withBorder h={'100%'} py={'xs'}>
                <Group
                  justify={'space-between'}
                  align={'flex-start'}
                  wrap={'nowrap'}
                >
                  <div>
                    <Text lineClamp={2} mb={4}>
                      {material.name}
                    </Text>
                    <Text>
                      {material.count} {material.unit}
                    </Text>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <Text size={'sm'} c={'dimmed'}>
                      Тип: {material.type}
                    </Text>
                  </div>
                </Group>
                {(material.states.deleted || material.states.empty) && (
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
    </>
  )
}
