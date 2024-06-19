import '../css/Page.css';
import { createEffect } from 'solid-js';
import { saveData, setSaveData } from '../components/SaveSystem.jsx';
import { renderEnergy } from '../components/Energy.jsx';
import { renderGemForge } from '../components/GemForge.jsx';
import { renderSettings } from '../components/Settings.jsx';

export default function RenderPage() {
  return (
    <div id="page" className={`Page-${saveData().prefs.sel_page.replace(' ', '-')}`}>
      {saveData().prefs.sel_page === 'Energy' && renderEnergy()}
      {saveData().prefs.sel_page === 'Gem Forge' && renderGemForge()}
      {saveData().prefs.sel_page === 'Settings' && renderSettings()}
    </div>
  );
}
