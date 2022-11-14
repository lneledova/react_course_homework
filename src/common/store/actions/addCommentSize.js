import { ActionTypes } from '../constants'

export const actionAddCommentCount = (newCommentCount, articleId) => ({
    type: ActionTypes.changeCommentCount,
    payload: { newCommentCount, articleId }
})