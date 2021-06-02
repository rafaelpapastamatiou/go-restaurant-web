import { useMemo } from 'react';
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import PaginationItem from './PaginationItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
  siblingsCount = 1,
}: PaginationProps): JSX.Element {
  const lastPage = useMemo(() => {
    return Math.ceil(totalCountOfRegisters / registersPerPage);
  }, [totalCountOfRegisters, registersPerPage]);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  const pagesInfoColor = useColorModeValue('gray.450', 'gray.250');
  const pagesEllipsisColor = useColorModeValue('gray.450', 'gray.250');

  return (
    <Stack
      direction={['column', 'row']}
      mt="4"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box color={pagesInfoColor}>
        <strong>0</strong> - <strong>{registersPerPage}</strong> de{' '}
        <strong>{totalCountOfRegisters || '?'}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > siblingsCount + 2 && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map(page => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color={pagesEllipsisColor} w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
