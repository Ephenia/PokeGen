import '../css/Settings.css';
import { saveData, clearSaveData } from '../components/SaveSystem.jsx';

export function renderSettings() {
    return (
        <>
            <button
                onClick={() => clearSaveData()}>
                Clear Data
            </button>
        </>
    )
}