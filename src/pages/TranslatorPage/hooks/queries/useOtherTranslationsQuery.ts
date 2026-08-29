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

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { commands } from '@/bindings';
import useActiveLlmProfile from '../useActiveLlmProfile';
import { LangCode } from '@/app/types/Langs';
import { TranslateOthersResponseScheme, TranslateOthersWithPartsResponseScheme, TranslateOthersWithPartsResponse, TranslateOthersResponse } from '../../types/TranslateResponse';
import { getOtherTranslationsPrompt } from '@/app/consts/prompts';

type OtherTranslationsResponse = TranslateOthersResponse | TranslateOthersWithPartsResponse;

export interface UseOtherTranslationsQueryOptions {
  sourceText: string;
  translatedText: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
  maxSourceLength?: number;
  isEnabled?: boolean;
}
export type UseOtherTranslationsQueryResult = {
  response: OtherTranslationsResponse;
} & Pick<UseQueryResult<OtherTranslationsResponse>, 'isFetching' | 'isError' | 'error'>

export default (translateOptions: UseOtherTranslationsQueryOptions): UseOtherTranslationsQueryResult => {
  const llmProfile = useActiveLlmProfile();

  const fetchOtherTranslations = async ({ sourceText, translatedText, sourceLang, targetLang }: UseOtherTranslationsQueryOptions): Promise<OtherTranslationsResponse> => {
    if (!llmProfile) throw new Error("No LLM profile selected.");
    const prompt = getOtherTranslationsPrompt({ sourceText, translatedText, sourceLang, targetLang });
    console.log(`Alt request; isEn: ${translateOptions.isEnabled}`);
    const response = await commands.askLlm([{
      role: 'user',
      content: prompt
    }], llmProfile.model, .7);
    if (response.status === 'error')
      throw new Error(response.error);
    const cleanStr = response.data
      .replace(/^(```|""")\w*\n/, "")
      .replace(/(```|""")$/, "");
    const parsedStr = JSON.parse(cleanStr);
    const simpleResult = TranslateOthersResponseScheme.safeParse(parsedStr);

    if (simpleResult.success)
      return simpleResult.data;
    const result = TranslateOthersWithPartsResponseScheme.parse(parsedStr);
    return result;
  }

  const isEnabled = !!llmProfile
    && (translateOptions.isEnabled || typeof (translateOptions.isEnabled) === 'undefined')
    && (
      !!translateOptions.translatedText
      && (!translateOptions.maxSourceLength || translateOptions.sourceText.length <= translateOptions.maxSourceLength)
    );

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['transalte-other-key',
      translateOptions.translatedText,
      translateOptions.sourceLang,
      translateOptions.targetLang
    ],
    queryFn: () => fetchOtherTranslations(translateOptions),
    enabled: isEnabled,
    retry: false,
  })

  return { response: data ?? { otherTranslations: [] }, isFetching, isError, error };
}
