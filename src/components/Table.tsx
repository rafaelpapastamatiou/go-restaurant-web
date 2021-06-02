import React, { useMemo } from 'react';
import {
  Box,
  Checkbox,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table as ChakraTable,
  useBreakpointValue,
  VStack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import { useTable, Column, useSortBy } from 'react-table';

import { Pagination } from './Pagination';

type HideColumn = {
  xs?: string[];
  sm?: string[];
  md?: string[];
  lg?: string[];
  xl?: string[];
};

interface TableProps {
  columns: Column<any>[];
  data: any[];
  totalCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hideColumnsOnBreak?: HideColumn;
  rowSelection?: any;
  xsColumns?: string[];
}

const breakpointValues = {
  base: { name: 'xs', value: 0 },
  xs: { name: 'xs', value: 0 },
  sm: { name: 'sm', value: 2 },
  md: { name: 'md', value: 3 },
  lg: { name: 'lg', value: 4 },
  xl: { name: 'xl', value: 5 },
};

export function Table({
  columns: columnsRaw,
  data,
  totalCount,
  currentPage,
  setCurrentPage,
  hideColumnsOnBreak,
  rowSelection,
  xsColumns,
}: TableProps): JSX.Element {
  const currentBreakpoint = useBreakpointValue({
    base: breakpointValues['base'].value,
    xs: breakpointValues['xs'].value,
    sm: breakpointValues['sm'].value,
    md: breakpointValues['md'].value,
    lg: breakpointValues['lg'].value,
    xl: breakpointValues['xl'].value,
  });

  const columns = useMemo<Column<any>[]>(() => {
    if (!currentBreakpoint && currentBreakpoint !== 0) return columnsRaw;

    if (currentBreakpoint === 0) {
      if (!xsColumns) return columnsRaw;

      return columnsRaw.filter(
        column =>
          (column.id && xsColumns.includes(column.id)) ||
          (column.accessor && xsColumns.includes(column.accessor.toString())),
      );
    }

    if (!hideColumnsOnBreak) return columnsRaw;

    return columnsRaw.filter(column => {
      const hideColumnKey = Object.keys(hideColumnsOnBreak).find(
        index =>
          (column.accessor &&
            hideColumnsOnBreak[index].includes(column.accessor.toString())) ||
          (column.id &&
            hideColumnsOnBreak[index].includes(column.id?.toString())),
      );

      if (!hideColumnKey) {
        return true;
      }

      if (currentBreakpoint <= breakpointValues[hideColumnKey].value) {
        return false;
      }

      return true;
    });
  }, [columnsRaw, currentBreakpoint, hideColumnsOnBreak, xsColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  const checkboxTHeadColor = useColorModeValue('gray.600', 'gray.300');
  const trStripedBackgroundColor = useColorModeValue('gray.200', 'gray.750');
  const listItemBackgroundColor = useColorModeValue('gray.200', 'gray.750');
  const headerColor = useColorModeValue('gray.600', 'gray.500');
  const columnTextColor = useColorModeValue('gray.800', 'gray.300');

  return (
    <Box>
      {currentBreakpoint > 1 ? (
        <Box overflowX="auto">
          <ChakraTable
            colorScheme="gray"
            variant="simple"
            size="sm"
            maxWidth="100%"
            {...getTableProps()}
          >
            <Thead>
              {headerGroups.map(headerGroup => (
                <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {currentBreakpoint > 2 && rowSelection && (
                    <Th py="4" color={checkboxTHeadColor} width="8">
                      <Checkbox colorScheme="red" />
                    </Th>
                  )}
                  {headerGroup.headers.map(column => (
                    <Th key={column.id} color={headerColor}>
                      {column.render('Header')}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <Tr
                    key={row.id}
                    {...row.getRowProps()}
                    {...(rowIndex % 2 === 0
                      ? { bg: trStripedBackgroundColor }
                      : {})}
                  >
                    {currentBreakpoint > 2 && rowSelection && (
                      <Td textAlign="center">
                        <Checkbox colorScheme="red" />
                      </Td>
                    )}
                    {row.cells.map(cell => (
                      <Td
                        key={cell.column.id}
                        {...cell.getCellProps()}
                        color={columnTextColor}
                      >
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </ChakraTable>
        </Box>
      ) : (
        <VStack w="full" spacing="4">
          {rows.map(row => {
            prepareRow(row);
            return (
              <VStack
                w="full"
                px={['4', '8']}
                py={['3', '6']}
                bg={listItemBackgroundColor}
                shadow="md"
                direction="column"
                minW={250}
                borderRadius="8"
                key={row.id}
                {...row.getRowProps()}
              >
                {row.cells.map(cell => (
                  <Flex
                    justify="center"
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    color={columnTextColor}
                  >
                    {cell.render('Cell')}
                  </Flex>
                ))}
              </VStack>
            );
          })}
        </VStack>
      )}
      <Pagination
        totalCountOfRegisters={totalCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        registersPerPage={10}
      />
    </Box>
  );
}
