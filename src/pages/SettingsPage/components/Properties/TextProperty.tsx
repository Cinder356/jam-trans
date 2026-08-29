/*
 * Copyright (C) 2026 l1ngus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Input } from '@/components/ui/input';
import LabelWithHint from '../LabelWithHint';
import { ComponentProps } from 'react';

interface TextPropertyProps extends Omit<ComponentProps<typeof Input>, "onChange"> {
  id: string;
  label: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: string;
}

export default function ({ id, label, defaultValue, onChange, hint, ...props }: TextPropertyProps) {

  return (
    <div className='grid w-full items-center gap-1'>
      <LabelWithHint htmlFor={id} label={label} hint={hint} />
      <Input {...props} defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        id={id} />
    </div>
  )
}
