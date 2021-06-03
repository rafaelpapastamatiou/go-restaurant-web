import React, { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Flex,
  Icon,
  Spinner,
  Text,
  Link,
  useBreakpointValue,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { RiAddLine, RiDeleteBin7Line, RiPencilLine } from 'react-icons/ri';
import { Column } from 'react-table';

import {
  useTables,
  Table as TableEntityType,
} from '../../services/hooks/useTables';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import VDivider from '../../components/VDivider';
import { PopConfirm } from '../../components/PopConfirm';
import { useMutation } from 'react-query';

export default function ListTables(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useTables(currentPage, 10);

  const showButtonsText = useBreakpointValue({
    base: false,
    sm: true,
  });

  const deleteTable = useMutation(
    async (id: number) => {
      await api.delete(`/tables/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tables']);
      },
    },
  );

  async function handlePrefetchTable(tableId: number): Promise<void> {
    await queryClient.prefetchQuery(
      ['table', tableId],
      async () => {
        const response = await api.get(`tables/${tableId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  }

  const handleDeleteTable = useCallback(
    async (id: number) => {
      await deleteTable.mutateAsync(id);
    },
    [deleteTable],
  );

  const dividerColor = useColorModeValue('gray.400', 'gray.500');

  const columns = useMemo<Column<TableEntityType>[]>(
    () => [
      {
        Header: 'Number',
        accessor: 'number',
        sortType: 'basic',
        Cell(data) {
          const { row, value } = data;

          return (
            <>
              <Link
                color="red.500"
                onMouseEnter={() => handlePrefetchTable(row.original.id)}
              >
                <Text fontWeight="bold">{value}</Text>
              </Link>
            </>
          );
        },
      },
      {
        Header() {
          return (
            <div
              style={{
                textAlign: 'center',
              }}
            >
              Created At
            </div>
          );
        },
        accessor: 'createdAt',
        Cell(data) {
          const { value } = data;

          return <Box textAlign="center">{value}</Box>;
        },
      },
      {
        Header: 'Actions',
        id: 'actions',
        Cell({ row }) {
          return (
            <Flex direction="row" align="center">
              <NextLink href={`/tables/${row.original.id}/update`}>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="yellow"
                  variant={'solid'}
                  leftIcon={<Icon fontSize="lg" as={RiPencilLine} />}
                  {...(showButtonsText ? {} : { iconSpacing: '0' })}
                  onMouseEnter={() => handlePrefetchTable(row.original.id)}
                >
                  {showButtonsText && 'Edit'}
                </Button>
              </NextLink>

              <VDivider height={6} borderColor={dividerColor} />
              <PopConfirm
                title="Delete table confirmation"
                message="Are you sure you want to delete this table ?"
                onConfirm={() => handleDeleteTable(row.original.id)}
                onCancel={() => console.log('cancel')}
              >
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  variant={'solid'}
                  leftIcon={<Icon fontSize="lg" as={RiDeleteBin7Line} />}
                  {...(showButtonsText ? {} : { iconSpacing: '0' })}
                >
                  {showButtonsText && 'Delete'}
                </Button>
              </PopConfirm>
            </Flex>
          );
        },
      },
    ],
    [dividerColor, handleDeleteTable, showButtonsText],
  );

  return (
    <Card
      cardTitle="Tables"
      titleSize="lg"
      isRefreshing={isFetching && !isLoading}
      isLoading={isLoading}
      loadingIndicator="spinner"
      extra={
        <NextLink href="/tables/create">
          <Button
            as="a"
            size="sm"
            fontSize="md"
            colorScheme="yellow"
            leftIcon={<Icon as={RiAddLine} />}
          >
            Create new
          </Button>
        </NextLink>
      }
      flex={1}
    >
      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Error when listing tables.</Text>
        </Flex>
      ) : (
        <>
          <Table
            data={data.tables}
            columns={columns}
            currentPage={currentPage}
            totalCount={data.totalCount}
            setCurrentPage={setCurrentPage}
            hideColumnsOnBreak={{
              md: ['createdAt'],
              sm: ['email'],
            }}
            xsColumns={['name', 'email', 'createdAt', 'actions']}
          />
        </>
      )}
    </Card>
  );
}
