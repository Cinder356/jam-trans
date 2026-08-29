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

import { createContext, useState, type PropsWithChildren } from "react";
import { type PageKey } from '@/app/consts/pages';

export interface PageContextValue {
  currentPage: PageKey;
  changePage: (page: PageKey) => void
}

const defaultPage: PageKey = 'translator';

export const PageContext = createContext<PageContextValue>({
  currentPage: defaultPage,
  changePage: () => undefined
});

export const PageProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<PageKey>(defaultPage);
  // const changePage = (page: Page) => setCurrentPage(page);
  return (
    <PageContext.Provider value={{ currentPage, changePage: setCurrentPage }} >
      {children}
    </PageContext.Provider>
  )
}
