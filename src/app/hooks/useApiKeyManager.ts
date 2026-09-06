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
