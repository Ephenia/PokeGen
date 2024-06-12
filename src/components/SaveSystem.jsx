import DefaultSaveData from '../data/DefaultSaveData.json';
import localforage from "localforage";
import { renderApp } from '../../main.jsx';

localforage.config({
    driver: localforage.LOCALSTORAGE,
    name: "PokeGen",
    version: 1.0,
    size: 500000000,
    storeName: "keyvaluepairs",
    description: "A save system for PokeGen.",
});

// Define your saveData object
let saveData = DefaultSaveData;

(async () => {
    console.log("Loading save data...");
    const fetchSaveData = await loadData();
    if (!fetchSaveData) {
        console.log("Save data not found. Creating new save data...");
    } else {
        console.log("Save data found. Loading save data...");
        saveData = fetchSaveData;
    }
    console.info("Save data:", saveData);
    await checkVersion();
    await setProxy();
    renderApp();
})();

async function loadData() {
    try {
        const value = await localforage.getItem('PokeGen');
        return value;
    } catch (err) {
        console.log(err);
    }
}

async function saveGame() {
    try {
        await localforage.setItem('PokeGen', saveData);
        //console.log("Save data updated successfully:", saveData);
    } catch (err) {
        console.log(err);
    }
}

async function checkVersion() {
    if (!saveData.hasOwnProperty('version') || saveData.version !== DefaultSaveData.version) {
        console.log("Save data version is outdated. Resetting save data...");
        saveData = DefaultSaveData;
    }
}

export async function clearSaveData() {
    try {
        await localforage.clear();
        console.log('Storage cleared successfully');
        setTimeout(() => location.reload(), 0);
    } catch (err) {
        console.error('Error clearing storage:', err);
    }
}

// Function to debounce rendering
function debounce(func, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function to handle changes to saveData
const handleSaveDataChange = debounce(async() => {
    await saveGame(); 
    renderApp();
}, 0); // Adjust the debounce delay as needed

let proxy;

// Proxy handler with debouncing
let handler = {
    get: function (target, property, receiver) {
        const value = Reflect.get(target, property, receiver);
        if (typeof value === 'object' && value !== null) {
            return new Proxy(value, handler); // Create a new proxy for nested objects
        } else {
            //console.log(`Getting ${property}:`, value);
            return value;
        }
    },
    set: function (target, property, value, receiver) {
        //console.log(`Setting ${property} to ${value}`);
        handleSaveDataChange();
        return Reflect.set(target, property, value, receiver);
    }
};

async function setProxy() {
    proxy = new Proxy(saveData, handler);
}

// Export the proxy instead of the original saveData object
export { proxy as saveData };