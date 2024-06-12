import '../css/Forge.css';
import { saveData } from '../components/SaveSystem.jsx';
import { itemIDToSrc, itemQuantity, loseItem, gainItem } from '../methods/item.jsx';

export function renderForge() {
    return (
        <div id={'forge'}>
            <div id={'gem-conversion'}>
                <div className={'item-container'}>
                    {displayGem(0) ? <img src={`./assets/items/gem/${itemIDToSrc(displayGem(0))}.png`}></img> : null}
                </div>
                <div>
                    <div className={'energy'}>⚡10</div>
                    <div>→</div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            saveData.energy -= 10;
                            loseItem(displayGem(0));
                            gainItem(displayGem(1));
                        }}
                        disabled={saveData.energy < 10 || itemQuantity(displayGem(0)) === 0}
                    >Convert</button>
                </div>
                <div className={'item-container'}>
                    {displayGem(1) ? <img src={`./assets/items/gem/${itemIDToSrc(displayGem(1))}.png`}></img> : null}
                </div>
            </div>
        </div>
    )

    function displayGem(slot) {
        const gemID = saveData.prefs.gemConversion[slot];
        return gemID ? gemID : null
    }
}