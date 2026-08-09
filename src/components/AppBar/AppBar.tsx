import { APP_BAR_ACTIONS_ID } from "./consts";
import Navigation from "../Navigation/Navigation";
import './AppBar.scss';
import TitleBarActions from "./TitleBarActions";

export default function () {
  return (
    <header data-tauri-drag-region="deep" className="app-bar">
      <Navigation data-tauri-drag-region="false" />
      <div className="w-full h-full" id={APP_BAR_ACTIONS_ID} />
      <TitleBarActions data-tauri-drag-region="false" />
    </header>
  )
}
