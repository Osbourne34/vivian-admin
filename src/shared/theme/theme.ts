import { createTheme } from '@mantine/core'
import { Notification } from './notification/notification'

export const theme = createTheme({
  black: '#141517',
  fontFamily: 'Open Sans, sans-serif',
  components: {
    Notification,
  },
})
