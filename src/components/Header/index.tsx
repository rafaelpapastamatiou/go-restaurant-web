import {
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
// import { SearchBox } from './SearchBox'

export function Header(): JSX.Element {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true,
  });

  const bg = useColorModeValue('gray.200', 'gray.900');

  const navigationButtonColor = useColorModeValue('gray.500', 'gray.250');

  return (
    <Flex
      w="100%"
      maxW={1920}
      as="header"
      h="20"
      mx="auto"
      align="center"
      px="6"
      position="fixed"
      bg={bg}
      zIndex="999"
    >
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open navigation"
          mr="2"
          color={navigationButtonColor}
        />
      )}

      <Logo />

      {/* {isWideVersion && <SearchBox />} */}

      <Flex align="center" ml="auto">
        {isWideVersion && <NotificationsNav />}
        <Profile showProfileInfo={isWideVersion} />
      </Flex>
    </Flex>
  );
}
