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

import { useUsers, User } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import VDivider from '../../components/VDivider';
import { PopConfirm } from '../../components/PopConfirm';
import { useMutation } from 'react-query';
import { FiCheck } from 'react-icons/fi';

export default function ListUsers(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(currentPage, 10);

  const showButtonsText = useBreakpointValue({
    base: false,
    sm: true,
  });

  const deleteUser = useMutation(
    async (id: number) => {
      await api.delete(`/users/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    },
  );

  async function handlePrefetchUser(userId: number): Promise<void> {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  }

  const handleDeleteUser = useCallback(
    async (id: number) => {
      await deleteUser.mutateAsync(id);
    },
    [deleteUser],
  );

  const dividerColor = useColorModeValue('gray.400', 'gray.500');

  const columns = useMemo<Column<User>[]>(
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
                onMouseEnter={() => handlePrefetchUser(row.original.id)}
              >
                <Text fontWeight="bold">{value}</Text>
              </Link>
            </>
          );
        },
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header() {
          return <Box textAlign="center">Admin</Box>;
        },
        accessor: 'admin',
        Cell(data) {
          const { value } = data;

          return value ? (
            <Flex justify="center">
              <Icon as={FiCheck} fontSize="18" color="red.500" />
            </Flex>
          ) : null;
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
              <NextLink href={`/users/${row.original.id}/update`}>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="yellow"
                  variant={'solid'}
                  leftIcon={<Icon fontSize="lg" as={RiPencilLine} />}
                  {...(showButtonsText ? {} : { iconSpacing: '0' })}
                  onMouseEnter={() => handlePrefetchUser(row.original.id)}
                >
                  {showButtonsText && 'Edit'}
                </Button>
              </NextLink>

              <VDivider height={6} borderColor={dividerColor} />
              <PopConfirm
                title="Delete user confirmation"
                message="Are you sure you want to delete this user ?"
                onConfirm={() => handleDeleteUser(row.original.id)}
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
    [dividerColor, handleDeleteUser, showButtonsText],
  );

  return (
    <Card
      cardTitle="Users"
      titleSize="lg"
      isRefreshing={isFetching && !isLoading}
      isLoading={isLoading}
      loadingIndicator="spinner"
      extra={
        <NextLink href="/users/create">
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
          <Text>Error when listing users.</Text>
        </Flex>
      ) : (
        <>
          <Table
            data={data.users}
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
