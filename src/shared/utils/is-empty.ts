export const isEmpty = (value: string | null | []) => {
  if (value === null) return true
  if (typeof value === 'string' && !value.trim().length) return true
  if (!value.length) return true
}
