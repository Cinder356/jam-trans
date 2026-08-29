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

import { useMemo, createContext, type PropsWithChildren, useState } from 'react';

export type DictView = 'list' | 'editor' | 'flashcards';

export interface DictionariesViewContextValue {
  currentView: DictView;
  dictId: string | null;
  openListView: () => void;
  openEditorView: (dictId: string) => void;
  openFlashcardsView: (dictId: string) => void;
}

export const DictionariesContext = createContext<DictionariesViewContextValue | null>(null);

export const DictionariesViewProvider = ({ children }: PropsWithChildren) => {
  const [currentView, setCurrentView] = useState<DictView>('list');
  const [dictId, setDictId] = useState<string | null>(null)

  const openEditorView = (openingDictId: string) => {
    setCurrentView('editor');
    setDictId(openingDictId);
  }

  const openListView = () => {
    setCurrentView('list');
    setDictId(null);
  }

  const openFlashcardsView = (learningDictId: string) => {
    setCurrentView('flashcards');
    setDictId(learningDictId);
  }

  const contextValue = useMemo<DictionariesViewContextValue>(() => ({
    currentView,
    dictId,
    openListView,
    openEditorView,
    openFlashcardsView
  }), [currentView])

  return (
    <DictionariesContext.Provider value={contextValue}>
      {children}
    </DictionariesContext.Provider>
  )
}
