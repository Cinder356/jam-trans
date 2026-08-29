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

import { useContext } from 'react';
import { pages, type PageKey, type PageValue } from '@/app/consts/pages';
import { PageContext } from '@/app/contexts/PageContext';
import { cn } from '@/lib/utils';


export default function ({ className, ...props }: { className?: string }) {
  const { currentPage, changePage } = useContext(PageContext);
  return (
    <nav className={cn(
      "z-10 flex flex-row w-fit gap-2 px-2 py-0.5 border rounded-md transition-colors duration-200",
      "bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50", className)}
      {...props}
    >
      {(Object.entries(pages) as [PageKey, PageValue][]).map(([pageKey, value]) => {
        const isActive = currentPage === pageKey;

        return (
          <value.Icon key={pageKey}
            className={cn('cursor-pointer rounded-md transition-colors duration-200',
              isActive
                ? "text-foreground dark:text-foreground"
                : "text-muted-foreground hover:text-foreground "
            )}
            size={26}
            onClick={() => { if (currentPage !== pageKey) changePage(pageKey) }} />
        )
      }
      )}
    </nav>
  )
}
