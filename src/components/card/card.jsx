import React, {useState} from 'react'
import classnames from 'classnames/bind'

// Imports CSS module as JS object
import s from './card.module.scss'

import {Comments} from "../comments/comments";
import EditImg from '../../img/edit_img_violet.png';

const cx = classnames.bind(s);

export function Card({articleId, title, text, currentLikes, commentsCount, createdAt}) {

    const [like, setLike] = useState({
        counter: currentLikes,
        isLike: 1,
        color: 'gray'
    })

    const [commentsInfo, setCommentsInfo] = useState({
        show: -1,
        count: commentsCount
    })

    const [article, setArticle] = useState({
        title: title,
        newTitle: title,
        text: text,
        newText: text,
        isEditing: false,
        createdAt: createdAt
    })


    const likeDislike = () => {
        setLike(oldLike => ({
            counter: oldLike.counter + oldLike.isLike,
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? 'red' : 'gray'
        }))
    }

    const openComments = () => {
        setCommentsInfo(oldCommentsInfo => ({
            show: (-1) * oldCommentsInfo.show,
            count: commentsCount
        }))
    }

    const changeSize = (value) => {
        setCommentsInfo({
                show: commentsInfo.show,
                count: commentsInfo.count + value
            }
        )
    }

    const startEdit = () => {
        setArticle({
            ...article,
            isEditing: true,
            newText: article.text
        })
    }

    const setNewText = event => {
        const { value } = event.target
        setArticle( {
                ...article,
                newText: value
            }
        )
    }

    const setNewTitle = event => {
        const { value } = event.target
        setArticle( {
                ...article,
                newTitle: value
            }
        )
    }

    const endEdit = () => {
        setArticle({
            ...article,
            isEditing: false,
            text: article.newText,
            title: article.newTitle
        })
    }


    return (
        <>
            <div className={s.card}>
                <div className={s.date}>{article.createdAt}</div>
                {article.isEditing ?
                    <>
                        <input className={s.titleInput} type="text" value={article.newTitle} onChange={setNewTitle} placeholder={article.newTitle} />
                        <textarea className={s.textInput} placeholder={article.newText} value={article.newText} onChange={setNewText} />
                    </>
                :
                    <>
                        <h2>{article.title}</h2>
                        <h3>{article.text}</h3>
                    </>
                }
                {article.isEditing ?
                    <div className={s.saveEditing} onClick={endEdit}> save </div>
                    :
                    <img src={EditImg} onClick={startEdit}/>
                }
                <div className={s.likesHeart}>
                    <div className={s.likes}>{like.counter}</div>
                    <div className={cx('heart', `heart-color-${like.color}`)} onClick={likeDislike}></div>
                </div>


                    <div className={s.openButton} onClick={openComments}>
                        <p>
                            {commentsInfo.show < 0
                                ? 'Open ' + commentsInfo.count + ' comments and adding comments'
                                : 'Close comments'
                            }
                        </p>
                    </div>


                {(commentsInfo.show > 0) &&
                    <Comments
                        articleId={articleId}
                        commentsCount={commentsCount}
                        changeSize={changeSize}
                /> }

            </div>
        </>
    )

}