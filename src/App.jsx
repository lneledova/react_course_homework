import React, {useState, useEffect} from 'react'

import s from './App.module.scss';

import {getArticles} from './loaders_data/get-articles.js'

import {Card} from "./components/card/card";

export function App() {
    const [articles, setArticles] = useState(null)
    const [sorted, setSorted] = useState(0)
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
        const date = new Date()
        const currDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
        setArticle({
            ...article,
            createdAt: currDate,
            articleId: article.articleId + 1
        })
        const newArticle = {
            ...article,
            createdAt: currDate
        }
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

    const sortDateIncCards = () => {
        articles.sort((o1, o2) => {
            return new Date(o1.createdAt) -  new Date(o2.createdAt)
        })
        setSorted(sorted + 1)
    }

    const sortDateDecCards = () => {
        articles.sort((o1, o2) => {
            return new Date(o2.createdAt) -  new Date(o1.createdAt)
        })
        setSorted(sorted + 1)
    }

    const sortLikeIncCards = () => {
        articles.sort((o1, o2) => {
            return new Date(o1.currentLikes) -  new Date(o2.currentLikes)
        })
        setSorted(sorted + 1)
    }

    const sortLikeDecCards = () => {
        articles.sort((o1, o2) => {
            return new Date(o2.currentLikes) -  new Date(o1.currentLikes)
        })
        setSorted(sorted + 1)
    }



    return (
        <>
            {articles ?
                <div className={s.App}>

                    <h2>Select sorting method for cards:</h2>
                    <h3>
                        <div>
                            <input type="radio" onChange={sortDateIncCards} name="sort" />
                                <label>By date increasing</label>

                                <input type="radio" onChange={sortDateDecCards} name="sort"/>
                                    <label>By date decreasing</label>
                                <br></br>

                                <input type="radio" onChange={sortLikeIncCards} name="sort"/>
                                <label>By likes increasing</label>

                                <input type="radio" onChange={sortLikeDecCards} name="sort"/>
                                <label>By likes decreasing</label>
                        </div>
                    </h3>

                    <div>
                        {articles.map(item =>
                            <div key={item.articleId}>
                                <Card
                                    articleId={item.articleId}
                                    title={item.title}
                                    text={item.text}
                                    currentLikes={item.currentLikes}
                                    commentsCount={item.commentsCount}
                                    createdAt={item.createdAt}
                                />
                            </div>)}
                    </div>

                </div>
                :
                <div className={s.loadingPage}>
                    Loading articles...
                </div>
            }

            <div className={s.formAddArticle}>
                <div className={s.headerForm}>Write your own article</div>
                <input className={s.titleInput} type="text" value={article.title} onChange={setTitle} placeholder="Your title" />
                <textarea className={s.textInput} placeholder="Your text of article" value={article.text} onChange={setText} />
                <div className={s.addButton} onClick={addArticle}>Add</div>
            </div>
        </>
    );
}

export default App;