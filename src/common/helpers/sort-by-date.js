export function sortByDateDec(array) {
    return array.sort((o1, o2) => {
        return new Date(o2.createdAt) -  new Date(o1.createdAt)
    })
}

export function sortByDateInc(array) {
    return array.sort((o1, o2) => {
        return new Date(o1.createdAt) -  new Date(o2.createdAt)
    })
}