import { Role } from '../models/auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      email: string;
      id: number;
      role: Role;
    };
  }
}
