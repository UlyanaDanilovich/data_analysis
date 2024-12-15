import { getArraySum } from '../utils.js';
import { THEAD_DATA, TBODY_DATA, TFOOT_DATA } from "../constants.js";

function getTHeadNames(store) {
    const { amountAbbr, priceAbbr } = THEAD_DATA;
    const theadArray = [];

    theadArray.push(THEAD_DATA.companyName);
    const productMapKeys = Object.keys(store.prices).map(key => `${key.split(' ')[0]}`);
    const sortedKeys = [...productMapKeys, ...productMapKeys]
        .sort()
        .map((str, index) => `${str} ${index % 2 ? priceAbbr : amountAbbr}`);

    theadArray.push(...sortedKeys);
    theadArray.push(THEAD_DATA.total());
    return theadArray;
}

function createTableHead(store, table) {
    store.theadNames = getTHeadNames(store);

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    [...store.theadNames].forEach((title) => {
        const th = document.createElement('th');
        th.innerHTML = title;
        tr.append(th);
    });
    thead.append(tr);
    table.append(thead);
}

function createTableBody(store, table) {
    const { page, pagination, theadNames, data, prices } = store;
    const startIndex = page * pagination;
    const tbody = document.createElement('tbody');
    store.isPageLast = false;

    Array.from({ length: pagination }, (_, i) => {
        if (data[startIndex + i] === undefined) {
            store.isPageLast = true;
            return;
        }

        const tr = document.createElement('tr');
        const totalSumArray = [];
        theadNames.forEach((column, j) => {
            const columnKey = column.split(' ')[0];
            const [rowName, rowObj] = data[startIndex + i];
            // First column
            if (!j) {
                const th = document.createElement('th');
                th.innerHTML = rowName;
                tr.append(th);
                return;
            }

            // Internal column
            const td = document.createElement('td');
            if (rowObj.hasOwnProperty(columnKey)) {
                if (j % 2 === 1) {
                    td.innerHTML = rowObj[columnKey];
                } else {
                    const exactPrice = rowObj[columnKey] * prices[columnKey];
                    td.innerHTML = Number(exactPrice).toFixed(TBODY_DATA.roundDigits);
                    totalSumArray.push(exactPrice);
                }
            } else {
                td.innerHTML = TBODY_DATA.noDataString;
            }

            // Last column
            if (j === theadNames.length - 1) {
                const exactPrice = getArraySum(totalSumArray);
                td.innerHTML = Number(exactPrice).toFixed(TBODY_DATA.roundDigits);
            }

            tr.append(td);    
        });
        tbody.append(tr);
    });
    table.append(tbody);
}

function createTableFoot(store, table) {
    const { theadNames, metrices, prices } = store;
    const tfoot = document.createElement('tfoot');
    const entries = Object.entries(TFOOT_DATA.metrices);

    entries.forEach(([metriceKey, metriceValue]) => {
        const tr = document.createElement('tr');
        theadNames.forEach((column, j) => {
            const columnKey = column.split(' ')[0];
            // First column
            if (!j) {
                const th = document.createElement('th');
                th.innerHTML = metriceValue;
                tr.append(th);
                return;
            }

             // Last column
             if (j === theadNames.length - 1) {
                const td = document.createElement('td');
                const exactPrice = metrices[metriceKey][columnKey];
                td.innerHTML = Number(exactPrice).toFixed(TBODY_DATA.roundDigits);
                tr.append(td);
                return;
            }
            
            // Internal columns
            const td = document.createElement('td');
            if (j % 2 === 1) {
                td.innerHTML = metrices[metriceKey][columnKey];
            } else {
                const exactPrice = metrices[metriceKey][columnKey] * prices[columnKey];
                td.innerHTML = Number(exactPrice).toFixed(TBODY_DATA.roundDigits);
            }

            tr.append(td);    
        });
        tfoot.append(tr);
    });
    table.append(tfoot);
}

export function createTable(store, table) {
    store.isPageLast = null;
    table.innerHTML = '';
    createTableHead(store, table);
    createTableBody(store, table);
    createTableFoot(store, table);
}
