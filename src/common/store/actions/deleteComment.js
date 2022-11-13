import { ActionTypes } from '../constants'

export const actionDeleteComment = (id) => ({
    type: ActionTypes.deleteComment,
    payload: id
})