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
