'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

import { useToast } from '@/shared/components/ui/use-toast';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function Profile() {
  const { data: session } = useSession();
  const [hasLostDevices, setHasLostDevices] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!session?.user) return;

    const intervalId = setInterval(() => {
      axiosAuth
        .get('profile/has-lost-devices', { withCredentials: true })
        .then((res) => {
          setHasLostDevices(res.data);

          if (res.data) {
            toast({
              title: 'You have lost devices!',
              variant: 'destructive',
            });
          }
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [session?.user, axiosAuth, toast]);

  // useEffect(() => {
  //   axiosAuth
  //     .post(
  //       'auth/signin',
  //       {
  //         email: 'admin@email.com',
  //         password: 'asdASD1!',
  //       },
  //       { withCredentials: true },
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }, []);

  return (
    <div>
      <p className="text-center text-3xl">Profile information</p>

      <p>{session?.user?.email}</p>
      <p>Has lost devices - {new String(hasLostDevices)}</p>
      {/* <p>{session?.user?.data.email}</p>
      <p>{session?.user?.data.phoneNumber}</p>
      <p>{session?.user?.data.description}</p>
      <p>{session?.user?.data.avatar}</p> */}
    </div>
  );
}
