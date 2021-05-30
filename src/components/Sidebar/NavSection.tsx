import { ReactNode } from 'react';
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps): JSX.Element {
  const sectionColor = useColorModeValue('gray.500', 'gray.500');
  return (
    <Box>
      <Text fontWeight="bold" color={sectionColor} fontSize="small">
        {title}
      </Text>

      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
