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

import { commands } from '@/bindings';
import useSettings from '@/app/hooks/useSettings';

export default function () {
  const { settings } = useSettings()

  const speak = async (text: string) => {
    const res = await commands.speak(text, settings.voice);
    if (res.status === "error") {
      console.error(res.error);
      return;
    }
  }

  return { speak }
}
