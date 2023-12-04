'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { columns } from './types/columns';

import { DataTable as _DataTable } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { useToast } from '@/shared/components/ui/use-toast';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { User } from '@/shared/models/user';

function AdminPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchUsers = useCallback(
    async (page: number) => {
      try {
        const res = await axiosAuth.get<User[]>('User/get-all', {
          params: { PageSize: 5, PageCount: page },
        });

        setUsers(res.data);

        toast({
          title: 'Success',
          description: `Result length - ${res.data.length}`,
        });
      } catch (e) {
        console.error(e);

        toast({
          title: 'Error occurred!',
          variant: 'destructive',
          description: 'Some error occurred',
        });
      }
    },
    [axiosAuth, toast],
  );

  useEffect(() => {
    if (session) {
      fetchUsers(page);
    }
  }, [session, page, fetchUsers]);

  const onClickNextPage = () => {
    if (users.length != 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onClickPreviousPage = () => {
    if (page != 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const DataTable = (
    <div>
      <_DataTable columns={columns} data={users} />
      <div className="flex flex-row items-center justify-center gap-[4rem]">
        <Button
          variant="outline"
          disabled={users.length == 0}
          onClick={onClickNextPage}
        >
          Next page
        </Button>
        <Button
          variant="outline"
          disabled={page == 1}
          onClick={onClickPreviousPage}
        >
          Previous page
        </Button>
      </div>
      <p className="p-2 text-center">Current page {page}</p>
    </div>
  );

  const fetchWeather = async () => {
    try {
      const res = await axiosAuth.get('/WeatherForecast/');

      toast({
        title: 'Success',
        description: `Result length - ${res.data.length}`,
      });
    } catch (e) {
      console.error(e);

      toast({
        title: 'Error occurred!',
        variant: 'destructive',
        description: 'Some error occurred',
      });
    }
  };

  return (
    <div>
      <p>Admin page</p>
      <Button onClick={fetchWeather}>Get weather admin</Button>
      <Button
        onClick={() => {
          console.log(session);
        }}
      >
        Get session
      </Button>
      <Button
        onClick={() => {
          router.push(ROUTE.SET_ADMIN);
        }}
      >
        Add Admin
      </Button>
      <div className="container mx-auto py-10">{users && DataTable}</div>
    </div>
  );
}

export default AdminPage;
