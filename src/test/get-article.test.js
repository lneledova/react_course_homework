import { getArticleById } from '../common/helpers/get-article-by-id';
import article from '../assets/articles.json'

describe('get-article-by-id', () => {
    test('should be defined s a function', () => {
        expect(getArticleById).toBeInstanceOf(Function)
    })

    test('return undefined when it received null array', () => {
        expect(getArticleById(null, null)).toBeUndefined()
    })

    test('return undefined when it received undefined array', () => {
        expect(getArticleById(undefined, null)).toBeUndefined()
    })

    test('return undefined when array are not iterable', () => {
        expect(getArticleById(1, 1)).toBeUndefined()
    })

    test('return undefined when values does not contain articleId', () => {
        expect(getArticleById([1], 1)).toBeUndefined()
    })

    test('return undefined when it received null id', () => {
        expect(getArticleById(article, null)).toBeUndefined()
    })

    test('return undefined when it received undefined id', () => {
        expect(getArticleById(article, undefined)).toBeUndefined()
    })

    test('return undefined when it received non-contains id', () => {
        expect(getArticleById(article, 100)).toBeUndefined()
    })

    test('return article when received correct id', () => {
        expect(getArticleById(article, "16")).toEqual({
            "articleId": "16",
            "title": "Real article",
            "text": "Real text for real article",
            "currentLikes": 11,
            "commentsCount": 1,
            "createdAt": "2007-09-01"
        })
    })

    test('return article when received correct id even not string', () => {
        expect(getArticleById(article, 16)).toEqual({
            "articleId": "16",
            "title": "Real article",
            "text": "Real text for real article",
            "currentLikes": 11,
            "commentsCount": 1,
            "createdAt": "2007-09-01"
        })
    })

})