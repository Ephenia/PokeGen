import { saveData, setSaveData } from '../components/SaveSystem.jsx';
import { itemCollectionbyName, gainItem } from '../methods/item.jsx';
import { randomRangeInteger } from '../methods/random.jsx';

export function startEnergyInterval() {
  setInterval(() => {
    const gemIDs = itemCollectionbyName('Gem');
    setSaveData(prev => ({
      ...prev,
      energy: prev.energy + 1
    }));
    if (saveData().prefs.energy.autoGem && saveData().energy >= 10) {
      setSaveData(prev => ({
        ...prev,
        energy: prev.energy - 10
      }));
      const gemID = gemIDs[randomRangeInteger(0, gemIDs.length - 1)];
      gainItem(gemID, 1);
    }
  }, 1000);
}
