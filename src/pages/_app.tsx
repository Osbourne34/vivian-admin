import Head from 'next/head'
import type { AppProps } from 'next/app'

import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { theme } from '@/shared/theme/theme'

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </MantineProvider>
  )
}
