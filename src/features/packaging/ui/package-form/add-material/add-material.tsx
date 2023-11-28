import { useMemo } from 'react'

import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { Material } from '@/features/materials'

import { useFormContext } from '../form-context'

interface AddMaterialProps {
  material: Material
}

export const AddMaterial = (props: AddMaterialProps) => {
  const form = useFormContext()

  const addMaterial = () => {
    form.insertListItem('materials', {
      ...props.material,
      count: '',
    })
    form.clearFieldError('materials')
  }

  const added = useMemo(() => {
    return form.values.materials.some(
      (material) => material.id === props.material.id,
    )
  }, [form.values.materials, props.material])

  return (
    <ActionIcon onClick={addMaterial} disabled={added}>
      <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  )
}
