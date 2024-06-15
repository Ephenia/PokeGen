import '../css/Energy.css';
import ColorThief from 'colorthief';
import ItemTextColor from '../data/ItemTextColor.json';
import { saveData } from './SaveSystem.jsx';
import { itemCollectionbyName, itemIDToName, itemIDToSrc, itemQuantity, gainItem } from '../methods/item.jsx';
import { randomRangeInteger } from '../methods/random.jsx';

export function renderEnergy() {
    const energy = saveData.energy;
    const gemIDs = itemCollectionbyName('Gem');
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        saveData.prefs.autoGem = !saveData.prefs.autoGem
                    }}
                    style={`border: 2px solid ${saveData.prefs.autoGem ? '#77DD77' : '#FF9999'}`}
                >
                    Auto Gem: [{saveData.prefs.autoGem ? 'ON' : 'OFF'}]
                </button>
            </div>
            <div id={'currency-gems'}>
                {gemIDs.map(gemID => {
                    return <div
                        key={gemID}
                        className={'gem'}
                        // onClick={() => {
                        //     if (saveData.prefs.gemConversion[1] !== gemID) {
                        //         saveData.prefs.gemConversion[0] = gemID;
                        //     }
                        // }}
                        // onContextMenu={(e) => {
                        //     e.preventDefault();
                        //     if (saveData.prefs.gemConversion[0] !== gemID) {
                        //         saveData.prefs.gemConversion[1] = gemID;
                        //     }
                        // }}
                    >
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
                                    {itemIDToName(gemID)}</div>
                            </div>
                            <div>{itemQuantity(gemID).toLocaleString('en-US')}</div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

setInterval(() => {
    saveData.energy++;
    if (saveData.prefs.autoGem && saveData.energy >= 10) {
        saveData.energy -= 10;
        const gemIDs = itemCollectionbyName('Gem');
        const randomGem = gemIDs[randomRangeInteger(0, gemIDs.length - 1)];
        gainItem(randomGem);
    }
}, 1000)