import DefaultSaveData from '../data/DefaultSaveData.json';
import localforage from 'localforage';
import { createSignal, createEffect } from 'solid-js';
import { updateSaveData } from '../methods/global';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: "PokeGen",
  version: 1.0,
  size: 50000000,
  storeName: "keyvaluepairs",
  description: "A save system for PokeGen.",
});

console.warn = () => { };

const [saveData, setSaveData] = createSignal(DefaultSaveData);

createEffect(() => {
  const loadInitialSaveData = async () => {
    try {
      const loadedData = await localforage.getItem('PokeGen');
      if (loadedData) {
        setSaveData(loadedData);
      }
    } catch (err) {
      console.log('Error loading save data:', err);
    }
  };
  loadInitialSaveData();
});

createEffect(() => {
  const saveGameData = async () => {
    try {
      await localforage.setItem('PokeGen', saveData());
    } catch (err) {
      console.log('Error saving game data:', err);
    }
  };
  saveGameData();
}, [saveData]);

export async function clearSaveData() {
  try {
    await localforage.clear();
    console.log('Clearing save data...');
    location.reload();
  } catch (err) {
    console.log('Error clearing save data:', err);
  }
}

export { saveData, setSaveData };