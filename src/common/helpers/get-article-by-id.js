export function getArticleById(array, id) {
    if (array === null || array === undefined) {
        return undefined
    }
    if (!(typeof array[Symbol.iterator] === 'function')) {
        return undefined
    }
    if (id === null || id === undefined) {
        return undefined
    }
    return array.filter(({articleId}) => articleId === id.toString())[0]
}