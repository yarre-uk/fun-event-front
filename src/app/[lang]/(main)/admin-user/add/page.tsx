'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormValues } from './types';

import { Input } from '@/shared/components/FormComponents';
import { Button } from '@/shared/components/ui/button';
import { useToast } from '@/shared/components/ui/use-toast';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';

function AddUserPage() {
  const { toast } = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosAuth.post<unknown, unknown, unknown>('users-admin', {
        ...data,
      });

      toast({
        title: 'Success',
        description: `User has been added!`,
      });

      router.push(ROUTE.ADMIN_USER);
    } catch (error) {
      toast({
        title: 'Error occurred!',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-10">
      <p className="text-2xl">Add User</p>
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

export default AddUserPage;
