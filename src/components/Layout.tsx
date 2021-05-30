import React, { ReactElement } from 'react';

import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactElement;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  const [isSmallerThen19202] = useMediaQuery('(max-width: 1920px)');

  const layoutBgColor = useColorModeValue('gray.200', 'gray.900');

  return (
    <Flex
      direction="column"
      minH="100vh"
      maxWidth={isSmallerThen19202 ? '100vw' : 1920}
      mx="auto"
      bg={layoutBgColor}
    >
      <Header />

      <Flex flex="1" w="100%" maxW="100%" my="6" mx="auto" px="6" mt="24">
        <Sidebar />

        <Flex flex="1" maxW="100%" ml={isDrawerSidebar ? 0 : 256}>
          <Box flex="1" maxW="100%">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
