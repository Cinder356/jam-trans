import { invoke } from '@tauri-apps/api/core';
import { commands } from '@/bindings';
import { type LangDetectionResult } from '@/app/types/LangDetectionResult';
import type { LangCode } from "@/app/types/Langs";
import { getTranslationPrompt } from "@/app/consts/prompts";
import { type TranslateResponse, TranslateResponseScheme } from '../types/TranslateResponse'
import useActiveLlmProfile from './useActiveLlmProfile';
import { extractAndParseJSON } from '@/app/helpers/parseLlmRespone';


export interface TranslateParams {
  term: string;
  sourceLang: LangCode | 'auto';
  targetLang: LangCode;
}

export default () => {
  const llmProfile = useActiveLlmProfile();

  const translateViaLlm = async ({ term, sourceLang, targetLang }: TranslateParams): Promise<TranslateResponse> => {
    if (!llmProfile) throw new Error("No LLM profile selected. Go to Settings to add one.");

    const prompt = getTranslationPrompt({ text: term, sourceLang, targetLang });
    const response = await commands.askLlm([{
      role: 'user',
      content: prompt
    }], llmProfile.model, llmProfile.temperature);

    if (response.status === 'error') {
      throw new Error(response.error);
    }

    const parsedData = extractAndParseJSON(response.data);
    const result = TranslateResponseScheme.parse(parsedData);

    return result;
  }

  const detectLang = async (text: string, whitelist?: LangCode[]) => {
    const res = await invoke("detect_language", { text, whitelist }) as LangDetectionResult;
    return res;
  }

  return {
    translateViaLlm,
    detectLang
  }
}
