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

export function extractAndParseJSON(rawResponse: string) {
  try {
    // 1. ПОЛНОСТЬЮ вырезаем блок <think>...</think> со всеми переносами строк
    // [\s\S]*? означает "любые символы, включая переносы строк, ленивый поиск"
    const withoutThink = rawResponse.replace(/<think>[\s\S]*?<\/think>/gi, '');

    // 2. Теперь ищем скобки в очищенном от размышлений тексте
    const firstBrace = withoutThink.indexOf('{');
    const lastBrace = withoutThink.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("JSON not found in the response");
    }

    // 3. Вырезаем только JSON часть
    const jsonString = withoutThink.substring(firstBrace, lastBrace + 1);

    // 4. Парсим
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("LLM response parsing error. Original response:", rawResponse);
    throw error;
  }
}
