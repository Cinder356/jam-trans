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
import { addPair, updatePair, removePair, addMultiplePairs } from "@/app/stores/dictionariesStore"
import type { DictionaryPair, TermPair } from "@/app/types/Dictionary"
import Pair from "./Pair"
import AddPairForm from "./AddPairForm"

interface PairListProps {
  dictId: string;
  pairs: DictionaryPair[];
  onChanged: () => void;
}

export default ({ dictId, pairs, onChanged }: PairListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSource, setEditSource] = useState("");
  const [editTarget, setEditTarget] = useState("");

  const handleAdd = async (source: string, target: string) => {
    await addPair(dictId, { source, target });
    onChanged();
  };

  const startEditing = (pair: DictionaryPair) => {
    setEditingId(pair.id);
    setEditSource(pair.source);
    setEditTarget(pair.target);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditSource("");
    setEditTarget("");
  };

  const handleUpdate = async (pairId: string) => {
    await updatePair(dictId, pairId, { source: editSource.trim(), target: editTarget.trim() });
    cancelEditing();
    onChanged();
  };

  const handleRemove = async (pairId: string) => {
    await removePair(dictId, pairId);
    onChanged();
  };

  const handleImportPairs = async (newPairs: TermPair[]) => {
    await addMultiplePairs(dictId, newPairs);
    onChanged();
  }

  return (
    <div className="space-y-3">
      <AddPairForm onAdd={handleAdd} onImportPairs={handleImportPairs} />
      <div className="space-y-2">
        {pairs.map(pair => (
          <Pair
            key={pair.id}
            pair={pair}
            isEditing={editingId === pair.id}
            editSource={editSource}
            editTarget={editTarget}
            onEditSourceChange={setEditSource}
            onEditTargetChange={setEditTarget}
            onStartEdit={() => startEditing(pair)}
            onCancelEdit={cancelEditing}
            onSave={() => handleUpdate(pair.id)}
            onRemove={() => handleRemove(pair.id)}
          />
        ))}
        {pairs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">No pairs yet.</p>
        )}
      </div>
    </div>
  );
};
