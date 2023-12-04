'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormValues } from './types';

import { Checkbox, Input, Select } from '@/shared/components/FormComponents';
import { FullPageLoader } from '@/shared/components/lib';
import { Button } from '@/shared/components/ui/button';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useToast } from '@/shared/components/ui/use-toast';
import { ROUTE } from '@/shared/constants/routes';
import useAxiosAuth from '@/shared/hooks/useAxiosAuth';
import { Device } from '@/shared/models/device';

type EditDeviceProps = {
  params: { deviceId: string };
};

function EditDevicePage({ params: { deviceId } }: EditDeviceProps) {
  const [device, setDevice] = useState<Device | null>(null);

  const { toast } = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  const { data: session } = useSession();
  const { register, handleSubmit, setValue, getValues } = useForm<FormValues>();

  useEffect(() => {
    if (!session?.user) return;

    fetchDevice().then((device) => {
      setDevice(device);
      setValue('nfcData', device.nfcData);
      setValue('action', device.action.toString());
      setValue('reaction', device.reaction.toString());
      // setValue('isLost', 'true' as as boolean);
    });
  }, [deviceId, session?.user, axiosAuth]);

  const fetchDevice = async () => {
    const res = await axiosAuth.get<Device>(`devices/${deviceId}`);

    return res.data;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosAuth.post<unknown, unknown, unknown>(`devices/${deviceId}`, {
        ...data,
        isLost: data.isLost ?? device.isLost,
      });

      toast({
        title: 'Success',
        description: `Device has been reprogrammed!`,
      });

      router.push(ROUTE.DEVICES);
    } catch (error) {
      toast({
        title: 'Error occurred!',
        variant: 'destructive',
      });
    }
  };

  if (!device) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 pt-10">
      <p className="text-2xl">Edit Device</p>
      <form
        className="flex w-[50%] flex-col gap-6 lg:w-[50rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="nfcData" register={register} />
        <Select
          label={'action'}
          setValue={setValue}
          getValues={getValues}
          register={register}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="None" value="None">
              {'None'}
            </SelectItem>
            <SelectItem key="Light" value="Light">
              {'Light'}
            </SelectItem>
            <SelectItem key="Sound" value="Sound">
              {'Sound'}
            </SelectItem>
            <SelectItem key="NFCData" value="NFCData">
              {'NFCData'}
            </SelectItem>
            <SelectItem key="Vibrate" value="Vibrate">
              {'Vibrate'}
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          label={'reaction'}
          setValue={setValue}
          getValues={getValues}
          register={register}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="None" value="None">
              {'None'}
            </SelectItem>
            <SelectItem key="Light" value="Light">
              {'Light'}
            </SelectItem>
            <SelectItem key="Sound" value="Sound">
              {'Sound'}
            </SelectItem>
            <SelectItem key="Vibrate" value="Vibrate">
              {'Vibrate'}
            </SelectItem>
          </SelectContent>
        </Select>
        <Checkbox
          label="isLost"
          register={register}
          getValues={getValues}
          setValue={setValue}
          defaultChecked={device.isLost}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default EditDevicePage;
