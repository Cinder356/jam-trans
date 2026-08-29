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

import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import type { ReactNode } from "react"

interface GroupWrapperProps {
  children: ReactNode
  className?: ClassValue
}

export default ({ children, className }: GroupWrapperProps) => {
  return (
    <div className={cn([
      "flex flex-col gap-2",
      className
    ])}>
      {children}
    </div>
  )
}
