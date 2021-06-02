import { useQuery } from 'react-query';
import { api } from '../api';

export type User = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  createdAt: string;
};

export async function getUser(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);

  const user: User = {
    id: data.id,
    name: data.name,
    email: data.email,
    admin: data.admin,
    createdAt: new Date(data.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return user;
}

export function useUser(id: number) {
  return useQuery(['user', id], () => getUser(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
}
