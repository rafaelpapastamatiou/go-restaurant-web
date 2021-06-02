import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text } from '@chakra-ui/layout';

export function Logo(): JSX.Element {
  const logoTextColor = useColorModeValue('gray.500', 'gray.50');
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
      color={logoTextColor}
    >
      <Text as="span" ml="1" color="pink.500">
        @
      </Text>
      gorestaurant
    </Text>
  );
}
