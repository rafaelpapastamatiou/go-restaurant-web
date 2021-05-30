import React, { useMemo, useState } from 'react';
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

import { useUsers, User } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import VDivider from '../../components/VDivider';

export default function ListUsers(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(currentPage, 10);

  const showButtonsText = useBreakpointValue({
    base: false,
    sm: true,
  });

  async function handlePrefetchUser(userId: string): Promise<void> {
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
                color="purple.400"
                onMouseEnter={() => handlePrefetchUser(row.original.id)}
              >
                <Text fontWeight="bold">{value}</Text>
              </Link>
            </>
          );
        },
      },
      { Header: 'E-mail', accessor: 'email' },
      { Header: 'Created At', accessor: 'createdAt' },
      {
        Header: 'Actions',
        id: 'actions',
        Cell({ row }) {
          return (
            <Flex direction="row" align="center">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="purple"
                variant={'solid'}
                leftIcon={<Icon fontSize="lg" as={RiPencilLine} />}
                {...(showButtonsText ? {} : { iconSpacing: '0' })}
              >
                {showButtonsText && 'Editar'}
              </Button>
              <VDivider height={6} borderColor={dividerColor} />
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="red"
                variant={'solid'}
                leftIcon={<Icon fontSize="lg" as={RiDeleteBin7Line} />}
                {...(showButtonsText ? {} : { iconSpacing: '0' })}
              >
                {showButtonsText && 'Excluir'}
              </Button>
            </Flex>
          );
        },
      },
    ],
    [showButtonsText],
  );

  return (
    <Card
      cardTitle="Usuários"
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
            colorScheme="pink"
            leftIcon={<Icon as={RiAddLine} />}
          >
            Criar novo
          </Button>
        </NextLink>
      }
    >
      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Erro ao obter dados dos usuários.</Text>
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
