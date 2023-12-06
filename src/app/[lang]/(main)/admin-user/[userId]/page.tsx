'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormValues } from './types';

import { Input } from '@/shared/components/FormComponents';
import { FullPageLoader } from '@/shared/components/lib';
import { Button } from '@/shared/components/ui/button';
import { useToast } from '@/shared/components/ui/use-toast';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { User } from '@/shared/models/user';

type EditDeviceProps = {
  params: { userId: string };
};

function EditDevicePage({ params: { userId } }: EditDeviceProps) {
  const [user, setUser] = useState<User | null>(null);

  const { toast } = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (!session?.user) return;

    fetchUser().then((user) => {
      setUser(user);
      setValue('email', user.email);
    });
  }, [userId, session?.user, axiosAuth]);

  const fetchUser = async () => {
    const res = await axiosAuth.get<User>(`users-admin/${userId}`);

    return res.data;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosAuth.post<unknown, unknown, unknown>(`users-admin/${userId}`, {
        email: data.email,
      });

      toast({
        title: 'Success',
        description: `User has been updated!`,
      });

      router.push(ROUTE.ADMIN_USER);
    } catch (error) {
      toast({
        title: 'Error occurred!',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 pt-10">
      <p className="text-2xl">Edit User</p>
      <form
        className="flex w-[50%] flex-col gap-6 lg:w-[50rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="email" type="email" register={register} />
        <Input label="password" type="password" register={register} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default EditDevicePage;
