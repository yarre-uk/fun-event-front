'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import DevicesList from './components/DeviceList';

import { FullPageLoader } from '@/shared/components/lib';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { Device } from '@/shared/models/device';

function DevicesPage({ params: { lang } }: { params: { lang: string } }) {
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();

  const [devices, setDevices] = useState<Device[] | null>();

  useEffect(() => {
    if (!session?.user) return;

    axiosAuth.get<Device[]>('devices').then((res) => setDevices(res.data));
  }, [session?.user, axiosAuth]);

  if (!devices || !session?.user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-2">
      <p className="text-center text-2xl font-bold">Device List</p>
      <div className="flex flex-wrap justify-center gap-4">
        <DevicesList devices={devices} lang={lang} />
      </div>
    </div>
  );
}

export default DevicesPage;
