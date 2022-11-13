import { ActionTypes } from '../constants'

export const actionAddArticle = (newArticle) => ({
    type: ActionTypes.addArticle,
    payload: newArticle
})