import React, {useState} from 'react'

import s from './cards.module.scss';


import {SmallCard} from '../small_card/smallCard';
import {actionAddArticle} from '../../common/store/actions/addArticle';
import {connect} from 'react-redux';
import {actionSortArticlesDecDate} from '../../common/store/actions/sortArticlesDecDate';
import {actionSortArticlesAscDate} from '../../common/store/actions/sortArticlesAscDate';
import {actionSortArticlesDecLike} from '../../common/store/actions/sortArticlesDecLike';
import {actionSortArticlesAscLike} from '../../common/store/actions/sortArticlesAscLike';


const mapDispatchToProps = (dispatch) => ({
    addArticle: (newArticle) => dispatch(actionAddArticle(newArticle)),
    sortArticlesDecDate: () => dispatch(actionSortArticlesDecDate()),
    sortArticlesAscDate: () => dispatch(actionSortArticlesAscDate()),
    sortArticlesDecLike: () => dispatch(actionSortArticlesDecLike()),
    sortArticlesAscLike: () => dispatch(actionSortArticlesAscLike())
})

const mapStateToProps = (state) => ({
    articles: state.articlesReducer.articles
})

function Cards({
                   articles,
                   addArticle,
                   sortArticlesDecDate,
                   sortArticlesAscDate,
                   sortArticlesDecLike,
                   sortArticlesAscLike,
}) {
    const [sorted, setSorted] = useState(0)
    const [article, setArticle] = useState({
            articleId: 100,
            title: null,
            text: null,
            currentLikes: 0,
            commentsCount: 0,
            createdAt: "",
        }
    )


    const addArticleHandler = () => {
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
        addArticle(newArticle)
    }

    const setTitle = event => {
        const {value} = event.target
        setArticle({
                ...article,
                title: value
            }
        )
    }

    const setText = event => {
        const {value} = event.target
        setArticle({
                ...article,
                text: value
            }
        )
    }

    const sortDateIncCards = () => {
        sortArticlesAscDate()
        setSorted(sorted + 1)
    }

    const sortDateDecCards = () => {
        sortArticlesDecDate()
        setSorted(sorted + 1)
    }

    const sortLikeIncCards = () => {
        sortArticlesAscLike()
        setSorted(sorted + 1)
    }

    const sortLikeDecCards = () => {
        sortArticlesDecLike()
        setSorted(sorted + 1)
    }


    return (
            <>
                {articles
                    ?
                    <div className={s.App}>

                        <h2>Select sorting method for cards:</h2>
                        <h3>
                            <div>
                                <input type="radio" onChange={sortDateIncCards} name="sort"/>
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
                                    <SmallCard
                                        articleId={item.articleId}
                                        title={item.title}
                                        text={item.text}
                                        currentLikes={item.currentLikes}
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
                    <input className={s.titleInput} type="text" value={article.title} onChange={setTitle}
                           placeholder="Your title"/>
                    <textarea className={s.textInput} placeholder="Your text of article" value={article.text}
                              onChange={setText}/>
                    <div className={s.addButton} onClick={addArticleHandler}>Add</div>
                </div>
            </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)