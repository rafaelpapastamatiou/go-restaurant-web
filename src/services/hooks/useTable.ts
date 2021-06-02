import { useQuery } from 'react-query';
import { api } from '../api';

export type Table = {
  id: number;
  accountId: number;
  number: string;
  createdAt: string;
  updatedAt: string;
};

export async function getTable(id: number): Promise<Table> {
  const { data } = await api.get<Table>(`/tables/${id}`);

  const table = {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    updatedAt: data.updatedAt
      ? new Date(data.updatedAt).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : null,
  };

  return table;
}

export function useTable(id: number) {
  return useQuery(['table', id], () => getTable(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
