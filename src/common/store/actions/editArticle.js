import { ActionTypes } from '../constants'

export const actionEditArticle = (newArticle) => ({
    type: ActionTypes.editArticle,
    payload: newArticle
})