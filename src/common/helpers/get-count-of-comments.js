export function getCountOfComments(array, id) {
    return array.filter(({articleId}) => articleId.toString() === id)[0].commentsCount
}