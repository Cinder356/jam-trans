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

import GroupHeading from './GroupHeading';
import GroupWrapper from './GroupWrapper';
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";
import ShortcutProperty from '../Properties/ShortcutProperty';

export default ({ settings, changeSettingsProperty }: SettingsGroupProps) => {
  return (
    <GroupWrapper>
      <GroupHeading>Shortcuts</GroupHeading>

      <ShortcutProperty id='clear-shortcut-input' label='Clear input field shortcut' defaultValue={settings.clearShortcut}
        onChange={value => changeSettingsProperty('clearShortcut', value)} />
      <ShortcutProperty id='swap-langs-shortcut-input' label='Swap languages shortcut' defaultValue={settings.swapLangsShortcut}
        onChange={value => changeSettingsProperty('swapLangsShortcut', value)} />
      <ShortcutProperty id='apply-correction-shortcut-input' label='Apply correction shortcut' defaultValue={settings.applyCorrectionShortcut}
        onChange={value => changeSettingsProperty('applyCorrectionShortcut', value)} />

      <ShortcutProperty id='prev-flashcard-shortcut-input' label='Previous flashcard shortcut' defaultValue={settings.prevFlashcardShortcut}
        onChange={value => changeSettingsProperty('prevFlashcardShortcut', value)} />
      <ShortcutProperty id='next-flashcard-shortcut-input' label='Next flashcard shortcut' defaultValue={settings.nextFlashcardShortcut}
        onChange={value => changeSettingsProperty('nextFlashcardShortcut', value)} />
      <ShortcutProperty id='flip-flashcard-shortcut-input' label='Flip flashcard shortcut' defaultValue={settings.flipFlashcardShortcut}
        onChange={value => changeSettingsProperty('flipFlashcardShortcut', value)} />

    </GroupWrapper>
  )
}
