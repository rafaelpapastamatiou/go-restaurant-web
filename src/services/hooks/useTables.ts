import { useQuery } from 'react-query';
import { api } from '../api';

export type Table = {
  id: number;
  accountId: number;
  number: string;
  createdAt: string;
  updatedAt: string;
};

type GetTablesResponse = {
  totalCount: number;
  tables: Table[];
};

export async function getTables(
  page: number,
  per_page = 10,
): Promise<GetTablesResponse> {
  const { data, headers } = await api.get<Table[]>('/tables', {
    params: {
      page,
      per_page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const tables = data.map<Table>(table => ({
    ...table,
    createdAt: new Date(table.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    updatedAt: table.updatedAt
      ? new Date(table.updatedAt).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : null,
  }));

  return {
    tables,
    totalCount,
  };
}

export function useTables(page: number, per_page = 10) {
  return useQuery(['tables', page], () => getTables(page, per_page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
