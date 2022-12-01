export function sortByLikesInc(array) {
    if (array === null || array === undefined) {
        return undefined
    }
    if (!(typeof array[Symbol.iterator] === 'function')) {
        return undefined
    }
    return array.sort((o1, o2) => {
        return o1.currentLikes - o2.currentLikes
    })
}

export function sortByLikesDec(array) {
    if (array === null || array === undefined) {
        return undefined
    }
    if (!(typeof array[Symbol.iterator] === 'function')) {
        return undefined
    }
    return array.sort((o1, o2) => {
        return o2.currentLikes - o1.currentLikes
    })
}