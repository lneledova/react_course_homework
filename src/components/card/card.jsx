import React, {useEffect, useReducer, useState} from 'react'
import classnames from 'classnames/bind'
import { useParams } from 'react-router';
import { connect } from 'react-redux';

// Imports CSS module as JS object
import s from './card.module.scss'

import Comments from '../comments/comments';
import EditImg from '../../common/img/edit_img_violet.png';
import { getArticleById } from '../../common/helpers/get-article-by-id';
import { actionEditArticle } from '../../common/store/actions/editArticle';
import  { init } from '../../common/store/actions/init';
import { Link } from 'react-router-dom';

const cx = classnames.bind(s);

const mapStateToProps = (state) => ({
    articles: state.articlesReducer.articles,
})

const mapDispatchToProps = (dispatch) => ({
    editArticle: (newArticle) => dispatch(actionEditArticle(newArticle)),
})

function Card({articles, editArticle}) {

    const { articleId } = useParams()

    const [article, setArticle] = useState(getArticleById(articles, articleId))

    const [like, setLike] = useState({
        isLike: 1,
        color: 'gray'
    })

    const [commentsInfo, setCommentsInfo] = useState({
        show: -1,
        count: article.commentsCount
    })

    const initialUpdateArticle = {
        title: article.title,
        newTitle: article.title,
        text: article.text,
        newText: article.text,
        isEditing: false,
        createdAt: article.createdAt
    };

    function reducerUpdatedArticle(updateArticle, action) {
        switch (action.type) {
            case 'SET_TEXT':
                return {
                    ...updateArticle,
                    newText: action.payload
                }
            case 'SET_TITLE':
                return {
                    ...updateArticle,
                    newTitle: action.payload
                }
            case 'END_EDIT':
                const newArticle = {
                    ...article,
                    text: updateArticle.newText,
                    title: updateArticle.newTitle
                }

                editArticle(newArticle)

                setArticle(newArticle)
                return {
                    ...updateArticle,
                    isEditing: false,
                    text: updateArticle.newText,
                    title: updateArticle.newTitle
                }
            case 'START_EDIT':
                return {
                    ...updateArticle,
                    isEditing: true,
                    newText: updateArticle.text,
                    newTitle: updateArticle.title
                }
            default:
                return updateArticle;

        }
    }


    useEffect(() => {
        console.groupCollapsed()
        console.log(`User at card: ${article.title}`)

        return () => {
            console.groupEnd()
        }
    }, [])


    const likeDislike = () => {
        const newArticle = {
            ...article,
            currentLikes: article.currentLikes + like.isLike,
        }

        editArticle(newArticle)

        setArticle(newArticle)
        setLike(oldLike => ({
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? 'red' : 'gray'
        }))
    }

    const openComments = () => {
        setCommentsInfo(oldCommentsInfo => ({
            show: (-1) * oldCommentsInfo.show,
            count: article.commentsCount
        }))
    }

    const [updateArticle, dispatchUpdateArticle] = useReducer(reducerUpdatedArticle, initialUpdateArticle, init);

    return (
        <>
            <Link className={s.backLink} to='/articles'>
                <h2> Articles </h2>
            </Link>
            <div className={s.card}>
                <div className={s.date}>{updateArticle.createdAt}</div>
                {updateArticle.isEditing
                    ?
                    <>
                        <input className={s.titleInput}
                               type="text"
                               value={updateArticle.newTitle}
                               onChange={(event) => dispatchUpdateArticle({type: 'SET_TITLE', payload: event.target.value})}
                               placeholder={updateArticle.newTitle}
                        />
                        <textarea className={s.textInput}
                                  placeholder={updateArticle.newText}
                                  value={updateArticle.newText}
                                  onChange={(event) => dispatchUpdateArticle({type: 'SET_TEXT', payload: event.target.value})}
                        />
                    </>
                    :
                    <>
                        <h2>{updateArticle.title}</h2>
                        <h3>{updateArticle.text}</h3>
                    </>
                }
                {updateArticle.isEditing
                    ?
                    <div className={s.saveEditing} onClick={() => dispatchUpdateArticle({type: 'END_EDIT'})}> save </div>
                    :
                    <img src={EditImg} onClick={() => dispatchUpdateArticle({type: 'START_EDIT'})}/>
                }
                <div className={s.likesHeart}>
                    <div className={s.likes}>{article.currentLikes}</div>
                    <div className={cx('heart', `heart-color-${like.color}`)} onClick={likeDislike}></div>
                </div>


                    <div className={s.openButton} onClick={openComments}>
                        <p>
                            {commentsInfo.show < 0
                                ?
                                'Open ' + commentsInfo.count + ' comments and adding comments'
                                :
                                'Close comments'
                            }
                        </p>
                    </div>


                {(commentsInfo.show > 0) && <Comments/> }

            </div>
        </>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Card)