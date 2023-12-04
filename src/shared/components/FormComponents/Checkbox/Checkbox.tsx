import {
  Path,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { Checkbox as CheckboxShadcn } from '../../ui/checkbox';
import { Input } from '../../ui/input';

import capitalizedWords from '@/shared/utils/capitalizedWords';
import { cn } from '@/shared/utils/utils';

interface CheckboxPropss<T> {
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: string | undefined;
  className?: string;
  divClassName?: string;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  defaultChecked?: boolean;
}

function Checkbox<T>({
  label,
  register,
  className,
  error,
  setValue,
  getValues,
  ...inputProps
}: CheckboxPropss<T>) {
  return (
    <div className="flex flex-row items-center gap-4">
      <label htmlFor={label}>{capitalizedWords(label)}</label>
      <CheckboxShadcn
        onCheckedChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(label, e as any);
        }}
        {...inputProps}
        checked={getValues(label) as boolean}
      />
      {error && <p className="ml-2 text-red-500">{error}</p>}
    </div>
  );
}

export default Checkbox;
