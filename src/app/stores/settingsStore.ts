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
import { AppSettingsSchema, type AppSettings } from "../types/AppSettings";


const store = new LazyStore('settings.json');

export async function setConfig<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
  await store.set(key, value);
  await store.save();
}

export async function getAllConfigs(): Promise<AppSettings> {
  const entries = await store.entries<any>();
  const allSettings = Object.fromEntries(entries);

  return AppSettingsSchema.catch(AppSettingsSchema.parse({})).parse(allSettings);
}
