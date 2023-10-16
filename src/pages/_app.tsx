import { useState } from 'react'
import Head from 'next/head'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@fontsource/open-sans'

import { AppPropsWithLayout } from '@/shared/layout/types/page-layout'
import { theme } from '@/shared/theme/theme'

import { ConfirmDialog } from '@/shared/ui/confirm-dialog/confirm-dialog'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Notifications position="top-right" limit={3} />
        <ModalsProvider modals={{ confirmDialog: ConfirmDialog }}>
          {getLayout(<Component {...pageProps} />)}
        </ModalsProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
