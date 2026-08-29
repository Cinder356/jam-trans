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

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import LabelWithHint from '../LabelWithHint';

interface SliderPropertyProps {
  label: string;
  defaultValue?: number;
  value?: number;
  min?: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  hint?: string;
}

export default function SliderProperty({
  label,
  defaultValue,
  value,
  min = 0,
  max,
  step,
  onChange,
  hint,
}: SliderPropertyProps) {
  // 1. Храним локальный стейт только для неуправляемого режима
  const [internalValue, setInternalValue] = useState(defaultValue ?? min);

  // 2. Проверяем, передан ли value извне (Controlled mode)
  const isControlled = value !== undefined;

  // 3. Выбираем актуальное значение: внешнее (если есть) или локальное
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = ([newValue]: number[]) => {
    // Обновляем локальный стейт только если компонент неуправляемый
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange(newValue);
  };

  return (
    <div>
      <div className="flex justify-between">
        <LabelWithHint label={label} hint={hint} />
        <p>{currentValue}</p>
      </div>
      <Slider
        className="mt-1.5"
        value={[currentValue]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
      />
    </div>
  );
}
