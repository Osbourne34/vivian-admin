import {
  Group,
  Select,
  Text,
  Pagination as MantinePagination,
} from '@mantine/core'

import classes from './pagination.module.css'

interface PaginationProps {
  page: number
  onPageChange: (value: number) => void
  perpage: string | null
  onRowsPerPageChange: (value: string | null) => void
  total: number
}

export const Pagination = (props: PaginationProps) => {
  const { page, onPageChange, perpage, onRowsPerPageChange, total } = props

  return (
    <Group className={classes.pagination}>
      <Group>
        <Text>Строк на странице:</Text>
        <Select
          value={perpage}
          onChange={onRowsPerPageChange}
          allowDeselect={false}
          data={['10', '25', '50']}
          checkIconPosition="right"
          w={80}
        />
      </Group>

      <MantinePagination
        value={page}
        onChange={onPageChange}
        total={total}
        withEdges
        size={'lg'}
      />
    </Group>
  )
}
