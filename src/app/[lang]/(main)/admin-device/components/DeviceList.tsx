'use client';

import DeviceCard from './DeviceCard';

import { BeatLoader, FullPageLoader } from '@/shared/components/lib';
import { Device } from '@/shared/models/device';

type MangaListProps = {
  devices: Device[];
  lang: string;
};

function DevicesList({ devices, lang }: MangaListProps) {
  if (!devices) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <>
      {devices?.length !== 0 ? (
        devices.map((device) => (
          <DeviceCard key={device.id} data={device} lang={lang} />
        ))
      ) : (
        <div className="text-center">
          <BeatLoader size={30} />
        </div>
      )}
    </>
  );
}

export default DevicesList;
