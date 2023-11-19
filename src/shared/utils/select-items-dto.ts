import { ComboboxItem } from '@mantine/core'

export const selectItemsDto = <T>(
  data: T[],
  value: keyof T,
  label: keyof T,
): ComboboxItem[] => {
  return data.map((item) => {
    return {
      value: String(item[value]),
      label: String(item[label]),
    }
  })
}
