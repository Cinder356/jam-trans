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

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { FileDown } from "lucide-react"
import ImportPairsDialog from "./ImportPairsDialog"
import type { TermPair } from "@/app/types/Dictionary"

interface AddPairFormProps {
  onAdd: (source: string, target: string) => void;
  onImportPairs: (newPairs: TermPair[]) => void;
}

export default ({ onAdd, onImportPairs }: AddPairFormProps) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const handleAdd = () => {
    if (!source.trim() || !target.trim()) return;
    onAdd(source.trim(), target.trim());
    setSource("");
    setTarget("");
  };

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <ImportPairsDialog onImportPairs={onImportPairs}>
        <Button size="icon-sm" variant="outline" >
          <FileDown />
        </Button>
      </ImportPairsDialog>
      <div className="flex gap-2 items-center flex-row">
        <Input
          placeholder="Source text"
          value={source}
          onChange={e => setSource(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          className="flex-1 h-8"
        />
        <span className="text-muted-foreground shrink-0">→</span>
        <Input
          placeholder="Target text"
          value={target}
          onChange={e => setTarget(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          className="flex-1 h-8"
        />
      </div>
      <Button
        size="icon-sm"
        onClick={handleAdd}
        disabled={!source.trim() || !target.trim()}
      >
        <Plus className="size-4" />
      </Button>
    </div >
  )
}
