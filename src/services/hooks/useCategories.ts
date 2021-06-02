import { useQuery } from 'react-query';
import { api } from '../api';

export type Category = {
  id: number;
  accountId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type GetCategoriesResponse = {
  totalCount: number;
  categories: Category[];
};

export async function getCategories(
  page: number,
  per_page = 10,
): Promise<GetCategoriesResponse> {
  const { data, headers } = await api.get<Category[]>('/categories', {
    params: {
      page,
      per_page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const categories = data.map<Category>(category => ({
    ...category,
    createdAt: new Date(category.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    updatedAt: category.updatedAt
      ? new Date(category.updatedAt).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : null,
  }));

  return {
    categories,
    totalCount,
  };
}

export function useCategories(page: number, per_page = 10) {
  return useQuery(['categories', page], () => getCategories(page, per_page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
