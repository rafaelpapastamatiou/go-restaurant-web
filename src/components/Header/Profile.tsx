import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';

import { RiSunLine, RiMoonLine } from 'react-icons/ri';

interface ProfileProps {
  showProfileInfo?: boolean;
}

export function Profile({
  showProfileInfo = false,
}: ProfileProps): JSX.Element {
  const { toggleColorMode } = useColorMode();

  const profileNameColor = useColorModeValue('gray.800', 'gray.50');
  const profileEmailColor = useColorModeValue('gray.500', 'gray.300');
  const currentThemeIcon = useColorModeValue(<RiSunLine />, <RiMoonLine />);
  const currentThemeIconColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <Flex align="center">
      <IconButton
        icon={currentThemeIcon}
        mr="4"
        aria-label="Change theme"
        color={currentThemeIconColor}
        background="transparent"
        isRound
        fontSize="20"
        onClick={toggleColorMode}
      />

      {showProfileInfo && (
        <Box mr="4" textAlign="right">
          <Text color={profileNameColor}>Rafael Papastamatiou</Text>
          <Text color={profileEmailColor} fontSize="small">
            rafaelpapastamatiou@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Rafael Papastamatiou"
        src="https://github.com/rafaelpapastamatiou.png"
      />
    </Flex>
  );
}
