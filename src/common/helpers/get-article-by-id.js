export function getArticleById(array, id) {
    return array.filter(({articleId}) => articleId.toString() === id)[0]
}