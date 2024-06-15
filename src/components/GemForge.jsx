import '../css/GemForge.css';
import ItemTextColor from '../data/ItemTextColor.json';
import { saveData } from './SaveSystem.jsx';
import { itemIDToSrc, itemQuantity, loseItem, gainItem, itemCollectionbyName, itemIDToName } from '../methods/item.jsx';
import { randomRangeInteger } from '../methods/random';

export function renderGemForge() {
    const gemForge = saveData.prefs.gemForge;
    const gemIDs = itemCollectionbyName('Gem');
    gemForge.unstableGemID = gemForge.unstableGemID ? gemForge.unstableGemID : gemIDs[0];

    return (
        <>
            <div id={'stable-gem-conversion'} className={'gem-forge-container'}>
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
                        <button className={'gem-forge-input-gem-btn'}
                            onClick={() => {
                                cycleGem(gemForge.unstableGemID);
                            }}
                        >
                            <div>
                                <div className={'item-container'} style={`margin-left: -16px`}>
                                    <img src={`./assets/items/gem/${itemIDToSrc(gemForge.unstableGemID)}.png`}></img>
                                </div>
                                <div style={`color: rgb(${ItemTextColor[gemForge.unstableGemID][0]}, ${ItemTextColor[gemForge.unstableGemID][1]}, ${ItemTextColor[gemForge.unstableGemID][2]})`}>
                                    {itemIDToName(gemForge.unstableGemID)}
                                </div>
                            </div>
                            <div>{itemQuantity(gemForge.unstableGemID).toLocaleString('en-US')}</div>
                        </button>
                    </div>
                    <div>
                        <div className={'energy'}>⚡10</div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                let tempGems = [...gemIDs];
                                let gemIndex = tempGems.indexOf(gemForge.unstableGemID);
                                gemIndex !== -1 ? tempGems.splice(gemIndex, 1) : null;
                                const randomGemID = randomRangeInteger(0, tempGems.length - 1);
                                saveData.energy -= 10;
                                loseItem(gemForge.unstableGemID);
                                gainItem(tempGems[randomGemID]);
                                saveData.energy += 5;
                            }}
                            disabled={saveData.energy < 10 || itemQuantity(gemForge.unstableGemID) === 0}
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
        </>
    )

    function cycleGem(source) {
        const gemIndex = gemIDs.indexOf(source);
        if (gemIndex === gemIDs.length - 1) {
            gemForge.unstableGemID = gemIDs[0];
        } else {
            gemForge.unstableGemID = gemIDs[gemIndex + 1];
        }
    }
}