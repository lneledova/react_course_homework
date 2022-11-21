import { initialState } from '../../model/initialState'
import { ActionTypes } from '../../constants'
import {sortByDateDec, sortByDateInc} from '../../../helpers/sort-by-date';
import {sortByLikesDec, sortByLikesInc} from '../../../helpers/sort-by-likes';

export const articlesReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.addArticle: {
            return {
                ...state,
                articles: [...state.articles, action.payload],
            }
        }
        case ActionTypes.changeCommentCount: {
            const id = action.payload.articleId
            const targetArticle = state.articles.filter(({articleId}) => articleId.toString() === id)
            if (!targetArticle || targetArticle.length > 1) {
                return state
            }
            return {
                articles: [
                    ...state.articles.filter(({articleId}) => articleId.toString() !== id),
                    {
                        ...targetArticle[0],
                        commentsCount: action.payload.newCommentCount,
                    },
                ]
            }
        }
        case ActionTypes.editArticle: {
            const id = action.payload.articleId
            const targetArticle = state.articles.filter(({articleId}) => articleId.toString() === id)
            if (!targetArticle || targetArticle.length > 1) {
                return state
            }
            return {
                ...state,
                articles: [
                    ...state.articles.filter(({articleId}) => articleId.toString() !== id),
                    {
                        ...action.payload
                    }
                ]
            }
        }
        case ActionTypes.sortArticlesDecDate: {
            return {
                ...state,
                articles: sortByDateDec(state.articles)
            }
        }
        case ActionTypes.sortArticlesAscDate: {
            return {
                ...state,
                articles: sortByDateInc(state.articles)
            }
        }
        case ActionTypes.sortArticlesDecLike: {
            return {
                ...state,
                articles: sortByLikesDec(state.articles)
            }
        }
        case ActionTypes.sortArticlesAscLike: {
            return {
                ...state,
                articles: sortByLikesInc(state.articles)
            }
        }
        default: {
            return state
        }
    }
}