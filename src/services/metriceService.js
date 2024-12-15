import { getArraySum } from '../utils.js';
import { TBODY_DATA, TFOOT_DATA } from "../constants.js";  

function getTotalList(store, rawData) {
    const totalList = rawData.map(obj => {
        return Object.keys(obj).reduce((acc, key) => acc + obj[key] * store.prices[key], 0);
    });
    return totalList;
}

function getMetricesList(store) {
    const rawData = Object.values(store.data).map(([_, value]) => value);
    const objOfProductAmount = Object.fromEntries(
        Object.keys(store.prices)
            .map(product => [product, []])
        );

    rawData.forEach(data => {
        Object.keys(data).forEach(key => objOfProductAmount[key].push(data[key]));
    });

    objOfProductAmount[TFOOT_DATA.metrices.total] = getTotalList(store, rawData);

    return objOfProductAmount;
}

function getMetrice(list, type) {
    function func(fn) {
        const entries = Object.entries(list).map(([key, arr]) => [key, fn(arr)]);
        return Object.fromEntries(entries);
    }

    switch (type) {
        case 'total': {
            return func(getArraySum);
        };
        case 'max': {
            return func((arr) => Math.max(...arr));
        };
        case 'average': {
            return func((arr) => Number((getArraySum(arr) / arr.length).toFixed(TBODY_DATA.roundDigits)));
        };
        default: return;
    }
}

export function getMetricesAll(store) {
    const list = getMetricesList(store);
    const entries = Object.keys(TFOOT_DATA.metrices).map(key => [key, getMetrice(list, key)]);
    return Object.fromEntries(entries);
}
