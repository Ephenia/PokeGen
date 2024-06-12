import { Chance } from "chance";

const chance = new Chance();

export function randomRangeInteger(min, max) {
    return chance.integer({ min, max });
}