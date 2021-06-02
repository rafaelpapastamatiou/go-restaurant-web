import { useQuery } from 'react-query';
import { api } from '../api';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(
  page: number,
  per_page = 10,
): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<User[]>('/users', {
    params: {
      page,
      per_page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.map<User>(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number, per_page = 10) {
  return useQuery(['users', page], () => getUsers(page, per_page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
