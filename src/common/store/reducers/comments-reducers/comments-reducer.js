import { initialState } from '../../model/initialState'
import { ActionTypes } from '../../constants'
import comments from "../../../../components/comments/comments";

export const commentsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.addComment: {
            const id = action.payload.articleId
            const targetArticle = state.articles.filter(({articleId}) => articleId.toString() === id)
            if (!targetArticle || targetArticle.length > 1) {
                return state
            }
            console.log("comments")
            console.log(state.comments)
            return {
                articles: [
                    ...state.articles.filter(({articleId}) => articleId.toString() !== id),
                    {
                        ...targetArticle[0],
                        commentsCount: targetArticle[0].commentsCount + 1,
                    },
                ],
                comments: [...state.comments, action.payload],
            }
        }
        case ActionTypes.editComment: {
            const id = action.payload.commentId
            state.comments.filter(({commentId}) => commentId.toString() === id)[0] = {
                ...action.payload
            }
            return state
        }
        case ActionTypes.deleteComment: {
            const id = action.payload
            state.articles.filter(({articleId}) => articleId.toString() === id)[0].commentsCount -= 1;
            return {
                ...state,
                comments: [...state.comments.filter(({commentId}) => commentId.toString() !== id)],
            }
        }
        default: {
            return state
        }
    }
}