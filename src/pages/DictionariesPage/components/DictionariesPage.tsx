import DictionariesBarActions from "./DictionariesBarActions"
import { DictionariesViewProvider } from "../contexts/DictionariesViewContext"
import ViewOutlet from "./ViewOutlet"
import ActionButton from "./ActionButton"

export default () => {
  return (
    <DictionariesViewProvider>
      <DictionariesBarActions />
      <ViewOutlet />
      <ActionButton />
    </DictionariesViewProvider>
  )
}
