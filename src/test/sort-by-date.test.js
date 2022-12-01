import { sortByDateInc } from '../common/helpers/sort-by-date';
import { sortByDateDec } from '../common/helpers/sort-by-date';

const articles = [
    {
        "articleId": "11",
        "createdAt": "2021-01-01"
    },
    {
        "articleId": "5",
        "createdAt": "2022-02-22"
    },
    {
        "articleId": "72",
        "createdAt": "2001-04-20"
    }
]

const sortedIncArticles = [
    {
        "articleId": "72",
        "createdAt": "2001-04-20"
    },
    {
        "articleId": "11",
        "createdAt": "2021-01-01"
    },
    {
        "articleId": "5",
        "createdAt": "2022-02-22"
    }
]

const incorrectArticles = [
    {
        "articleId": "72",
        "createdAt": "str"
    },
    {
        "articleId": "11",
        "createdAt": "2021-01-01"
    },
    {
        "articleId": "5"
    }
]

const lonelyArticle = {
    "articleId": "72",
    "title": "Me",
    "createdAt": "2001-04-20"
}

describe('sort-articles-by-date-increasing', () => {
    test('should be defined s a function', () => {
        expect(sortByDateInc).toBeInstanceOf(Function)
    })

    test('return undefined when it received null array', () => {
        expect(sortByDateInc(null)).toBeUndefined()
    })

    test('return undefined when it received undefined array', () => {
        expect(sortByDateInc(undefined)).toBeUndefined()
    })

    test('return undefined when array are not iterable', () => {
        expect(sortByDateInc(lonelyArticle)).toBeUndefined()
    })

    test('do nothing when values does not contain createdAt', () => {
        expect(sortByDateInc([1])).toEqual([1])
    })

    test('do not sort incorrect articles', () => {
        expect(sortByDateInc(incorrectArticles)).toEqual(incorrectArticles)
    })

    test('sort articles correct', () => {
        expect(sortByDateInc(articles)).toEqual(sortedIncArticles)
    })

    test('sort one article correct', () => {
        expect(sortByDateInc([lonelyArticle])).toEqual([lonelyArticle])
    })
})

const sortedDecArticles = [
    {
        "articleId": "5",
        "createdAt": "2022-02-22"
    },
    {
        "articleId": "11",
        "createdAt": "2021-01-01"
    },
    {
        "articleId": "72",
        "createdAt": "2001-04-20"
    },
]

describe('sort-articles-by-date-decreasing', () => {
    test('should be defined s a function', () => {
        expect(sortByDateDec).toBeInstanceOf(Function)
    })

    test('return undefined when it received null array', () => {
        expect(sortByDateDec(null)).toBeUndefined()
    })

    test('return undefined when it received undefined array', () => {
        expect(sortByDateDec(undefined)).toBeUndefined()
    })

    test('return undefined when array are not iterable', () => {
        expect(sortByDateDec(lonelyArticle)).toBeUndefined()
    })

    test('do nothing when values does not contain createdAt', () => {
        expect(sortByDateDec([1])).toEqual([1])
    })

    test('do not sort incorrect articles', () => {
        expect(sortByDateDec(incorrectArticles)).toEqual(incorrectArticles)
    })

    test('sort articles correct', () => {
        expect(sortByDateDec(articles)).toEqual(sortedDecArticles)
    })

    test('sort one article correct', () => {
        expect(sortByDateDec([lonelyArticle])).toEqual([lonelyArticle])
    })
})