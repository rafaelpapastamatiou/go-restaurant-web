import { HStack, Icon, useColorModeValue } from '@chakra-ui/react';

import { RiNotificationLine } from 'react-icons/ri';

export function NotificationsNav(): JSX.Element {
  const iconColor = useColorModeValue('gray.500', 'gray.250');
  const borderColor = useColorModeValue('gray.500', 'gray.700');

  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color={iconColor}
      borderRightWidth={1}
      borderColor={borderColor}
    >
      <Icon as={RiNotificationLine} fontSize="20" size="sm" />
    </HStack>
  );
}
