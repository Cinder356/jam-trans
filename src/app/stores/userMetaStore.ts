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

import { LazyStore } from '@tauri-apps/plugin-store';
import { UserMetaSchema, type UserMeta } from '../types/UserMeta';
export type { UserMeta };

const DEFAULT_USER_META = UserMetaSchema.parse({});

const store = new LazyStore('user-meta.json');

export async function setMetaItem<K extends keyof UserMeta>(key: K, value: UserMeta[K]) {
  await store.set(key, value);
  await store.save();
}

export async function getMetaItem<K extends keyof UserMeta>(key: K): Promise<UserMeta[K] | undefined> {
  const value = await store.get<UserMeta[K]>(key);
  return value ?? DEFAULT_USER_META[key];
}

export async function getAllMetaItems(): Promise<UserMeta> {
  const entries = await store.entries<any>();
  const allSettings = Object.fromEntries(entries);
  return UserMetaSchema.catch(UserMetaSchema.parse({})).parse(allSettings);
}
