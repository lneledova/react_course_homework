import { getCountOfComments } from '../common/helpers/get-count-of-comments';
import article from '../assets/articles.json'

describe('get-count-of-comments', () => {
    test('should be defined s a function', () => {
        expect(getCountOfComments).toBeInstanceOf(Function)
    })

    test('return zero when it received null array', () => {
        expect(getCountOfComments(null, null)).toBeUndefined()
    })

    test('return zero when it received undefined array', () => {
        expect(getCountOfComments(undefined, null)).toBeUndefined()
    })

    test('return zero when array are not iterable', () => {
        expect(getCountOfComments(4, 16)).toBeUndefined()
    })

    test('return zero when values does not contain articleId', () => {
        expect(getCountOfComments([{"id": 0}], 1)).toBeUndefined()
    })

    test('return zero when it received null id', () => {
        expect(getCountOfComments(article, null)).toBeUndefined()
    })

    test('return zero when it received undefined id', () => {
        expect(getCountOfComments(article, undefined)).toBeUndefined()
    })

    test('return zero when it received non-contains id', () => {
        expect(getCountOfComments(article, 100)).toBeUndefined()
    })

    test('return count of comments when received contained id', () => {
        expect(getCountOfComments(article, "16")).toEqual(1)
    })

    test('return count of comments when received contained id even not string', () => {
        expect(getCountOfComments(article, 16)).toEqual(1)
    })

})