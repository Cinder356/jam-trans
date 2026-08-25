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
