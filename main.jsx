import './src/css/Style.css';
import "hacktimer/HackTimer.min";
import { render } from 'inferno';
import { renderNavigation } from './src/components/Navigation.jsx';
import { renderPage } from './src/components/Page.jsx';
import { renderResources } from './src/components/Resources.jsx';
import { clearSaveData } from './src/components/SaveSystem.jsx';

export function renderApp() {
  render(
    <main id="app">
      {renderNavigation()}
      {renderPage()}
      {renderResources()}
    </main>,
    document.body // Make sure the comma is here
  );
}
// {renderCurrency()}
// {renderForge()}