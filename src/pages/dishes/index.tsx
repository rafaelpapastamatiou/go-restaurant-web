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

import { useDishes, Dish } from '../../services/hooks/useDishes';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import VDivider from '../../components/VDivider';
import { PopConfirm } from '../../components/PopConfirm';
import { useMutation } from 'react-query';

export default function ListDishes(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useDishes(currentPage, 10);

  const showButtonsText = useBreakpointValue({
    base: false,
    sm: true,
  });

  const deleteDish = useMutation(
    async (id: number) => {
      await api.delete(`/dishes/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dishes']);
      },
    },
  );

  async function handlePrefetchDish(dishId: number): Promise<void> {
    await queryClient.prefetchQuery(
      ['dish', dishId],
      async () => {
        const response = await api.get(`dishes/${dishId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  }

  const handleDeleteDish = useCallback(
    async (id: number) => {
      await deleteDish.mutateAsync(id);
    },
    [deleteDish],
  );

  const dividerColor = useColorModeValue('gray.400', 'gray.500');

  const columns = useMemo<Column<Dish>[]>(
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
                onMouseEnter={() => handlePrefetchDish(row.original.id)}
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
              Category
            </div>
          );
        },
        accessor: 'category.name' as 'category',
        Cell(data) {
          const { value } = data;

          return (
            <>
              <Box textAlign="center">
                <Text>{value}</Text>
              </Box>
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
              Price
            </div>
          );
        },
        accessor: 'price',
        Cell(data) {
          const { value } = data;

          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });

          const priceFormatted = formatter.format(value);

          return (
            <>
              <Box textAlign="center">
                <Text>{priceFormatted}</Text>
              </Box>
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
              <NextLink href={`/dishes/${row.original.id}/update`}>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="yellow"
                  variant={'solid'}
                  leftIcon={<Icon fontSize="lg" as={RiPencilLine} />}
                  {...(showButtonsText ? {} : { iconSpacing: '0' })}
                  onMouseEnter={() => handlePrefetchDish(row.original.id)}
                >
                  {showButtonsText && 'Edit'}
                </Button>
              </NextLink>

              <VDivider height={6} borderColor={dividerColor} />
              <PopConfirm
                title="Delete dish confirmation"
                message="Are you sure you want to delete this dish ?"
                onConfirm={() => handleDeleteDish(row.original.id)}
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
    [dividerColor, handleDeleteDish, showButtonsText],
  );

  return (
    <Card
      cardTitle="Dishes"
      titleSize="lg"
      isRefreshing={isFetching && !isLoading}
      isLoading={isLoading}
      loadingIndicator="spinner"
      extra={
        <NextLink href="/dishes/create">
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
          <Text>Error when listing dishes.</Text>
        </Flex>
      ) : (
        <>
          <Table
            data={data.dishes}
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
