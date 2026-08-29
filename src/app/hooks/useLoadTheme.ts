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

import { useEffect } from "react";
import { AppSettingsSchema } from "../types/AppSettings";
import useSettings from "./useSettings";


export default () => {
  const { settings } = useSettings();

  useEffect(() => {
    const theme = settings.theme;
    const html = document.documentElement;
    html.classList.remove(...AppSettingsSchema.shape.theme.unwrap().options);
    html.classList.add(theme);
  }, [settings.theme]);
}
