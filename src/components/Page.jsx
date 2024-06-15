import '../css/Page.css';
import { saveData } from '../components/SaveSystem.jsx';
import { renderEnergy } from '../components/Energy.jsx';
import { renderGemForge } from '../components/GemForge.jsx';
import { renderSettings } from '../components/Settings.jsx';

export function renderPage() {
    const selPage = saveData.prefs.sel_page;
    const renderFunctions = {
        ["Energy"]: renderEnergy,
        ["Gem Forge"]: renderGemForge,
        ["Settings"]: renderSettings,
    };

    return (
        <div id="page" className={`Page-${selPage.replace(' ', '-')}`}>
            {renderFunctions[selPage]?.()}
        </div>
    );
}