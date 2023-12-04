import { ReactNode } from 'react'

import {
  Alert,
  Avatar,
  Badge,
  Group,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'

import { useQuery } from '@tanstack/react-query'

import { IndividualPriceEmployee } from '../../../types/individual-price'

import { Filters } from '@/shared/api/filters/filters'
import { Error, ResponseWithData } from '@/shared/types/http'

interface EmployeesListProps {
  action: (employee: IndividualPriceEmployee) => ReactNode
}

export const EmployeesList = (props: EmployeesListProps) => {
  const { action } = props

  const {
    data: employees,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useQuery<ResponseWithData<IndividualPriceEmployee[]>, Error>(
    ['managersAndDeliveryman'],
    Filters.getManagersAndDeliveryman,
  )

  return (
    <>
      {isError && (
        <Alert color={'red'} title={'Ошибка'} mb={'md'}>
          {error?.message || 'Неизвестная ошибка'}
        </Alert>
      )}

      {isFetching && (
        <Stack>
          {[...Array(10).keys()].map((i) => (
            <Skeleton key={i} h={50} />
          ))}
        </Stack>
      )}

      {isSuccess && !isFetching && (
        <Stack>
          {employees.data.map((employee) => (
            <div key={employee.id}>
              <Group justify={'space-between'} wrap={'nowrap'}>
                <Group wrap={'nowrap'}>
                  <Avatar size={'lg'} src={employee.avatar} alt={'Photo'} />
                  <div>
                    <Text lineClamp={2}>{employee.name}</Text>
                    <Group gap={'xs'} mt={4}>
                      {employee.roles.map((role) => (
                        <Badge variant={'outline'} key={'role'}>
                          {role}
                        </Badge>
                      ))}
                    </Group>
                  </div>
                </Group>
                <Group wrap={'nowrap'}>
                  <Text visibleFrom={'xs'} size={'sm'} c={'dimmed'}>
                    +{employee.phone}
                  </Text>
                  {action(employee)}
                </Group>
              </Group>
              <Text hiddenFrom={'xs'} mt={'xs'} c={'dimmed'} size={'sm'}>
                +{employee.phone}
              </Text>
            </div>
          ))}
        </Stack>
      )}
    </>
  )
}
