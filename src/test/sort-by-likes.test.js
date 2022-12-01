import { sortByLikesInc} from '../common/helpers/sort-by-likes';
import { sortByLikesDec } from '../common/helpers/sort-by-likes';

const articles = [
    {
        "articleId": "11",
        "currentLikes": 2
    },
    {
        "articleId": "5",
        "currentLikes": 8
    },
    {
        "articleId": "72",
        "currentLikes": 5
    }
]

const sortedIncArticles = [
    {
        "articleId": "11",
        "currentLikes": 2
    },
    {
        "articleId": "72",
        "currentLikes": 5
    },
    {
        "articleId": "5",
        "currentLikes": 8
    }
]

const incorrectArticles = [
    {
        "currentLikes": "avd"
    },
    {
        "articleId": "72"
    },
    {
        "articleId": "5",
        "currentLikes": 5
    }
]

const lonelyArticle = {
    "articleId": "72",
    "title": "Me",
    "currentLikes": 9999
}

describe('sort-articles-by-likes-increasing', () => {
    test('should be defined s a function', () => {
        expect(sortByLikesInc).toBeInstanceOf(Function)
    })

    test('return undefined when it received null array', () => {
        expect(sortByLikesInc(null)).toBeUndefined()
    })

    test('return undefined when it received undefined array', () => {
        expect(sortByLikesInc(undefined)).toBeUndefined()
    })

    test('return undefined when array are not iterable', () => {
        expect(sortByLikesInc(lonelyArticle)).toBeUndefined()
    })

    test('do nothing when values does not contain createdAt', () => {
        expect(sortByLikesInc([1])).toEqual([1])
    })

    test('do nothing when incorrect articles', () => {
        expect(sortByLikesInc(incorrectArticles)).toEqual(incorrectArticles)
    })

    test('sort articles correct', () => {
        expect(sortByLikesInc(articles)).toEqual(sortedIncArticles)
    })

    test('sort one article correct', () => {
        expect(sortByLikesInc([lonelyArticle])).toEqual([lonelyArticle])
    })
})

const sortedDecArticles = [
    {
        "articleId": "5",
        "currentLikes": 8
    },
    {
        "articleId": "72",
        "currentLikes": 5
    },
    {
        "articleId": "11",
        "currentLikes": 2
    }
]

describe('sort-articles-by-likes-decreasing', () => {
    test('should be defined s a function', () => {
        expect(sortByLikesDec).toBeInstanceOf(Function)
    })

    test('return undefined when it received null array', () => {
        expect(sortByLikesDec(null)).toBeUndefined()
    })

    test('return undefined when it received undefined array', () => {
        expect(sortByLikesDec(undefined)).toBeUndefined()
    })

    test('return undefined when array are not iterable', () => {
        expect(sortByLikesDec(lonelyArticle)).toBeUndefined()
    })

    test('do nothing when values does not contain createdAt', () => {
        expect(sortByLikesDec([1])).toEqual([1])
    })

    test('sort articles correct', () => {
        expect(sortByLikesDec(articles)).toEqual(sortedDecArticles)
    })

    test('sort one article correct', () => {
        expect(sortByLikesDec([lonelyArticle])).toEqual([lonelyArticle])
    })
})