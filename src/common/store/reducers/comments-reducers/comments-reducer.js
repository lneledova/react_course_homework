import { initialState } from '../../model/initialState'
import { ActionTypes } from '../../constants'
import {sortByDateDec, sortByDateInc} from "../../../helpers/sort-by-date";
import {sortByLikesDec, sortByLikesInc} from "../../../helpers/sort-by-likes";

export const commentsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.addComment: {
            const id = action.payload.articleId
            const targetArticle = state.articles.filter(({articleId}) => articleId.toString() === id)
            if (!targetArticle || targetArticle.length > 1) {
                return state
            }

            return {
                ...state,
                comments: [...state.comments, action.payload],
            }
        }
        case ActionTypes.editComment: {
            const id = action.payload.commentId
            const targetComment = state.comments.filter(({commentId}) => commentId === id)
            if (!targetComment || targetComment.length > 1) {
                return state
            }
            return {
                ...state,
                comments: [
                    ...state.comments.filter(({commentId}) => commentId !== id),
                    {
                        ...action.payload
                    }
                ]
            }
        }
        case ActionTypes.deleteComment: {
            const id = action.payload
            const targetComment = state.comments.filter(({commentId}) => commentId === id)
            if (!targetComment || targetComment.length > 1) {
                return state
            }
            console.log("comments in store")
            console.log(state.comments)
            return {
                ...state,
                comments: [...state.comments.filter(({commentId}) => commentId !== id)]
            }
        }
        case ActionTypes.sortCommentsDecDate: {
            return {
                ...state,
                comments: sortByDateDec(state.comments)
            }
        }
        case ActionTypes.sortCommentsAscDate: {
            return {
                ...state,
                comments: sortByDateInc(state.comments)
            }
        }
        case ActionTypes.sortCommentsDecLike: {
            return {
                ...state,
                comments: sortByLikesDec(state.comments)
            }
        }
        case ActionTypes.sortCommentsAscLike: {
            return {
                ...state,
                comments: sortByLikesInc(state.comments)
            }
        }
        default: {
            return state
        }
    }
}