'use client';

import { useRouter } from 'next/navigation';

import { Card, CardDescription, CardTitle } from '@/shared/components/ui/card';
import { ROUTE } from '@/shared/constants/routes';
import { Device } from '@/shared/models/device';

type MangaCardProps = {
  data: Device;
};

function DeviceCard({ data }: MangaCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`${ROUTE.DEVICES}/${data.id}`);
      }}
      className="flex h-fit w-[250px] justify-between px-4 py-2"
    >
      <div className="flex flex-col gap-4 pt-4">
        <CardTitle>{data.id}</CardTitle>
        <CardDescription className="text-primary">
          Action: {data.action}
        </CardDescription>
        <CardDescription className="text-primary">
          Reaction: {data.reaction}
        </CardDescription>
        <CardDescription>NFC: {data.nfcData}</CardDescription>
        <CardDescription className="text-destructive">
          Status: {data.isLost ? 'Lost' : 'In tact'}
        </CardDescription>
        <CardDescription>
          Turned Off: {data.turnedOff ? 'Yes' : 'No'}
        </CardDescription>
      </div>
    </Card>
  );
}

export default DeviceCard;
