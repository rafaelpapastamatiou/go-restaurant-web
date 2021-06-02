import { useQuery } from 'react-query';
import { api } from '../api';

export type Category = {
  id: number;
  accountId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Dish = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  category: Category;
};
export async function getDish(id: number): Promise<Dish> {
  const { data } = await api.get<Dish>(`/dishes/${id}`);

  const dish = {
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

  return dish;
}

export function useDish(id: number) {
  return useQuery(['dish', id], () => getDish(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
