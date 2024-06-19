import '../css/Navigation.css';
import set from 'lodash/set';
import { saveData, setSaveData } from '../components/SaveSystem.jsx';
import { updateSaveData } from '../methods/global.jsx';

export default function Navigation() {
  const navigationPages = ['Energy', 'Gem Forge', 'Settings'];

  return (
    <div id={'navigation'}>
      {navigationPages.map(page => (
        <button
          key={page}
          className={page === saveData().prefs.sel_page ? 'active' : ''}
          onClick={() => {
            updateSaveData('prefs.sel_page', page);
            console.log(saveData());
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}