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

import { HomeIcon, SettingsIcon, BookText } from "lucide-react";
import SettingsPage from "@/pages/SettingsPage";
import TranslatorPage from "@/pages/TranslatorPage";
import DictionariesPage from "@/pages/DictionariesPage";

export const pages = {
  settings: {
    Component: SettingsPage,
    Icon: SettingsIcon
  },
  translator: {
    Component: TranslatorPage,
    Icon: HomeIcon
  },
  dictionaries: {
    Component: DictionariesPage,
    Icon: BookText
  }
};

export type PageKey = keyof typeof pages;
export type PageValue = (typeof pages)[PageKey]
