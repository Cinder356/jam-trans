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

import { APP_BAR_ACTIONS_ID } from "./consts";
import Navigation from "../Navigation/Navigation";
import './AppBar.scss';
import TitleBarActions from "./TitleBarActions";
import { isMacOS } from "@/lib/platform";

export default function () {
  return (
    <header className="app-bar" {...(isMacOS() ? {} : { "data-tauri-drag-region": "deep" })}>
      <Navigation data-tauri-drag-region="false" />
      <div className="w-full h-full" id={APP_BAR_ACTIONS_ID} />
      {!isMacOS() && <TitleBarActions data-tauri-drag-region="false" />}
    </header>
  )
}
