import { useQuery } from 'react-query';
import { Category } from './useCategory';
import { api } from '../api';

export type Dish = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  category: Category;
};

type GetDishesResponse = {
  totalCount: number;
  dishes: Dish[];
};

export async function getDishes(
  page: number,
  per_page = 10,
): Promise<GetDishesResponse> {
  const { data, headers } = await api.get<Dish[]>('/dishes', {
    params: {
      page,
      per_page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const dishes = data.map<Dish>(dish => ({
    ...dish,
    createdAt: new Date(dish.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    updatedAt: dish.updatedAt
      ? new Date(dish.updatedAt).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : null,
  }));

  return {
    dishes,
    totalCount,
  };
}

export function useDishes(page: number, per_page = 10) {
  return useQuery(['dishes', page], () => getDishes(page, per_page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
