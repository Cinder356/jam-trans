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
import useTranslator, { type TranslateParams } from '../useTranslator';
import { type TranslateResponse } from '../../types/TranslateResponse';


export type UseTranslateQueryOptions = TranslateParams;
export type UseTranslateQueryResult = {
  response: TranslateResponse;
} & Pick<UseQueryResult<TranslateResponse>, 'isFetching' | 'isError' | 'error'>

export default ({ term, sourceLang, targetLang }: UseTranslateQueryOptions): UseTranslateQueryResult => {
  const { translateViaLlm } = useTranslator();

  const isEnabled = !!term && term.trim().length > 0;

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['transalte-key', term, sourceLang, targetLang],
    queryFn: () => translateViaLlm({
      term,
      sourceLang,
      targetLang
    }),
    enabled: isEnabled,
    retry: false,
    placeholderData: undefined
  })

  const response = data ?? { translation: '', sourceCorrection: '' };

  return {
    response,
    isFetching,
    isError,
    error
  }
}
