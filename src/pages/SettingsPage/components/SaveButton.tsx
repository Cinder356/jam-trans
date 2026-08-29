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

import useSettings from "@/app/hooks/useSettings";
import { Button } from "@/components/ui/button";

const SaveButton = (): React.ReactNode => {
  const { isSaved, saveSettings } = useSettings();

  return (
    <Button className="fixed bottom-2 right-2 font-bold rounded-lg" variant="outline" size="sm"
      disabled={isSaved} onClick={saveSettings}>
      Save
    </Button>
  )
}

export default SaveButton;
