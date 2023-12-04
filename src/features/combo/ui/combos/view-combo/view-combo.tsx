import {
  Alert,
  Center,
  Loader,
  Stack,
  Text,
  Card,
  Grid,
  Divider,
  Badge,
} from '@mantine/core'

import { ProductCard } from '@/features/products'

import { useFetchCombo } from '../../../queries/queries'

import { pricePrint } from '@/shared/utils/price-print'

interface ViewComboProps {
  comboId: number
}

export const ViewCombo = (props: ViewComboProps) => {
  const { comboId } = props

  const { data, status, error } = useFetchCombo(comboId)

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
        <Stack>
          {data?.data.combos.map((combo, index) => (
            <Card key={index} withBorder shadow="sm">
              <Grid gutter="sm">
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed">
                    Лимит:
                  </Text>
                  <Text>{combo.limit}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed">
                    Цена:
                  </Text>
                  <Text>{pricePrint(combo.price)}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="xs" c="dimmed">
                    Поинт:
                  </Text>
                  <Text>{combo.point}</Text>
                </Grid.Col>
              </Grid>

              <Divider my="md" />

              <Stack>
                {combo.products.map((product) => (
                  <div key={product.id}>
                    <ProductCard {...product} />
                    {product.deleted && (
                      <Badge color={'red'} mt={'xs'}>
                        УДАЛЕН
                      </Badge>
                    )}
                  </div>
                ))}
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </>
  )
}
