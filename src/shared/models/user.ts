import { Role } from '../types/auth';

export type User = {
  userId: number;
  email: string;
  role: Role;
};
