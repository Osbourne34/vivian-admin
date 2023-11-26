import { ReactNode, useCallback, useState } from 'react'

import {
  Alert,
  Box,
  Center,
  Grid,
  Pagination,
  Skeleton,
  Text,
} from '@mantine/core'
import debounce from 'lodash.debounce'

import { MaterialFilters } from '../material-filters/material-filters'
import { MaterialCard } from '../material-card/material-card'
import { useFetchMaterials } from '../../queries/queries'
import { Material } from '../../types/material'

interface MaterialsListProps {
  materialAction?: (material: Material) => ReactNode
}

export const MaterialsList = (props: MaterialsListProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

  const [type, setType] = useState<string | null>('')

  const {
    data: materials,
    isSuccess,
    error,
    isFetching,
  } = useFetchMaterials({
    page,
    type_id: type,
    search: debouncedSearchValue,
    sort: {
      sort: '',
      orderby: '',
    },
    perpage: '10',
  })

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchValue(value)
      setPage(1)
    }, 500),
    [],
  )

  return (
    <Box>
      <MaterialFilters
        search={search}
        onChangeSearch={(value) => {
          debouncedSearch(value)
          setSearch(value)
        }}
        type_id={type}
        onChangeTypeId={(value) => {
          setType(value)
          setPage(1)
        }}
        px={0}
        pt={0}
        pb={'md'}
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--mantine-color-body)',
          zIndex: 1,
        }}
      />

      {isFetching && (
        <Grid>
          {[...Array(10).keys()].map((i) => (
            <Grid.Col span={{ base: 12, sm: 6 }} key={i}>
              <Skeleton h={70} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      {error && (
        <Alert title="Ошибка" color="red" variant="filled">
          {error.message}
        </Alert>
      )}

      {!isFetching && isSuccess && (
        <>
          {materials.data.length > 0 ? (
            <>
              <Grid>
                {materials.data.map((material) => (
                  <Grid.Col key={material.id} span={{ base: 12, sm: 6 }}>
                    <MaterialCard
                      action={
                        props.materialAction && props.materialAction(material)
                      }
                      {...material}
                    />
                  </Grid.Col>
                ))}
              </Grid>
              {materials.pagination.last_page !== 1 && (
                <Center
                  px={'0'}
                  py={'md'}
                  style={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'var(--mantine-color-body)',
                  }}
                >
                  <Pagination
                    total={materials.pagination.last_page || 1}
                    value={page}
                    onChange={setPage}
                  />
                </Center>
              )}
            </>
          ) : (
            <Text ta="center" size="lg">
              Ничего не найдено
            </Text>
          )}
        </>
      )}
    </Box>
  )
}
