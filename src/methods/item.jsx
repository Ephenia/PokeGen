import { saveData, setSaveData } from '../components/SaveSystem.jsx';
import ItemData from '../data/ItemData.json';

export function gainItem(itemID, quantity = 1) {
    checkItemData(itemID);
    setSaveData(prev => ({
        ...prev,
        items: {
            ...prev.items,
            [itemID]: {
                quantity: prev.items[itemID].quantity + quantity
            }
        }
    }))
}

export function loseItem(itemID, quantity = 1) {
    checkItemData(itemID);
    setSaveData(prev => ({
        ...prev,
        items: {
            ...prev.items,
            [itemID]: {
                quantity: prev.items[itemID].quantity - quantity
            }
        }
    }))
}

export function itemQuantity(itemID) {
    let itemQuantity = 0;
    try {
        itemQuantity = saveData().items[itemID].quantity;
    } catch (error) { }
    return itemQuantity;
}

export function itemIDToName(itemID) {
    return ItemData[itemID].name;
}

export function itemIDToSrc(itemID) {
    return ItemData[itemID].src;
}

export function itemCollectionbyName(itemName) {
    const itemIDs = Object.keys(ItemData).filter(key => {
        return Number(ItemData[key].name.includes(itemName));
    });
    return itemIDs;
}

function checkItemData(itemID) {
    const itemExists = saveData().items.hasOwnProperty(itemID);
    if (!itemExists) {
        setSaveData(prev => ({
            ...prev,
            items: {
                ...prev.items,
                [itemID]: {
                    quantity: 0
                }
            }
        }))
    }
}