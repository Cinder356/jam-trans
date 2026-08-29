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
import { AppSettingsSchema } from '@/app/types/AppSettings';
import GroupHeading from './GroupHeading';
import GroupWrapper from './GroupWrapper';
// import SwitchProperty from '../Properties/SwitchProperty';
// import SliderProperty from "../Properties/SliderProperty";
import SelectProperty from "../Properties/SelectProperty"
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";
import { useEffect, useState } from 'react';

export default function ({ settings, changeSettingsProperty }: SettingsGroupProps) {
  const [voices, setVoices] = useState<string[]>([]);

  useEffect(() => {
    commands.getVoices()
      .then(result => {
        if (result.status === 'error') {
          console.error(`Failed to load voices, error: ${result.error}`);
          return;
        }
        const data = result.data.filter(voice => voice.includes("Multilingual"));
        setVoices(data);
        console.log("Voices loaded");
      })
  }, [])

  return (
    <GroupWrapper>
      <GroupHeading>General</GroupHeading>
      <SelectProperty label='App theme'
        defaultValue={settings.theme}
        selectItems={AppSettingsSchema.shape.theme.unwrap().options.map(theme => ({
          label: theme,
          value: theme
        }))}
        onChange={value => changeSettingsProperty('theme', value)} />
      <SelectProperty label='Voice'
        defaultValue={settings.voice}
        selectItems={voices.map(voice => ({
          value: voice,
          label: voice
        }))}
        onChange={value => changeSettingsProperty('voice', value)}
        placeholder='Select voice' />
    </GroupWrapper>
  )
}
