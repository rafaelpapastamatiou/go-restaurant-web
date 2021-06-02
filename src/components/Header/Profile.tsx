import React from 'react';
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  useColorMode,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiSunLine, RiMoonLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { useSession, signOut } from 'next-auth/client';

interface ProfileProps {
  showProfileInfo?: boolean;
}

export function Profile({
  showProfileInfo = false,
}: ProfileProps): JSX.Element {
  const [session] = useSession();
  const { toggleColorMode } = useColorMode();

  const profileNameColor = useColorModeValue('gray.800', 'gray.50');
  const profileEmailColor = useColorModeValue('gray.500', 'gray.300');
  const currentThemeIcon = useColorModeValue(<RiSunLine />, <RiMoonLine />);
  const currentThemeIconColor = useColorModeValue('gray.500', 'gray.300');

  const buttonAndAvatarSize = useBreakpointValue({
    base: 'sm',
    xs: 'sm',
    sm: 'md',
  });

  return (
    <Flex align="center">
      <IconButton
        icon={currentThemeIcon}
        mr={['1', '2']}
        size={buttonAndAvatarSize}
        aria-label="Change theme"
        color={currentThemeIconColor}
        background="transparent"
        isRound
        fontSize="20"
        onClick={toggleColorMode}
      />

      <IconButton
        size={buttonAndAvatarSize}
        mr={['2', '4', '6']}
        icon={<Icon as={RiLogoutBoxRLine} fontSize="20" />}
        isRound
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/signin' })}
        aria-label="Sign out"
        backgroundColor="transparent"
        color={currentThemeIconColor}
      />

      {showProfileInfo && (
        <Box mr="4" textAlign="right">
          <Text color={profileNameColor}>{session && session.user.name}</Text>
          <Text color={profileEmailColor} fontSize="small">
            {session && session.user.email}
          </Text>
        </Box>
      )}

      <Avatar name={session && session.user.name} size={buttonAndAvatarSize} />
    </Flex>
  );
}
