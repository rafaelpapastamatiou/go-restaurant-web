import { useQuery } from 'react-query';
import { api } from '../api';

export type Category = {
  id: number;
  accountId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export async function getDish(id: number): Promise<Category> {
  const { data } = await api.get<Category>(`/dishes/${id}`);

  const category = {
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

  return category;
}

export function useDish(id: number) {
  return useQuery(['dish', id], () => getDish(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
