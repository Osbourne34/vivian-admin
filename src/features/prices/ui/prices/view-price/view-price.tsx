import { useShowPrice } from '@/features/prices/queries/queries'
import { priceFormat } from '@/shared/utils/price-format'
import {
  Alert,
  Avatar,
  Center,
  Grid,
  Group,
  Loader,
  Stack,
  Image,
  Text,
  Badge,
  Title,
  Divider,
} from '@mantine/core'

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
                <Group key={product.id} justify="space-between" wrap="nowrap">
                  <Group align="center" wrap="nowrap">
                    <Avatar
                      src={product.image}
                      alt={product.name}
                      size="lg"
                      radius="sm"
                    />
                    <Text lineClamp={3} size="sm">
                      {product.name}
                    </Text>
                  </Group>
                  <Stack gap={4}>
                    <Text ta="end" style={{ whiteSpace: 'nowrap' }} size="sm">
                      {priceFormat(product.price) + ' UZC'}
                    </Text>
                    <Text ta="end" style={{ whiteSpace: 'nowrap' }} size="xs">
                      {priceFormat(product.point) + ' Поинт'}
                    </Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title mb="sm" order={4}>
              Сотрудники
            </Title>
            <Stack>
              {data?.data.employees.map((employee) => (
                <Group key={employee.id} justify="space-between" wrap="nowrap">
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
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      )}
    </>
  )
}
