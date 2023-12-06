'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import UserCard from './user';

import { Button } from '@/shared/components/ui/button';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { User } from '@/shared/models/user';

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axiosAuth.get<User[]>('users-admin');
    setUsers(res.data);
  };

  return (
    <div>
      <h1>Admin Users Page</h1>
      <Button
        onClick={() => router.push(`${ROUTE.ADMIN_USER}/add`)}
        className="mt-4 w-full"
      >
        <Plus />
      </Button>
      <div className="flex flex-wrap justify-start gap-4 p-16">
        {users.map((user) => (
          <UserCard fetchUsers={fetchUsers} key={user.id} data={user} />
        ))}
      </div>
    </div>
  );
}

export default AdminUsersPage;
