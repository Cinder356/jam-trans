import { APP_BAR_ACTIONS_ID } from "./consts";
import Navigation from "../Navigation/Navigation";
import './AppBar.scss';
import TitleBarActions from "./TitleBarActions";
import { isMacOS } from "@/lib/platform";

export default function () {
  return (
    <header className="app-bar" {...(isMacOS() ? {} : { "data-tauri-drag-region": "deep" })}>
      <Navigation data-tauri-drag-region="false" />
      <div className="w-full h-full" id={APP_BAR_ACTIONS_ID} />
      {!isMacOS() && <TitleBarActions data-tauri-drag-region="false" />}
    </header>
  )
}
