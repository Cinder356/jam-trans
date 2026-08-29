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

import { useEffect, useState } from "react"
import { type Dictionary } from "@/app/types/Dictionary";
import { getAllDictionaries } from "@/app/stores/dictionariesStore";
import sortDictionaries from "@/app/helpers/sortDictionaries";
import DictionaryCard from "./DictionaryCard";



export default () => {
  const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);

  useEffect(() => {
    getAllDictionaries().then(dicts => {
      setDictionaries(sortDictionaries(dicts));
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 max-w-xl w-[75%] mt-4 mx-auto">
      {dictionaries.map(dict => (
        <DictionaryCard key={dict.meta.id} dictMeta={dict.meta} />
      ))}
    </div >
  )
}
