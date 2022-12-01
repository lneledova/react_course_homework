export function sortByDateDec(array) {
    if (array === null || array === undefined) {
        return undefined
    }
    if (!(typeof array[Symbol.iterator] === 'function')) {
        return undefined
    }
    return array.sort((o1, o2) => {
        return new Date(o2.createdAt) -  new Date(o1.createdAt)
    })
}

export function sortByDateInc(array) {
    if (array === null || array === undefined) {
        return undefined
    }
    if (!(typeof array[Symbol.iterator] === 'function')) {
        return undefined
    }
    return array.sort((o1, o2) => {
        return new Date(o1.createdAt) -  new Date(o2.createdAt)
    })
}