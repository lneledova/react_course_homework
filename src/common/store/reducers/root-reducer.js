import { combineReducers } from 'redux'
import { commentsReducer } from "./comments-reducers/comments-reducer";
import { articlesReducer } from "./articles-reducers/articles-reducer";

export const rootReducer = combineReducers({
    commentsReducer,
    articlesReducer,
})