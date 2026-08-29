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


export const INNER_SEPARATORS = {
  dash: {
    label: "Dash (-)",
    sep: "-"
  },
  colon: {
    label: "Colon (:)",
    sep: ":",
  },
  doubleColon: {
    label: "Double colon (::)",
    sep: "::"
  }
}

export const OUTER_SEPARATORS = {
  newLine: {
    label: "New line",
    sep: "\n"
  },
  semicolon: {
    label: "Semicolon (;)",
    sep: ";",
  }
}

import { type InnerSeparator, type OuterSeparator } from "../types/separators";

export const DEFAULT_INNER: InnerSeparator = "doubleColon";
export const DEFAULT_OUTER: OuterSeparator = "newLine";
