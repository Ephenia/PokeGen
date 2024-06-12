import './src/css/Style.css';
import "hacktimer/HackTimer.min";
import { render } from 'inferno';
import { clearSaveData } from './src/components/SaveSystem.jsx';
import { renderCurrency } from './src/components/Currency.jsx';
import { renderForge } from './src/components/Forge.jsx';

export function renderApp() {
  render(
    <main id="app">
      <button
        style={`position: absolute; top: 10px; right: 10px;`}
        onClick={() => clearSaveData()}>
        Clear Data
      </button>
      {renderCurrency()}
      {renderForge()}
    </main>,
    document.body // Make sure the comma is here
  );
}