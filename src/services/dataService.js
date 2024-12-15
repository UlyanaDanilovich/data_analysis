import { getArraySum, getGroupByProperty } from '../utils.js';

export function getValidatedData(data) {
    const isStringValid = (string) => typeof string === 'string' && string.length;
    const isNumberValid = (number) =>  Number.isInteger(number) && number > 0;

    return data.filter(({ company, product, count }) => {
        const isCompanyValid = isStringValid(company);
        const isProductValid = isStringValid(product);
        const isCountValid = isNumberValid(count);
        return isCompanyValid && isProductValid && isCountValid;
    });
}

export function getGroupedData(data) {
    const groupOfCompanies = getGroupByProperty(data, 'company');
    const entries = Object.entries(groupOfCompanies).map(([key, value]) => {
        const groupOfProducts = getGroupByProperty(value, 'product');
        const newValue = Object.entries(groupOfProducts).map(([key, array]) => [
            key.split(' ')[0],
            getArraySum(array, 'count'),
        ]);
        return [key, Object.fromEntries(newValue)];
    });
    return entries;
}
