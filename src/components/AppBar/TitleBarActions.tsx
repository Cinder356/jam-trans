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

import { getCurrentWindow } from "@tauri-apps/api/window";
import { XIcon, MaximizeIcon, MinusIcon } from "lucide-react";
import { isMacOS } from "@/lib/platform";

const appWindow = getCurrentWindow();

const TitleBarActions = ({ ...props }): React.ReactNode => {
  if (isMacOS()) return null;

  return (
    <div
      {...props}
      className="z-10 w-fit h-full ml-auto flex gap-1 items-center">
      <div className="bg-accent/40 rounded-md p-1 cursor-pointer hover:bg-accent/80 transition-colors duration-150">
        <MinusIcon size={20} onClick={() => appWindow.minimize()} className="text-foreground/80 hover:text-foreground" />
      </div>
      <div className="bg-accent/40 rounded-md p-1 cursor-pointer hover:bg-accent/80 transition-colors duration-150">
        <MaximizeIcon size={20} onClick={() => appWindow.toggleMaximize()} className="text-foreground/80 hover:text-foreground" />
      </div>
      <div className="bg-destructive/20 rounded-md p-1 cursor-pointer hover:bg-destructive/50 transition-colors duration-150">
        <XIcon size={20} onClick={() => appWindow.close()} />
      </div>
    </div>
  )
}

export default TitleBarActions;
