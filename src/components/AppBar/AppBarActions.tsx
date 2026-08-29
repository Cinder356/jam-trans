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

import { useState, useLayoutEffect, useEffect, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { APP_BAR_ACTIONS_ID } from './consts';

interface AppBarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function ({ children, ...props }: PropsWithChildren<AppBarActionsProps>) {
  const [container, setContainer] = useState<null | HTMLElement>(() =>
    document.getElementById(APP_BAR_ACTIONS_ID)
  );

  useLayoutEffect(() => {
    if (!container) {
      const el = document.getElementById(APP_BAR_ACTIONS_ID);
      if (el) setContainer(el);
    }
  }, [container]);

  useEffect(() => {
    if (!container) return;
    if (props.className)
      container.classList.add(...props.className.split(' '));
    if (props.style)
      Object.assign(container.style, props.style);
    return () => {
      if (props.className)
        container.classList.remove(...props.className.split(' '));
    };
  }, [container, props.className, props.style]);

  if (!container) return null;

  return createPortal(children, container);
}
