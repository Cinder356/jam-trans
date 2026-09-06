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
import { useEffect, useState } from "react";
import useSettings from "@/app/hooks/useSettings";
import TextProperty from "../../Properties/TextProperty";
import { ModelProfile } from "@/app/types/ModelProfile"
import { commands } from "@/bindings";


interface ApiKeyInputProps {
  currentProfile: ModelProfile | null,
}

const ApiKeyInput = ({ currentProfile }: ApiKeyInputProps): React.ReactNode => {
  const { writeApiKey } = useSettings();
  const [isKeyStored, setIsKeyStored] = useState(false);

  useEffect(() => {
    if (!currentProfile) return;
    commands.checkProfileApiKey(currentProfile.id)
      .then(result => setIsKeyStored(result.is_saved));
  }, [currentProfile])

  const handleChange = (value: string) => {
    if (!currentProfile) return;
    writeApiKey(currentProfile.id, value);
  }

  let placeholderValue = "";
  if (isKeyStored)
    placeholderValue = "✓ API key saved";
  else
    placeholderValue = "Pleace, enter API key";

  return (
    <>
      <TextProperty
        className={isKeyStored ? "" : "border-destructive"}
        placeholder={placeholderValue}
        id='profile-service-api-key-input' label='API key'
        type='password'
        onChange={handleChange}
      />
    </>
  )
}

export default ApiKeyInput;
