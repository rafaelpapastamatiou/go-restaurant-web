import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { api } from '../../../services/api';

type Credentials = {
  email: string;
  password: string;
  accountUrl: string;
};

export default NextAuth({
  pages: {
    error: '/signin',
    signIn: '/signin',
  },
  providers: [
    Providers.Credentials({
      name: 'credentials',
      authorize: async (credentials: Credentials) => {
        try {
          const response = await api.post('/signin', credentials);

          return response.data;
        } catch (err) {
          return false;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, data) {
      if (data) {
        token.accessToken = data.token;
        token.user = data.user;
      }

      return token;
    },
    async session(session, userOrToken) {
      session.accessToken = userOrToken.accessToken;
      session.user = userOrToken.user;
      return session;
    },
  },
  session: {
    jwt: true,
  },
  cookies: {
    sessionToken: {
      name: 'Authorization',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
});
