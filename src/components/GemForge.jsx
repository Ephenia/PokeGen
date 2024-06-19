import '../css/GemForge.css';
import ItemTextColor from '../data/ItemTextColor.json';
import { onMount, createEffect, on } from 'solid-js';
import { saveData, setSaveData } from '../components/SaveSystem.jsx';
import { itemIDToSrc, itemQuantity, loseItem, gainItem, itemCollectionbyName, itemIDToName } from '../methods/item.jsx';
import { randomRangeInteger } from '../methods/random';
import { updateSaveData } from '../methods/global.jsx';

export function renderGemForge() {
  const gemIDs = itemCollectionbyName('Gem');

  return (
    <>
      <div id={'unstable-gem-conversion'} className={'gem-forge-container'}>
        <div className={'gem-forge-row-top'}>
          Unstable Gem Conversion
        </div>
        <div className={'gem-forge-row-mid'}>
          <div>Input</div>
          <div>Energy Cost</div>
          <div></div>
          <div>Result</div>
        </div>
        <div className={'gem-forge-row-bottom'}>
          <div>
            <button className={'gem-forge-input-output-btn'} style={`padding-top: 0px;`}
              onClick={() => {
                const gemIndex = gemIDs.indexOf(saveData().prefs.gemForge.unstableGemID);
                gemIndex === gemIDs.length - 1 ? updateSaveData('prefs.gemForge.unstableGemID', gemIDs[0]) : updateSaveData('prefs.gemForge.unstableGemID', gemIDs[gemIndex + 1]);
              }}
            >
              <div>
                <div className={'item-container'} style={`margin-left: -16px`}>
                  <img src={`./assets/items/gem/${itemIDToSrc(saveData().prefs.gemForge.unstableGemID)}.png`}></img>
                </div>
                <div style={`color: rgb(${ItemTextColor[saveData().prefs.gemForge.unstableGemID][0]}, ${ItemTextColor[saveData().prefs.gemForge.unstableGemID][1]}, ${ItemTextColor[saveData().prefs.gemForge.unstableGemID][2]})`}>
                  {itemIDToName(saveData().prefs.gemForge.unstableGemID)}
                </div>
              </div>
              <div>{itemQuantity(saveData().prefs.gemForge.unstableGemID).toLocaleString('en-US')}</div>
            </button>
          </div>
          <div>
            <div className={'energy'}>⚡10</div>
          </div>
          <div>
            <button
              onClick={() => {
                let tempGems = [...gemIDs];
                let gemIndex = tempGems.indexOf(saveData().prefs.gemForge.unstableGemID);
                gemIndex !== -1 ? tempGems.splice(gemIndex, 1) : null;
                const randomGemID = randomRangeInteger(0, tempGems.length - 1);
                updateSaveData('energy', saveData().energy - 10);
                loseItem(saveData().prefs.gemForge.unstableGemID);
                gainItem(tempGems[randomGemID]);
                updateSaveData('energy', saveData().energy + 5);
              }}
              disabled={saveData().energy < 10 || itemQuantity(saveData().prefs.gemForge.unstableGemID) === 0}
            >Convert</button>
          </div>
          <div>
            <div className={'gem-forge-reward'}>
              <div className={'item-container'} style={`filter: brightness(0)`}>
                <img src={`./assets/items/gem/normal.png`}></img>
              </div>
              <i>Random Gem</i>
            </div>
            <div className={'energy gem-forge-reward'}>⚡5</div>
          </div>
        </div>
      </div>
      <div id={'stable-gem-conversion'} className={'gem-forge-container'}>
        <div className={'gem-forge-row-top'}>
          Stable Gem Conversion
        </div>
        <div className={'gem-forge-row-mid'}>
          <div>Input</div>
          <div>Energy Cost</div>
          <div></div>
          <div>Result</div>
        </div>
        <div className={'gem-forge-row-bottom'}>
          <div>
            <button className={'gem-forge-input-output-btn'} style={`padding-top: 0px;`}
              onClick={() => {
                const gemIndex = gemIDs.indexOf(saveData().prefs.gemForge.gemConversion[0]);
                gemIndex === gemIDs.length - 1 ? updateSaveData('prefs.gemForge.gemConversion[0]', gemIDs[0]) : updateSaveData('prefs.gemForge.gemConversion[0]', gemIDs[gemIndex + 1])
              }}
            >
              <div>
                <div className={'item-container'} style={`margin-left: -16px`}>
                  <img src={`./assets/items/gem/${itemIDToSrc(saveData().prefs.gemForge.gemConversion[0])}.png`}></img>
                </div>
                <div style={`color: rgb(${ItemTextColor[saveData().prefs.gemForge.gemConversion[0]][0]}, ${ItemTextColor[saveData().prefs.gemForge.gemConversion[0]][1]}, ${ItemTextColor[saveData().prefs.gemForge.gemConversion[0]][2]})`}>
                  {itemIDToName(saveData().prefs.gemForge.gemConversion[0])}
                </div>
              </div>
              <div>{itemQuantity(saveData().prefs.gemForge.gemConversion[0]).toLocaleString('en-US')}</div>
            </button>
          </div>
          <div>
            <div className={'energy'}>⚡100</div>
          </div>
          <div>
            <button
              onClick={() => {
                let tempGems = [...gemIDs];
                let gemIndex = tempGems.indexOf(saveData().prefs.gemForge.gemConversion[0]);
                gemIndex !== -1 ? tempGems.splice(gemIndex, 1) : null;
                updateSaveData('energy', saveData().energy - 100);
                loseItem(saveData().prefs.gemForge.gemConversion[0]);
                gainItem(saveData().prefs.gemForge.gemConversion[1]);
              }}
              disabled={saveData().energy < 100 ||
                itemQuantity(saveData().prefs.gemForge.gemConversion[0]) === 0 ||
                saveData().prefs.gemForge.gemConversion[0] === saveData().prefs.gemForge.gemConversion[1]}
            >Convert</button>
          </div>
          <div>
            <div className={'gem-forge-reward'}>
              <button className={'gem-forge-input-output-btn'}
                onClick={() => {
                  const gemIndex = gemIDs.indexOf(saveData().prefs.gemForge.gemConversion[1]);
                  gemIndex === gemIDs.length - 1 ? updateSaveData('prefs.gemForge.gemConversion[1]', gemIDs[0]) : updateSaveData('prefs.gemForge.gemConversion[1]', gemIDs[gemIndex + 1])
                }}
              >
                <div>
                  <div className={'item-container'} style={`margin-left: -16px`}>
                    <img src={`./assets/items/gem/${itemIDToSrc(saveData().prefs.gemForge.gemConversion[1])}.png`}></img>
                  </div>
                  <div style={`color: rgb(${ItemTextColor[saveData().prefs.gemForge.gemConversion[1]][0]}, ${ItemTextColor[saveData().prefs.gemForge.gemConversion[1]][1]}, ${ItemTextColor[saveData().prefs.gemForge.gemConversion[1]][2]})`}>
                    {itemIDToName(saveData().prefs.gemForge.gemConversion[1])}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}