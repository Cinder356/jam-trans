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

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlashcardNavBarProps {
  currentPairInd: number;
  pairsAmount: number;
  onPrev: () => void;
  onNext: () => void;
}

const FlashcardNavBar = ({ currentPairInd, pairsAmount, onPrev, onNext }: FlashcardNavBarProps) => {
  return (
    <div className="mx-auto w-fit flex items-center gap-2">
      <Button disabled={currentPairInd <= 0} onClick={onPrev} className="cursor-pointer" variant="outline" size="icon-sm"><ArrowBigLeft /></Button>
      <span className="font-bold select-none">{currentPairInd + 1}/{pairsAmount}</span>
      <Button disabled={currentPairInd + 1 >= pairsAmount} onClick={onNext} className="cursor-pointer" variant="outline" size="icon-sm"><ArrowBigRight /></Button>
    </div>
  )
}

export default FlashcardNavBar;
