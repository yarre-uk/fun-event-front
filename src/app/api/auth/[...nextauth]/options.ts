/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from 'jwt-decode';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/shared/models/user';
import { Role } from '@/shared/types/auth';
import { axiosAuth } from '@/shared/utils/axios';

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const res = await axiosAuth.post('auth/signin', {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (!user) {
            return null;
          }

          const {
            data: { data },
          } = await axiosAuth.get(`auth/profile`, {
            headers: { Authorization: `Bearer ${res.data.accessToken}` },
          });

          return { ...user, ...data };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger == 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;

      return session;
    },
  },
};
export default NextAuth(authOptions);
