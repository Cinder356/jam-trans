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

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { LangCode, LangPair } from "@/app/types/Langs";
import useTranslation from "./useTranslation";
import useTranslator from "./useTranslator";

type DetectAndSwapLangsFn = (text: string, currentPair: LangPair) => void;

export const DETECT_AND_SWAP_QUERY_KEY = ['detect-key'] as const;

export default () => {
  const { swapLangs } = useTranslation();
  const { detectLang } = useTranslator();
  const queryClient = useQueryClient();

  const detectAndSwapLangs: DetectAndSwapLangsFn = useCallback(async (text: string, currentPair: LangPair) => {
    if (!text || currentPair.source === 'auto' || currentPair.source === currentPair.target) return;
    const whitelist: LangCode[] = [currentPair.source, currentPair.target];
    try {
      await queryClient.cancelQueries({ queryKey: DETECT_AND_SWAP_QUERY_KEY });
      const res = await queryClient.fetchQuery({
        queryKey: DETECT_AND_SWAP_QUERY_KEY,
        queryFn: () => detectLang(text, whitelist)
      })
      if (res.lang_code !== currentPair.source)
        swapLangs();
    } catch (e) {
      console.error('Tauri detection error: ', e);
    }
  }, [queryClient]);

  return detectAndSwapLangs
}
