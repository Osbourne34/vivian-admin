import {
  Alert,
  Avatar,
  Center,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Badge,
  Title,
} from '@mantine/core'

import { ProductCard } from '@/features/products'

import { useShowPrice } from '../../../queries/queries'

interface ViewPriceProps {
  priceId: number
}

export const ViewPrice = (props: ViewPriceProps) => {
  const { priceId } = props

  const { data, status, error } = useShowPrice(priceId)

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
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title mb="sm" order={4}>
              Продукты
            </Title>
            <Stack>
              {data?.data.products.map((product) => (
                <div key={product.id}>
                  <ProductCard {...product} />
                  {product.deleted && (
                    <Badge mt={'xs'} color={'red'}>
                      УДАЛЕН
                    </Badge>
                  )}
                </div>
              ))}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title mb="sm" order={4}>
              Сотрудники
            </Title>
            <Stack>
              {data?.data.employees.map((employee) => (
                <div key={employee.id}>
                  <Group justify="space-between" wrap="nowrap">
                    <Group wrap="nowrap" gap="xs">
                      <Avatar src={employee.avatar} />
                      <Stack gap={0}>
                        <Text size="sm" lineClamp={2}>
                          {employee.name}
                        </Text>
                        <Text size="sm" c="dimmed">
                          +{employee.phone}
                        </Text>
                      </Stack>
                    </Group>
                    <Group gap="xs" justify="flex-end">
                      {employee.roles.map((role) => (
                        <Badge key={role} variant="light" color="blue">
                          {role}
                        </Badge>
                      ))}
                    </Group>
                  </Group>
                  {(employee.states.deleted || employee.states.blocked) && (
                    <Group gap={'xs'} mt={'xs'}>
                      {employee.states.deleted && (
                        <Badge color={'red'}>УДАЛЕН</Badge>
                      )}
                      {employee.states.blocked && (
                        <Badge color={'red'}>ЗАБЛОКИРОВАН</Badge>
                      )}
                    </Group>
                  )}
                </div>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      )}
    </>
  )
}
