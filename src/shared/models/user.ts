import { Device } from './device';

export class User {
  id: number;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  devices: Device[];
}
