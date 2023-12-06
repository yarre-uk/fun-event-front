'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { dictionaries } from '@/app/[lang]/dictionaries';
import { Button } from '@/shared/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/shared/components/ui/card';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { Device } from '@/shared/models/device';

type MangaCardProps = {
  data: Device;
  lang: string;
};

function DeviceCard({ data, lang }: MangaCardProps) {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const deleteHandler = () => {
    axiosAuth.delete(`devices/${data.id}`);
    router.push(ROUTE.DEVICES);
  };

  return (
    <Card className="flex h-fit w-[300px] flex-col justify-between px-4 py-2">
      <div
        onClick={() => {
          router.push(`${ROUTE.DEVICES}/${data.id}`);
        }}
        className="flex flex-col gap-4 pt-4"
      >
        <CardTitle>{data.id}</CardTitle>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <CardDescription className="text-primary">
              {dictionaries[lang].device.action}: {data.action}
            </CardDescription>
            <CardDescription className="text-primary">
              {dictionaries[lang].device.reaction}: {data.reaction}
            </CardDescription>
            <CardDescription>NFC: {data.nfcData}</CardDescription>
          </div>
          <div className="flex flex-col gap-4">
            <CardDescription className="text-primary">
              {dictionaries[lang].device.status}:{' '}
              {data.isLost
                ? dictionaries[lang].device.statusLost
                : dictionaries[lang].device.statusActive}
            </CardDescription>
            <CardDescription>
              {data.turnedOff
                ? dictionaries[lang].device.turnedOff
                : dictionaries[lang].device.turrnedOn}
            </CardDescription>
            <CardDescription>
              {dictionaries[lang].device.lastTimeOnline}:{' '}
              {new Date(data.lastTimeOnline).toLocaleString()}
            </CardDescription>
          </div>
        </div>
      </div>
      <Button onClick={deleteHandler}>
        <X />
      </Button>
    </Card>
  );
}

export default DeviceCard;
