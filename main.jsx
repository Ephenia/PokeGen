import './src/css/Style.css';
import "hacktimer/HackTimer.min";
import { render } from 'inferno';
import { saveData } from './src/components/SaveSystem.jsx';
import { renderCurrency } from './src/components/Currency.jsx';
import { renderContent } from './src/components/Content.jsx';

export function renderApp() {
  render(
    <main id="app">
      {renderCurrency()}
    </main>,
    document.body // Make sure the comma is here
  );
}