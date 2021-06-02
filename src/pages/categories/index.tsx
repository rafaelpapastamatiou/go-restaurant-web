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
} from '@chakra-ui/react';
import { RiAddLine, RiDeleteBin7Line, RiPencilLine } from 'react-icons/ri';
import { Column } from 'react-table';

import { useCategories, Category } from '../../services/hooks/useCategories';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import VDivider from '../../components/VDivider';
import { PopConfirm } from '../../components/PopConfirm';
import { useMutation } from 'react-query';

export default function ListCategories(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useCategories(currentPage, 10);

  const showButtonsText = useBreakpointValue({
    base: false,
    sm: true,
  });

  const deleteCategory = useMutation(
    async (id: number) => {
      await api.delete(`/categories/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
    },
  );

  async function handlePrefetchCategory(categoryId: number): Promise<void> {
    await queryClient.prefetchQuery(
      ['category', categoryId],
      async () => {
        const response = await api.get(`categories/${categoryId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  }

  const handleDeleteCategory = useCallback(
    async (id: number) => {
      await deleteCategory.mutateAsync(id);
    },
    [deleteCategory],
  );

  const dividerColor = useColorModeValue('gray.400', 'gray.500');

  const columns = useMemo<Column<Category>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        sortType: 'basic',
        Cell(data) {
          const { row, value } = data;

          return (
            <>
              <Link
                color="red.500"
                onMouseEnter={() => handlePrefetchCategory(row.original.id)}
              >
                <Text fontWeight="bold">{value}</Text>
              </Link>
            </>
          );
        },
      },
      { Header: 'Created At', accessor: 'createdAt' },
      {
        Header: 'Actions',
        id: 'actions',
        Cell({ row }) {
          return (
            <Flex direction="row" align="center">
              <NextLink href={`/categories/${row.original.id}/update`}>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="yellow"
                  variant={'solid'}
                  leftIcon={<Icon fontSize="lg" as={RiPencilLine} />}
                  {...(showButtonsText ? {} : { iconSpacing: '0' })}
                  onMouseEnter={() => handlePrefetchCategory(row.original.id)}
                >
                  {showButtonsText && 'Edit'}
                </Button>
              </NextLink>

              <VDivider height={6} borderColor={dividerColor} />
              <PopConfirm
                title="Delete category confirmation"
                message="Are you sure you want to delete this category ?"
                onConfirm={() => handleDeleteCategory(row.original.id)}
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
    [dividerColor, handleDeleteCategory, showButtonsText],
  );

  return (
    <Card
      cardTitle="Categories"
      titleSize="lg"
      isRefreshing={isFetching && !isLoading}
      isLoading={isLoading}
      loadingIndicator="spinner"
      extra={
        <NextLink href="/categories/create">
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
          <Text>Error when listing categories.</Text>
        </Flex>
      ) : (
        <>
          <Table
            data={data.categories}
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
