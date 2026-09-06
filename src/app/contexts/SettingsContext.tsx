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

import { useState, useCallback, useRef, useEffect, createContext, type PropsWithChildren, useMemo } from "react";
import { setConfig, getAllConfigs } from "@/app/stores/settingsStore";
import { type AppSettings } from "../types/AppSettings";
import useApiKeyManager from "../hooks/useApiKeyManager";

// export type GetPropertyFn = <K extends keyof AppSettings>(key: K) => AppSettings[K];
export type ChangePropertyFn = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;

interface SettingsContextValue {
  settings: AppSettings;
  changeSettingsProperty: ChangePropertyFn;
  setProperties: (value: AppSettings) => void;
  saveSettings: () => void;
  isSaved: boolean;
  restoreSettings: () => void;
  writeApiKey: (profileId: string, apiKey: string) => void;
  apiKeysVersion: number;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [savedSettings, setSavedSettings] = useState<AppSettings | null>(null);
  const settingsRef = useRef<AppSettings | null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const { writeApiKey, removeApiKey, saveUpdatedApiKeys, clearStagedApiKeys } = useApiKeyManager();
  const [apiKeysVersion, setApiKeysVersion] = useState(0);

  useEffect(() => {
    getAllConfigs()
      .then((value) => {
        settingsRef.current = value;
        setSavedSettings(value);
      });
  }, []);

  const changeSettingsProperty: ChangePropertyFn = useCallback((key, value) => {
    setIsSaved(false);
    settingsRef.current = { ...settingsRef.current!, [key]: value };
  }, []);

  const setProperties = useCallback((value: AppSettings) => {
    setIsSaved(false);
    settingsRef.current = value;
  }, []);

  const handleWriteApiKey = useCallback((profileId: string, apiKey: string) => {
    writeApiKey(profileId, apiKey);
    setIsSaved(false);
  }, [writeApiKey]);

  const saveSettings = useCallback(() => {
    const prev = savedSettings!;
    const next = settingsRef.current!;
    (async () => {
      const entries = Object.entries(next) as [keyof AppSettings, AppSettings[keyof AppSettings]][];
      const promises = entries.map(([key, value]) => setConfig(key, value));
      await Promise.all(promises);
      const savedKeysCount = await saveUpdatedApiKeys();
      const nextIds = new Set(next.llmProfiles.map(p => p.id));
      await Promise.all(
        prev.llmProfiles.filter(p => !nextIds.has(p.id)).map(p => removeApiKey(p.id))
      );
      if (savedKeysCount > 0)
        setApiKeysVersion(v => v + 1);
      setIsSaved(true);
      setSavedSettings(next);
    })();
  }, [savedSettings, saveUpdatedApiKeys, removeApiKey]);

  const restoreSettings = useCallback(() => {
    settingsRef.current = savedSettings;
    clearStagedApiKeys();
    setIsSaved(true);
  }, [savedSettings, clearStagedApiKeys]);

  const contextValue = useMemo<SettingsContextValue>(() => ({
    settings: savedSettings!,
    changeSettingsProperty,
    setProperties,
    saveSettings,
    isSaved,
    restoreSettings,
    writeApiKey: handleWriteApiKey,
    apiKeysVersion
  }), [savedSettings, isSaved, changeSettingsProperty, setProperties, saveSettings, restoreSettings, handleWriteApiKey, apiKeysVersion])

  if (!savedSettings) return null;

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}
