import {
  Alert,
  Center,
  Loader,
  Stack,
  Text,
  Card,
  Grid,
  Divider,
} from '@mantine/core'

import { ProductCard } from '@/features/products'

import { useFetchCombo } from '../../../queries/queries'

import { priceFormat } from '@/shared/utils/price-format'

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
                  <Text>{priceFormat(combo.price) + ' UZC'}</Text>
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
                  <ProductCard key={product.id} {...product} />
                ))}
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </>
  )
}
