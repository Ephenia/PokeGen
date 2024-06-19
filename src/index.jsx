/* @refresh reload */
import './css/index.css';
import "hacktimer/HackTimer.min";
import { render } from 'solid-js/web';
import { createRoot } from 'solid-js';
import { startEnergyInterval } from './intervals/energyInterval.jsx';
import Navigation from './components/Navigation.jsx';
import Page from './components/Page.jsx';
import Resources from './components/Resources.jsx';

function App() {
  return (
    <>
      <main id={`app`}>
        <Navigation />
        <Page />
        <Resources />
      </main>
    </>
  )
}

createRoot(() => <App />);
render(() => <App />, document.body);
startEnergyInterval();

//import App from './App';