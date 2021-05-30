import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { theme } from '../styles/theme'
import { SidebarDrawerProdivder } from '../contexts/SidebarDrawerContext'

import { makeServer } from '../services/mirage'
import { queryClient } from '../services/queryClient'

import { Layout } from '../components/Layout'

if(process.env.NODE_ENV === 'development') {
  makeServer()
}

const pathsWithoutLayout = ['/', '/signup']

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <SidebarDrawerProdivder>
          {pathsWithoutLayout.includes(asPath) 
            ? <Component {...pageProps} />
            : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )
          }
          
        </SidebarDrawerProdivder>
      </ChakraProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default MyApp
