
import '../css/Energy.css';
import set from 'lodash/set';
import { saveData, setSaveData } from '../components/SaveSystem.jsx';
import ItemTextColor from '../data/ItemTextColor.json';
import { itemCollectionbyName, itemIDToName, itemIDToSrc, itemQuantity, gainItem } from '../methods/item.jsx';
import { randomRangeInteger } from '../methods/random.jsx';
import { updateSaveData } from '../methods/global.jsx';

export function renderEnergy() {
  const gemIDs = itemCollectionbyName('Gem');
  return (
    <>
      <div id={'energy-options'}>
        <button
          onClick={() => {
            updateSaveData('prefs.energy.autoGem', !saveData().prefs.energy.autoGem);
          }}
          style={`border: 2px solid ${saveData().prefs.energy.autoGem ? '#77DD77' : '#FF9999'}`}
        >
          Auto Gem: [{saveData().prefs.energy.autoGem ? 'ON' : 'OFF'}]
        </button>
        <div>
        <label for="bulk-energy-input"><b>{Math.floor(saveData().energy / 10).toLocaleString('en-US')}</b> Gems can be created...</label>
          <input type="range" name="bulk-energy-input" min="0" value="0" max={Math.min(100, Math.floor(saveData().energy / 10))}
            onInput={(e) => {
              //find button
              const button = document.getElementById('bulk--gem-conversion');
              const energyCost = (e.target.value * 10) + (1 * e.target.value);
              saveData().energy < energyCost ? button.disabled = true : button.disabled = false;
              button.setAttribute('gem-src', e.target.value);
              button.setAttribute('energy-src', energyCost);
              button.innerHTML = `${e.target.value} Random Gems (<span class="energy">⚡${energyCost.toLocaleString('en-US')}&nbsp;</span>)`;
            }}
          />
          <button
            id={'bulk--gem-conversion'}
            onClick={(e) => {
              const getEnergyCost = Number(e.target.getAttribute('energy-src'));
              const getGemAmount = Number(e.target.getAttribute('gem-src'));
              if (saveData().energy < getEnergyCost) return;
              updateSaveData('energy', saveData().energy - getEnergyCost);
              console.log(getGemAmount)
              for (let i = 0; i < getGemAmount; i++) {
                const gemID = gemIDs[randomRangeInteger(0, gemIDs.length - 1)];
                gainItem(gemID, 1);
              }
            }}
            disabled={saveData().energy < 10 ||
              Math.floor(saveData().energy / 10) === 0}
          >
            0 Random Gems (<span class="energy">⚡0&nbsp;</span>)
          </button>
        </div>
      </div>
      <div id={'currency-gems'}>
        <For each={gemIDs}>
          {(gemID) => (
            <div className={'gem'}>
              <div className={'gem-container'}>
                <div className={'gem-information'}>
                  <div style={`margin-left: -16px;`} className={'item-container'}>
                    <img
                      src={`./assets/items/gem/${itemIDToSrc(gemID)}.png`}
                    ></img>
                  </div>
                  <div
                    style={`color: rgb(${ItemTextColor[gemID][0]}, ${ItemTextColor[gemID][1]}, ${ItemTextColor[gemID][2]})`}
                    className={'gem-name'}
                  >
                    {itemIDToName(gemID)}
                  </div>
                </div>
                <div>
                  {itemQuantity(gemID).toLocaleString('en-US')}
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}