import '../css/Settings.css';
import { saveData, setSaveData, clearSaveData } from '../components/SaveSystem.jsx';

export function renderSettings() {
  return (
    <>
      <button
        onClick={(event) => {
          event.target.setAttribute('style', 'border: 2px solid #FF9999; color: #FF9999;');
          event.target.setAttribute('data-delete', 'true');
          event.target.textContent = 'Right Click to clear your data';
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          event.target.getAttribute('data-delete') ? clearSaveData() : null;
        }}
      >
        Clear Data
      </button>
    </>
  )
}