import { useShowSemiFinished } from '@/features/semi-finisheds/queries/queries'
import {
  Alert,
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Loader,
  Text,
} from '@mantine/core'

interface ViewSemiFinishedProps {
  semiFinishedId: number
}

export const ViewSemiFinished = (props: ViewSemiFinishedProps) => {
  const { semiFinishedId } = props

  const {
    data: semiFinished,
    status,
    error,
  } = useShowSemiFinished(semiFinishedId)

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
          {semiFinished?.data.map((semiFinished) => (
            <Grid.Col key={semiFinished.id} span={{ base: 12, sm: 6 }}>
              <Card shadow={'sm'} withBorder h={'100%'}>
                <Group justify={'space-between'} wrap={'nowrap'}>
                  <Text lineClamp={3}>{semiFinished.name}</Text>
                  <Badge>{semiFinished.type}</Badge>
                </Group>
                <Text mt={'xs'} c={'dimmed'}>
                  Используемое кол-во: {semiFinished.used_count}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  )
}
