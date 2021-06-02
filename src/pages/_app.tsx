import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { signIn, useSession } from 'next-auth/client';

import { theme } from '../styles/theme';
import { SidebarDrawerProdivder } from '../contexts/SidebarDrawerContext';

import { queryClient } from '../services/queryClient';

import { Layout } from '../components/Layout';
import { NextComponentType, NextPageContext } from 'next';

const pathsWithoutLayout = ['/', '/signup', '/signin'];

type AuthComponent = NextComponentType<
  NextPageContext,
  any,
  Record<string, unknown>
> & {
  auth?: boolean;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <NextAuthProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS>
          <SidebarDrawerProdivder>
            {pathsWithoutLayout.includes(asPath.split('?')[0]) ? (
              (Component as AuthComponent).auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )
            ) : (
              <Layout>
                {(Component as AuthComponent).auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            )}
          </SidebarDrawerProdivder>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextAuthProvider>
  );
}

function Auth({ children }) {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return;
    if (!isUser) signIn();
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  return <div>Loading...</div>;
}

export default MyApp;
