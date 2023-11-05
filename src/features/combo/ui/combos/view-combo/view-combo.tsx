import {
  Alert,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  Card,
  Image,
  Grid,
  Divider,
} from '@mantine/core'

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
        <div>
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
                    <Group
                      key={product.id}
                      justify="space-between"
                      wrap="nowrap"
                      gap="xl"
                    >
                      <Group wrap="nowrap">
                        <Image
                          w={56}
                          h={56}
                          radius={'sm'}
                          fit="contain"
                          style={{
                            flex: '0 0 auto',
                          }}
                          src={product.image}
                          alt={product.name}
                        />
                        <Text size="sm" lineClamp={3}>
                          {product.name}
                        </Text>
                      </Group>

                      <Stack gap={0}>
                        <Text ta={'end'} style={{ whiteSpace: 'nowrap' }}>
                          {priceFormat(product.price) + ' UZC'}
                        </Text>
                        <Text
                          size="sm"
                          ta={'end'}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {product.point} Поинт
                        </Text>
                      </Stack>
                    </Group>
                  ))}
                </Stack>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </>
  )
}
