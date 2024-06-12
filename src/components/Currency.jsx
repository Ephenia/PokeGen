import '../css/Currency.css';
import { saveData, clearSaveData } from '../components/SaveSystem.jsx';
import { itemCollectionbyName, itemIDToName, itemIDToSrc, itemQuantity, gainItem } from '../methods/item.jsx';
import { randomRangeInteger } from '../methods/random.jsx';

export function renderCurrency() {
    const energy = saveData.energy;
    const gemIDs = itemCollectionbyName('Gem');
    return (
        <div id={'currency'}>
            <div>
                <button
                    onClick={() => {
                        clearSaveData();
                    }}>
                    ⚡{energy.toLocaleString('en-US')}&nbsp;
                </button>
            </div>
            <div id={'currency-gems'}>
                {gemIDs.map(gemID => {
                    return <div
                        key={gemID}
                        className={'gem'}
                    >
                        <div className={'gem-container'}>
                            <div className={'gem-information'}>
                                <div className={'item-container'}>
                                    <img src={`./assets/items/gem/${itemIDToSrc(gemID)}.png`}></img>
                                </div>
                                <div className={'gem-name'}>{itemIDToName(gemID)}</div>
                            </div>
                            <div>{itemQuantity(gemID).toLocaleString('en-US')}</div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

setInterval(() => {
    saveData.energy++;
    if (saveData.energy >= 10) {
        saveData.energy -= 10;
        const gemIDs = itemCollectionbyName('Gem');
        const randomGem = gemIDs[randomRangeInteger(0, gemIDs.length - 1)];
        gainItem(randomGem);
    }
}, 1000)