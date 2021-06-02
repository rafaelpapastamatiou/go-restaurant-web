import { Button, Text, useColorModeValue } from '@chakra-ui/react';

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export default function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps): JSX.Element {
  const buttonBackgroundColor = useColorModeValue('gray.400', 'gray.700');
  const buttonHoverBackgroundColor = useColorModeValue('gray.450', 'gray.500');

  return isCurrent ? (
    <Button size="sm" fontSize="xs" width="4" colorScheme="red" disabled>
      <Text>{number}</Text>
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg={buttonBackgroundColor}
      _hover={{
        bg: buttonHoverBackgroundColor,
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
