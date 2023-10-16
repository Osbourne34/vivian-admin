import { Box, Loader, Table, Text } from '@mantine/core'

import { Branch } from '../../types/branch'
import { Row } from './row/row'

import { Th } from '@/shared/ui/table/th/th'
import { Pagination } from '@/shared/ui/table/pagination/pagination'
import { Sort } from '@/shared/ui/table/types'

import classes from './nested-table.module.css'

interface NestedTableProps {
  data: Branch[]
  onSort: (sort: Sort) => void
  sort: Sort
  total: number
  page: number
  rowsPerPage: string | null
  onRowsPerPageChange: (value: string | null) => void
  onPageChange: (value: number) => void
  isLoading: boolean
  isError: boolean
  onUpdate: (id: number) => void
  onDelete: (id: number) => void
}

export const NestedTable = (props: NestedTableProps) => {
  const {
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
    onUpdate,
    onDelete,
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
      <Table.ScrollContainer
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
        <Table
          classNames={{
            thead: classes.thead,
          }}
          verticalSpacing="md"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={54}></Table.Th>
              <Th
                onSort={() => handleSort('id')}
                active={sort.sort === 'id'}
                direction={sort.orderby}
                w={80}
              >
                ID
              </Th>
              <Th
                onSort={() => handleSort('name')}
                active={sort.sort === 'name'}
                direction={sort.orderby}
              >
                Название
              </Th>
              <Th
                onSort={() => handleSort('warehouse')}
                active={sort.sort === 'warehouse'}
                direction={sort.orderby}
              >
                Имеется склад
              </Th>
              <Table.Th ta={'end'} w={100}>
                Действия
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((branch) => (
              <Row
                key={branch.id}
                onUpdate={(id) => onUpdate(id)}
                onDelete={(id) => onDelete(id)}
                branch={branch}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
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
