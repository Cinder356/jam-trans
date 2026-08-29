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

import formatKeyboardCode from "./formatKeyboardCode";

export default (e: React.KeyboardEvent | KeyboardEvent, shortcut: string[]) => {
  if (!shortcut || shortcut.length === 0) return false;

  // Проверяем, требует ли шорткат зажатых модификаторов
  const requiresCtrl = shortcut.includes("Ctrl");
  const requiresCmd = shortcut.includes("Cmd");
  const requiresAlt = shortcut.includes("Alt");
  const requiresShift = shortcut.includes("Shift");

  // Строгая проверка (если в шорткате нет Shift, а юзер его нажал — шорткат не сработает)
  if (e.ctrlKey !== requiresCtrl) return false;
  if (e.metaKey !== requiresCmd) return false;
  if (e.altKey !== requiresAlt) return false;
  if (e.shiftKey !== requiresShift) return false;

  // Ищем основную клавишу в массиве (которая не является модификатором)
  const MODIFIERS = ["Ctrl", "Cmd", "Alt", "Shift"];
  const mainKey = shortcut.find(key => !MODIFIERS.includes(key));

  // Если основная клавиша есть, проверяем, совпадает ли она с текущим e.code
  if (mainKey) {
    return formatKeyboardCode(e.code) === mainKey;
  }

  return true; // Если шорткат состоит только из модификаторов (редко, но бывает)
};
