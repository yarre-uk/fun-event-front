'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { dictionaries } from '@/app/[lang]/dictionaries';
import { Button } from '@/shared/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/card';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { User } from '@/shared/models/user';

type MangaCardProps = {
  data: User;
  fetchUsers: () => void;
};

function UserCard({ data, fetchUsers }: MangaCardProps) {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const deleteHandler = () => {
    axiosAuth.delete(`users-admin/${data.id}`);
    fetchUsers();
  };

  return (
    <Card className="flex h-fit w-[300px] flex-col justify-between px-4 py-2">
      <div
        onClick={() => {
          router.push(`${ROUTE.ADMIN_USER}/${data.id}`);
        }}
        className="flex flex-row gap-4 pt-4"
      >
        <CardTitle>{data.id}</CardTitle>
        <CardDescription>{data.email}</CardDescription>
        <CardDescription>{data.role}</CardDescription>
      </div>
      <Button onClick={deleteHandler}>
        <X />
      </Button>
    </Card>
  );
}

export default UserCard;
