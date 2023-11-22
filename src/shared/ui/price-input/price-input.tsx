import { NumberInput, NumberInputProps } from '@mantine/core'

interface PriceInputProps extends NumberInputProps {}

export const PriceInput = (props: PriceInputProps) => {
  return (
    <NumberInput
      {...props}
      thousandSeparator=" "
      allowNegative={false}
      hideControls
    />
  )
}
