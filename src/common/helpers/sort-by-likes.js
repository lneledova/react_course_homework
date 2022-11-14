export function sortByLikesInc(array) {
    return array.sort((o1, o2) => {
        return o1.currentLikes -  o2.currentLikes
    })
}

export function sortByLikesDec(array) {
    return array.sort((o1, o2) => {
        return o2.currentLikes -  o1.currentLikes
    })
}