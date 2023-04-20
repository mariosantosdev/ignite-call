import '~/lib/dayjs'

import type { AppProps } from 'next/app'
import { globalStyles } from '~/styles/global'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/lib/react-query'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://ignitecall-mariosantos.vercel.app/',
          site_name: 'Ignite Call',
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
