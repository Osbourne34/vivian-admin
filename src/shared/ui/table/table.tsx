import { Box, Loader, Table as MantineTable, Text } from '@mantine/core'

import { Th } from './th/th'
import { Pagination } from './pagination/pagination'
import { Boolean } from './boolean/boolean'

import classes from './table.module.css'

import { Column, Sort } from './types'

interface TableProps {
  columns: Column[]
  data: any
  onSort: (sort: Sort) => void
  sort: Sort
  total: number
  page: number
  rowsPerPage: string | null
  onRowsPerPageChange: (value: string | null) => void
  onPageChange: (value: number) => void
  isLoading: boolean
  isError: boolean
}

export const Table = (props: TableProps) => {
  const {
    columns,
    data = [],
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    sort,
    onSort,
    total,
    isError,
    isLoading,
  } = props

  const handleSort = (key: string) => {
    if (key === sort.sort) {
      onSort({
        ...sort,
        orderby: sort.orderby === 'asc' ? 'desc' : 'asc',
      })
    } else {
      onSort({
        sort: key,
        orderby: 'asc',
      })
    }
  }

  return (
    <>
      <MantineTable.ScrollContainer
        h={600}
        minWidth={'max-content'}
        type="native"
        className={classes.scrollArea}
      >
        {isLoading && (
          <Box className={`${classes.sticky}`}>
            <Box className={`${classes.center} ${classes.backdrop}`}>
              <Loader />
            </Box>
          </Box>
        )}
        {!isLoading && !isError && data.length === 0 && (
          <Box className={classes.center}>
            <Text size="xl">Ничего не найдено</Text>
          </Box>
        )}
        <MantineTable
          classNames={{
            thead: classes.thead,
          }}
          verticalSpacing="md"
        >
          <MantineTable.Thead>
            <MantineTable.Tr>
              {columns.map(({ key, title, sortable, width, align }) => {
                if (sortable) {
                  return (
                    <Th
                      key={key}
                      onSort={() => handleSort(key)}
                      active={sort.sort === key}
                      direction={sort.orderby}
                      w={width}
                      ta={align}
                    >
                      {title}
                    </Th>
                  )
                } else {
                  return (
                    <MantineTable.Th key={key} w={width} ta={align}>
                      {title}
                    </MantineTable.Th>
                  )
                }
              })}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {data.map((item: any) => {
              return (
                <MantineTable.Tr key={item.id}>
                  {columns.map(
                    ({
                      key,
                      align,
                      boolean,
                      component,
                      sortable,
                      title,
                      valueGetter,
                      width,
                    }) => (
                      <MantineTable.Td
                        key={key}
                        py={component ? 0 : undefined}
                        px={component ? 'xs' : undefined}
                        w={width}
                        ta={align}
                      >
                        {component ? (
                          component(item)
                        ) : boolean ? (
                          <Boolean boolean={item[key]} />
                        ) : valueGetter ? (
                          valueGetter(item)
                        ) : (
                          item[key]
                        )}
                      </MantineTable.Td>
                    ),
                  )}
                </MantineTable.Tr>
              )
            })}
          </MantineTable.Tbody>
        </MantineTable>
      </MantineTable.ScrollContainer>
      <Pagination
        page={page}
        onPageChange={onPageChange}
        perpage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        total={total}
      />
    </>
  )
}
