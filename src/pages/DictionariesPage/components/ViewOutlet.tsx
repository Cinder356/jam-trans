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

import { useDictionariesView } from "../hooks/useDictionariesView"
import EditorView from "./EditorView/EditorView";
import FlashcardsView from "./FlashcardsView/FlashcardsView";
import ListView from "./ListView/ListView";


export default () => {
  const { currentView } = useDictionariesView();

  let ViewComponent = ListView;
  switch (currentView) {
    case 'editor':
      ViewComponent = EditorView;
      break;
    case 'flashcards':
      ViewComponent = FlashcardsView;
      break;
  }

  return < ViewComponent />
}
