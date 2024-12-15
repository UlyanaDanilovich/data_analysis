import { PRODUCT_PRICES, generateData } from './generate.js';
import { getValidatedData, getGroupedData } from './services/dataService.js';
import { createTable } from './services/DOMservice.js';
import { getMetricesAll } from './services/metriceService.js';
import { store } from './constants.js';

const table = document.querySelector('.table');

const back = document.querySelector('.back');
const page = document.querySelector('.page');
const select = document.querySelector('.select');
const forward = document.querySelector('.forward');

const PAGE = 'Page: ';
const RECORDS_N = 300000;
const records = generateData(RECORDS_N);

window.addEventListener('load', () => {
    const validatedData = getValidatedData(records);
    store.data = getGroupedData(validatedData);

    store.prices = Object.fromEntries(
        Object.entries(PRODUCT_PRICES)
            .map(([key, value]) => ([key.split(' ')[0], value]))
    );

    store.metrices = getMetricesAll(store);

    createTable(store, table);
});

select.addEventListener('change', (event) => {
    store.pagination = Number(event.target.value);
    createTable(store, table);
});

back.addEventListener('click', (_event) => {
    forward.classList.remove('disabled');

    if (store.page - 1 === 0) {
        back.classList.add('disabled');
    }

    store.page = store.page - 1;
    page.innerHTML = `${PAGE}${store.page + 1}`;

    createTable(store, table);
});

forward.addEventListener('click', (_event) => {
    back.classList.remove('disabled');
    store.page = store.page + 1;
    page.innerHTML = `${PAGE}${store.page + 1}`;

    createTable(store, table);

    if (store.isPageLast) {
        forward.classList.add('disabled');
    }
});
