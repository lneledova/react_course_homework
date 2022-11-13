import { initialState } from '../../model/initialState'
import { ActionTypes } from '../../constants'

export const articlesReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.addArticle: {
            return {
                ...state,
                articles: [...state.articles, action.payload],
            }
        }
        default: {
            return state
        }
    }
}