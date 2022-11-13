import { ActionTypes } from '../constants'

export const actionAddComment = (newComment) => ({
    type: ActionTypes.addComment,
    payload: newComment
})