export function getArraySum(array, property) {
    return array.reduce((acc, current) => {
        return acc + (current.hasOwnProperty(property) ? current[property] : current);
    }, 0);
}

export function getGroupByProperty(obj, property) {
    return Object.groupBy(obj, (obj) => obj?.[property]);
}
