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

import { SquarePen, StickyNotes } from 'lucide-react';
import { DictionaryMeta } from "@/app/types/Dictionary"
import { useDictionariesView } from "../../hooks/useDictionariesView";

interface DictionaryCardProps {
  dictMeta: DictionaryMeta;
}

export default ({ dictMeta }: DictionaryCardProps) => {
  const { openEditorView, openFlashcardsView } = useDictionariesView();

  return (
    <div className="flex justify-between py-1.5 px-3 border rounded-md items-center">
      <b>{dictMeta.name}</b>
      <div className="flex items-center gap-3">
        <SquarePen onClick={() => openEditorView(dictMeta.id)} className='cursor-pointer hover:scale-110 transition-transform duration-200' />
        <StickyNotes onClick={() => openFlashcardsView(dictMeta.id)} className='cursor-pointer hover:scale-110 transition-transform duration-200' />
      </div>
    </div>
  )
}
