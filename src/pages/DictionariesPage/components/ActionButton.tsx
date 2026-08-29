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

import { Button } from "@/components/ui/button";
import { useDictionariesView } from "../hooks/useDictionariesView";
import { createDictionary } from "@/app/stores/dictionariesStore";


const ActionButton = (): React.ReactNode => {
  const { currentView, openListView, openEditorView } = useDictionariesView();

  const handleNew = async () => {
    const newDict = await createDictionary({ name: 'New Dict' });
    openEditorView(newDict.meta.id);
  }

  const handleAction = async () => {
    if (currentView === 'list') {
      handleNew();
      return;
    }
    openListView();
  }

  const btnText = currentView === 'list' ? 'New' : 'Back';

  return (
    <Button className="fixed right-2 bottom-2 font-bold rounded-lg" variant="outline" size="sm"
      onClick={handleAction}>
      {btnText}
    </Button>
  )
}

export default ActionButton;


{/* {currentView === 'list' && */ }
{/* <Button className="font-bold rounded-lg" variant="outline" size="sm" */ }
{/*   onClick={handleNew}> */ }
{/*   New */ }
{/* </Button> */ }
{/* } */ }
{/**/ }
{/* {currentView !== 'list' && */ }
{/*   <Button className="font-bold rounded-lg" variant="outline" size="sm" */ }
{/*     onClick={() => openListView()}> */ }
{/*     Back */ }
{/*   </Button> */ }
{/* } */ }
