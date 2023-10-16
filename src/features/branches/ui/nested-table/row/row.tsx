import { ActionIcon, Box, Collapse, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import { Branch } from '@/features/branches/types/branch'

import { Actions } from '@/shared/ui/actions/actions'
import { Boolean } from '@/shared/ui/table/boolean/boolean'

interface RowProps {
  branch: Branch
  onUpdate: (id: number) => void
  onDelete: (id: number) => void
}

export const Row = (props: RowProps) => {
  const {
    branch: { id, name, warehouse, childrens },
    onDelete,
    onUpdate,
  } = props

  const [opened, { toggle }] = useDisclosure(false)

  const icon = opened ? (
    <IconChevronUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
  ) : (
    <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5} />
  )
  return (
    <>
      <Table.Tr>
        <Table.Td py="0">
          {childrens && childrens.length > 0 && (
            <ActionIcon
              onClick={toggle}
              color="gray"
              size="lg"
              variant="subtle"
              radius="xl"
            >
              {icon}
            </ActionIcon>
          )}
        </Table.Td>
        <Table.Td>{id}</Table.Td>
        <Table.Td>{name}</Table.Td>
        <Table.Td py="0">
          <Boolean boolean={warehouse} />
        </Table.Td>
        <Table.Td py="0">
          <Actions
            onUpdate={() => onUpdate(id)}
            onDelete={() => onDelete(id)}
          />
        </Table.Td>
      </Table.Tr>
      {childrens && childrens.length > 0 && (
        <Table.Tr>
          <Table.Td colSpan={5} p="0">
            <Collapse in={opened}>
              <Box p="md">
                <Table verticalSpacing="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th w={80}>ID</Table.Th>
                      <Table.Th>Название</Table.Th>
                      <Table.Th>Имеется склад</Table.Th>
                      <Table.Th w={100} ta="end">
                        Действия
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {childrens.map(({ id, name, warehouse }) => (
                      <Table.Tr key={id}>
                        <Table.Td>{id}</Table.Td>
                        <Table.Td>{name}</Table.Td>
                        <Table.Td py="0">
                          <Boolean boolean={warehouse} />
                        </Table.Td>
                        <Table.Td py="0">
                          <Actions
                            onUpdate={() => onUpdate(id)}
                            onDelete={() => onDelete(id)}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>
            </Collapse>
          </Table.Td>
        </Table.Tr>
      )}
    </>
  )
}
