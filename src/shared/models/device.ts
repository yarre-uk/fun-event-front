import { Action, Reaction } from '@/shared/models/commands';

export type Device = {
  id: number;
  action: Action;
  reaction: Reaction;
  nfcData: string;
  lastTimeOnline: Date;
  turnedOff: boolean;
  isLost: boolean;
};
