import React, {useState} from 'react'
import classnames from 'classnames/bind'
import {useParams} from "react-router";
import {connect} from "react-redux";

// Imports CSS module as JS object
import s from './card.module.scss'

import Comments from "../comments/comments";
import EditImg from '../../common/img/edit_img_violet.png';
import {getArticleById} from "../../common/helpers/get-article-by-id";
import {actionEditArticle} from "../../common/store/actions/editArticle";
import {Link} from "react-router-dom";

const cx = classnames.bind(s);

const mapStateToProps = (state) => ({
    articles: state.articlesReducer.articles,
})

const mapDispatchToProps = (dispatch) => ({
    editArticle: (newArticle) => dispatch(actionEditArticle(newArticle)),
})

function Card({articles, editArticle}) {

    const { articleId } = useParams()

    //const {title, text, currentLikes, commentsCount, createdAt} = getArticleById(articles, articleId)
    const [article, setArticle] = useState(getArticleById(articles, articleId))

    const [like, setLike] = useState({
        isLike: 1,
        color: 'gray'
    })

    const [commentsInfo, setCommentsInfo] = useState({
        show: -1,
        count: article.commentsCount
    })

    const [updateArticle, setUpdateArticle] = useState({
        title: article.title,
        newTitle: article.title,
        text: article.text,
        newText: article.text,
        isEditing: false,
        createdAt: article.createdAt
    })


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

    const startEdit = () => {
        setUpdateArticle({
            ...updateArticle,
            isEditing: true,
            newText: updateArticle.text
        })
    }

    const setNewText = event => {
        const { value } = event.target
        setUpdateArticle( {
                ...updateArticle,
                newText: value
            }
        )
    }

    const setNewTitle = event => {
        const { value } = event.target
        setUpdateArticle( {
                ...updateArticle,
                newTitle: value
            }
        )
    }

    const endEdit = () => {
        setUpdateArticle({
            ...updateArticle,
            isEditing: false,
            text: updateArticle.newText,
            title: updateArticle.newTitle
        })
        const newArticle = {
            ...article,
            text: updateArticle.newText,
            title: updateArticle.newTitle
        }

        editArticle(newArticle)

        setArticle(newArticle)

    }


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
                        <input className={s.titleInput} type="text" value={updateArticle.newTitle} onChange={setNewTitle} placeholder={updateArticle.newTitle} />
                        <textarea className={s.textInput} placeholder={updateArticle.newText} value={updateArticle.newText} onChange={setNewText} />
                    </>
                    :
                    <>
                        <h2>{updateArticle.title}</h2>
                        <h3>{updateArticle.text}</h3>
                    </>
                }
                {updateArticle.isEditing
                    ?
                    <div className={s.saveEditing} onClick={endEdit}> save </div>
                    :
                    <img src={EditImg} onClick={startEdit}/>
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