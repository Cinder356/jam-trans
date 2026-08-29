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

import { ArrowRightLeft } from "lucide-react";
import AppBarActions from "@/components/AppBar/AppBarActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { languagesByName } from '@/app/consts/languages';
import type { LangCode } from "@/app/types/Langs";
import useTranslation from "../hooks/useTranslation";

const langOptions: [string, LangCode][] = Object.entries(languagesByName);

export default function () {
  const { langPair, updateLangPair, swapLangs } = useTranslation();

  const handleSwap = () => {
    swapLangs(true);
  }

  return (
    <AppBarActions>
      <div data-tauri-drag-region="false" className="flex gap-2 mx-auto w-fit h-full items-center justify-center select-none">

        <Select value={langPair.source} onValueChange={(newVal: LangCode | 'auto') => updateLangPair({ source: newVal })}>
          <SelectTrigger size="sm" className="w-32 p-2 capitalize">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem key={'auto-source'} value="auto" >Auto</SelectItem>
            {langOptions.map(([langName, langCode]) =>
              <SelectItem key={langCode + '-source'} className="capitalize" value={langCode}>
                {langName}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <ArrowRightLeft className="cursor-pointer" onClick={handleSwap} />

        <Select value={langPair.target} onValueChange={(newVal: LangCode) => updateLangPair({ target: newVal })}>
          <SelectTrigger size="sm" className="w-32 p-2 capitalize">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent position="popper">
            {langOptions.map(([langName, langCode]) =>
              <SelectItem key={langCode + '-target'} className="capitalize" value={langCode}>
                {langName}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

      </div>
    </AppBarActions >
  )
}
