import {getArticleById} from "./get-article-by-id";

export function getCountOfComments(array, id) {
    const article = getArticleById(array, id)
    if (article === null || article === undefined) {
        return undefined
    }
    return article.commentsCount
}