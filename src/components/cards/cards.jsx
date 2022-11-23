import React, {useReducer} from 'react'

import s from './cards.module.scss';


import {SmallCard} from '../small_card/smallCard';
import {actionAddArticle} from '../../common/store/actions/addArticle';
import {connect} from 'react-redux';
import {actionSortArticlesDecDate} from '../../common/store/actions/sortArticlesDecDate';
import {actionSortArticlesAscDate} from '../../common/store/actions/sortArticlesAscDate';
import {actionSortArticlesDecLike} from '../../common/store/actions/sortArticlesDecLike';
import {actionSortArticlesAscLike} from '../../common/store/actions/sortArticlesAscLike';
import {init} from "../../common/store/actions/init";


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
    const initialArticle = {
            articleId: 100,
            title: "",
            text: "",
            currentLikes: 0,
            commentsCount: 0,
            createdAt: "",
        }

    function reducerSorting(sorted, action) {
        switch (action.type) {
            case 'DEC_LIKE':
                sortArticlesDecLike()
                return sorted + 1
            case 'ASC_LIKE':
                sortArticlesAscLike()
                return sorted + 1
            case 'DEC_DATE':
                sortArticlesDecDate()
                return sorted + 1
            case 'ASC_DATE':
                sortArticlesAscDate()
                return sorted + 1
            default:
                return sorted
        }
    }

    function reducerArticle(article, action) {
        switch (action.type) {
            case 'SET_TITLE':
                return {
                    ...article,
                    title: action.payload
                }
            case 'SET_TEXT':
                return {
                    ...article,
                    text: action.payload
                }
            case 'ADD_ARTICLE':
                return {
                    ...article,
                    createdAt: action.payload,
                    articleId: article.articleId + 1
                }
            default:
                return article
        }
    }

    const [sorted, sort] = useReducer(reducerSorting, 0, init);

    const [article, dispatchArticle] = useReducer(reducerArticle, initialArticle, init)

    function addArticleFunction() {
        const date = new Date()
        const currDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()

        const newArticle = {
            ...article,
            createdAt: currDate
        }
        addArticle(newArticle)
        dispatchArticle({type: 'ADD_ARTICLE', payload: currDate})
    }


    return (
            <>
                {articles
                    ?
                    <div className={s.App}>

                        <h2>Select sorting method for cards:</h2>
                        <h3>
                            <div>
                                <input type="radio" onChange={() => sort({type: 'ASC_DATE'})} name="sort" />
                                <label>By date increasing</label>

                                <input type="radio" onChange={() => sort({type: 'DEC_DATE'})} name="sort"/>
                                <label>By date decreasing</label>
                                <br></br>
                                <input type="radio" onChange={() => sort({type: 'ASC_LIKE'})} name="sort"/>
                                <label>By likes increasing</label>

                                <input type="radio" onChange={() => sort({type: 'DEC_LIKE'})} name="sort"/>
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
                    <input className={s.titleInput}
                           type="text" value={article.title}
                           onChange={(event) => dispatchArticle({type: 'SET_TITLE', payload: event.target.value})}
                           placeholder="Your title"/>
                    <textarea className={s.textInput} placeholder="Your text of article" value={article.text}
                              onChange={(event) => dispatchArticle({type: 'SET_TEXT', payload: event.target.value})}/>
                    <div className={s.addButton}
                         onClick={addArticleFunction}>Add</div>
                </div>
            </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)