import { saveData } from '../components/SaveSystem.jsx';
import ItemData from '../data/ItemData.json';

export function gainItem(itemID, quantity = 1) {
    checkItemData(itemID);
    saveData.items[itemID].quantity += quantity;
}

export function itemQuantity(itemID) {
    let itemQuantity = 0;
    try {
        itemQuantity = saveData.items[itemID].quantity;
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
    const itemIDs = Object.keys(ItemData).filter(key => ItemData[key].name.includes(itemName));
    return itemIDs;
}

function checkItemData(itemID) {
    const itemExists = saveData.items.hasOwnProperty(itemID);
    if (!itemExists) {
        saveData.items[itemID] = {
            quantity: 0
        };
    }
}