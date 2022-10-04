import React, {useState, useEffect} from 'react'

import s from './App.module.css';

import {getArticles} from './loaders_data/get-articles.js'

import {Card} from "./components/card/card";

export function App() {
    const [articles, setArticles] = useState(null)
    const [article, setArticle] = useState({
            articleId: 100,
            title: null,
            text: null,
            currentLikes: 0,
            commentsCount: 0
        }
    )

    useEffect(() => {
        getArticles().then(fetchedArticles => setArticles(fetchedArticles))
    }, [])

    const addArticle = () => {
        setArticle({
            ...article,
            articleId: article.articleId + 1
        })
        const newArticle = {...article}
        setArticles([...articles, newArticle])
    }

    const setTitle = event => {
        const { value } = event.target
        setArticle({
                ...article,
                title: value
            }
        )
    }

    const setText = event => {
        const { value } = event.target
        setArticle({
                ...article,
                text: value
            }
        )
    }

    return (
        <>
            {articles ?
                <div className={s.App}>

                    <div>
                        {articles.map(item => <Card
                            articleId={item.articleId}
                            title={item.title}
                            text={item.text}
                            currentLikes={item.currentLikes}
                            commentsCount={item.commentsCount}
                        />)}
                    </div>

                </div>
                :
                <div className={s.loadingPage}>
                    Loading articles...
                </div>
            }

            <div className={s.formAddComment}>
                <div className={s.headerForm}>Write your own article</div>
                <input className={s.titleInput} type="text" value={article.title} onChange={setTitle} placeholder="Your title" />
                <textarea className={s.textInput} placeholder="Your text of article" value={article.text} onChange={setText} />
                <div className={s.addButton} onClick={addArticle}>Add</div>
            </div>
        </>
    );
}

export default App;