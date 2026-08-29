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

import { Switch } from '@/components/ui/switch';
import LabelWithHint from '../LabelWithHint';

interface SwitchPropertyProps {
  id: string;
  label: string;
  checked?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  hint?: string;
}


export default ({ id, label, checked, defaultValue, onChange, hint }: SwitchPropertyProps) => {
  return (
    <div className='flex w-full max-w-xs justify-between mx-auto items-center'>
      <LabelWithHint htmlFor={id} label={label} hint={hint} />
      <Switch id={id} checked={checked} defaultChecked={defaultValue} onCheckedChange={onChange} />
    </div>
  )
}
