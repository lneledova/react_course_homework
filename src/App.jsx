import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'



import { rootReducer } from './common/store/reducers/root-reducer.js'
import { ArticlesPage } from './pages/articles.page';
import { HomePage } from './pages/home.page';
import { NotFoundPage } from './pages/notFound.page';
import { ArticlePage } from './pages/article.page';

const actionFireLogger = ({}) => (next) => (action) => {
    console.group();
    console.log(`action [${action.type}] was fired with payload:`)
    console.log(action.payload)
    console.groupEnd();
    return next(action)
}

const store = createStore(rootReducer, applyMiddleware(actionFireLogger))

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