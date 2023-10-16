import { IconCheck, IconX } from '@tabler/icons-react'

interface BooleanProps {
  boolean: boolean
}

export const Boolean = (props: BooleanProps) => {
  const { boolean } = props

  return boolean ? <IconCheck /> : <IconX />
}
