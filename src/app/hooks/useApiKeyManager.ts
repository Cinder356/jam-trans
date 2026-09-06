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
import { useCallback, useRef } from "react";
import { commands, type KeyStoreError } from "@/bindings";


const useApiKeyManager = () => {
  const updatedApiKeysRef = useRef(new Map<string, string>());

  const handleKeyStoreError = (err: KeyStoreError) => {
    if (err.type === "MissingKeyringDaemon")
      console.error(`MissingKeyringDaemon error: ${err.message}`);
    else
      console.error(err.message);
  }

  const writeApiKey = useCallback((profileId: string, apiKey: string) => {
    updatedApiKeysRef.current.set(profileId, apiKey);
  }, []);

  const removeApiKey = useCallback((profileId: string) => {
    return commands.removeProfileApiKey(profileId);
  }, []);

  const saveUpdatedApiKeys = useCallback(async () => {
    const savedApiKeysCount = updatedApiKeysRef.current.size;
    const results = await Promise.all(
      Array.from(updatedApiKeysRef.current.entries()).map(([profileId, apiKey]) =>
        commands.saveProfileApiKey(profileId, apiKey)
      )
    );
    for (const result of results) {
      if (result.status === "error")
        handleKeyStoreError(result.error)
    }
    updatedApiKeysRef.current.clear();
    return savedApiKeysCount;
  }, []);

  const clearStagedApiKeys = useCallback(() => {
    updatedApiKeysRef.current.clear();
  }, []);


  return {
    writeApiKey,
    removeApiKey,
    saveUpdatedApiKeys,
    clearStagedApiKeys,
  }
}

export default useApiKeyManager;
