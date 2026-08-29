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

import { LangPair, LangName } from "../types/Langs";
import { languagesByName } from "../consts/languages";
import { createDictionary, addPair, removePair, getDictionary, getAllDictionaries } from "./dictionariesStore";
import { getMetaItem, setMetaItem } from "./userMetaStore";

const DEFAULT_NAME = "Favorites";
const DEFAULT_DESCRIPTION = "Quick access to your favorite translations";

const codeToLangName = Object.fromEntries(
  Object.entries(languagesByName).map(([name, code]) => [code, name])
) as Record<string, LangName | undefined>;

function langNameFromCode(code: string | 'auto'): LangName | undefined {
  if (code === 'auto') return undefined;
  return codeToLangName[code];
}

export async function ensureFavoritesDictionary() {
  const favDictId = await getMetaItem("favoriteDictionaryId");
  if (favDictId) {
    const existingFavDict = await getDictionary(favDictId);
    if (existingFavDict)
      return;
  }
  const allDicts = await getAllDictionaries();
  const existingFavDict = allDicts.find(dict => dict.meta.isFavorites);
  if (existingFavDict) {
    await setMetaItem('favoriteDictionaryId', existingFavDict.meta.id);
    return;
  }
  const newFavDict = await createDictionary({
    name: DEFAULT_NAME,
    description: DEFAULT_DESCRIPTION
  }, true);
  await setMetaItem('favoriteDictionaryId', newFavDict.meta.id);
}

export async function addFavoriteTranslation(source: string, target: string, langPair: LangPair): Promise<void> {
  await ensureFavoritesDictionary();
  const favDictId = await getMetaItem("favoriteDictionaryId");
  if (!favDictId) return;

  await addPair(favDictId, {
    source,
    target,
    sourceLang: langNameFromCode(langPair.source),
    targetLang: langNameFromCode(langPair.target),
  });
}

export async function isTranslationFavorite(source: string, target: string, langPair: LangPair): Promise<boolean> {
  await ensureFavoritesDictionary();
  const favDictId = await getMetaItem("favoriteDictionaryId");
  if (!favDictId) return false;

  const dict = await getDictionary(favDictId);
  if (!dict) return false;

  const sourceLang = langNameFromCode(langPair.source);
  const targetLang = langNameFromCode(langPair.target);

  return dict.pairs.some(p =>
    p.source === source &&
    p.target === target &&
    p.sourceLang === sourceLang &&
    p.targetLang === targetLang
  );
}

export async function removeFavoriteTranslationByContent(source: string, target: string, langPair: LangPair): Promise<void> {
  await ensureFavoritesDictionary();
  const favDictId = await getMetaItem("favoriteDictionaryId");
  if (!favDictId) return;

  const dict = await getDictionary(favDictId);
  if (!dict) return;

  const sourceLang = langNameFromCode(langPair.source);
  const targetLang = langNameFromCode(langPair.target);

  const pairsToRemove = dict.pairs.filter(p =>
    p.source === source &&
    p.target === target &&
    p.sourceLang === sourceLang &&
    p.targetLang === targetLang
  );

  for (const pair of pairsToRemove) {
    await removePair(favDictId, pair.id);
  }
}
