import { TextInput, TextInputProps } from '@mantine/core'
import {
  InputAttributes,
  PatternFormat,
  PatternFormatProps,
} from 'react-number-format'

interface PhoneInputProps
  extends Omit<
    PatternFormatProps<
      InputAttributes & Omit<TextInputProps, 'value' | 'defaultValue' | 'type'>
    >,
    'format'
  > {}

export const PhoneInput = (props: PhoneInputProps) => {
  return (
    <PatternFormat
      {...props}
      format="+998 (##) ###-##-##"
      mask="_"
      allowEmptyFormatting={true}
      customInput={TextInput}
      size="md"
      onChange={() => {}}
    />
  )
}
