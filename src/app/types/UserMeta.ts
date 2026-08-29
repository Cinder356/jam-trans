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

import z from "zod";
import { languagesByName } from "../consts/languages";
import { LangCode } from "./Langs";

const langCodeValues = Object.values(languagesByName) as [LangCode, ...LangCode[]];

export const LangCodeSchema = z.enum(langCodeValues);

export const LangPairSchema = z.object({
  source: z.union([LangCodeSchema, z.literal('auto')]).default('auto'),
  target: LangCodeSchema.default('eng'),
});

export const UserMetaSchema = z.object({
  lastLangPair: LangPairSchema.default({ source: 'auto', target: 'eng' }),
  favoriteDictionaryId: z.string().default(""),
});

export type UserMeta = z.infer<typeof UserMetaSchema>;
