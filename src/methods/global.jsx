import set from 'lodash/set';
import { saveData, setSaveData } from '../components/SaveSystem.jsx';

export function updateSaveData(path, value) {
  setSaveData(prev => {
    const newData = { ...prev };
    set(newData, path, value);
    return newData;
  });
}