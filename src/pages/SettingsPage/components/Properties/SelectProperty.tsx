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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import LabelWithHint from "../LabelWithHint";

interface TextPropertyProps<T extends string> {
  selectItems: { value: T, label: string }[];
  label: string;
  className?: string;
  value?: T;
  defaultValue?: T;
  onChange: (value: T) => void;
  hint?: string;
  placeholder?: string;
}


export default function <T extends string>({ selectItems, label, className, value, defaultValue, onChange, hint, placeholder }: TextPropertyProps<T>) {
  return (
    <div className={cn([
      'grid w-full items-center gap-1.5',
      className
    ])}>
      <LabelWithHint label={label} hint={hint} />
      <Select disabled={selectItems.length === 0} value={value} defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className="flex w-full overflow-hidden">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map(({ value: itemValue, label }) =>
            <SelectItem key={itemValue} value={itemValue}>{label}</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div >
  )
}
