import React, {useState, useEffect} from 'react'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import { Routes, Route, Navigate } from 'react-router-dom'

import s from './App.module.scss';


import {rootReducer} from './common/store/reducers/root-reducer.js'
import ArticlesPage from "./pages/articles.page";
import {HomePage} from "./pages/home.page";
import {NotFoundPage} from "./pages/notFound.page";
import ArticlePage from "./pages/article.page";

const actionFireLogger = ({}) => (next) => (action) => {
    console.log(`action [${action.type}] was fired with payload: ${JSON.stringify(action.payload)}`)
    return next(action)
}

const middlewareEnhancer = applyMiddleware(actionFireLogger)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

const store = createStore(rootReducer, composedEnhancers)

export function App() {


    return (
        <Provider store={store}>
            <Routes>
                <Route path='/'>
                    <Route index path='/' element={<HomePage/>}/>
                    <Route path='/articles' element={<ArticlesPage/>}/>
                    <Route path='/articles/:articleId' element={<ArticlePage/>}/>
                    <Route path="*" element={<NotFoundPage/>} />
                </Route>
            </Routes>
        </Provider>
    );
}

export default App;