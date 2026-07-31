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
