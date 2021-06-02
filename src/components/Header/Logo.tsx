import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text, TextProps } from '@chakra-ui/layout';

type LogoProps = TextProps;

export function Logo({ ...rest }: LogoProps): JSX.Element {
  const logoTextColor = useColorModeValue('gray.500', 'gray.50');
  const yellow = useColorModeValue('yellow.500', 'yellow.400');

  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      color={logoTextColor}
      {...rest}
    >
      <Text as="span" color={yellow}>
        go
      </Text>

      <Text as="span" color="red.500">
        restaurant
      </Text>
    </Text>
  );
}
