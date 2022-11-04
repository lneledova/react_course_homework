export function sortByDateDec(array) {
    array.sort((o1, o2) => {
        return new Date(o2.createdAt) -  new Date(o1.createdAt)
    })
}

export function sortByDateInc(array) {
    array.sort((o1, o2) => {
        return new Date(o1.createdAt) -  new Date(o2.createdAt)
    })
}