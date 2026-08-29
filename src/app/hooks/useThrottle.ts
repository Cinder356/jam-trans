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

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для троттлинга значения.
 * Значение будет обновляться не чаще, чем раз в заданный интервал времени.
 *
 * @param value Значение для троттлинга
 * @param interval Интервал в миллисекундах (по умолчанию 500мс)
 * @returns Троттленное значение
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastExecuted.current;

    // Если прошло достаточно времени с последнего обновления, обновляем сразу
    if (timeElapsed >= interval) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      // Иначе планируем обновление через оставшееся время
      const timeRemaining = interval - timeElapsed;

      const timerId = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, timeRemaining);

      // Очистка таймера при изменении value или размонтировании
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [value, interval]);

  return throttledValue;
}
