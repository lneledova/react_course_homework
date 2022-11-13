import { ActionTypes } from '../constants'

export const actionEditComment = (newComment) => ({
    type: ActionTypes.editComment,
    payload: newComment
})