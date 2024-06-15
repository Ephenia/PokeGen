import '../css/Navigation.css';
import { saveData } from '../components/SaveSystem.jsx';

export function renderNavigation() {
    const navigationPages = ['Energy', 'Gem Forge', 'Settings'];

    return (
        <div>
            {navigationPages.map(page => (
                <button
                    key={page}
                    className={page === saveData.prefs.sel_page ? 'active' : ''}
                    onClick={() => saveData.prefs.sel_page = page}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}
