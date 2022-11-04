import React, {useEffect, useState} from 'react'
import {sortByDateDec} from '../../common/helpers/sort-by-date.js'
import {sortByDateInc} from '../../common/helpers/sort-by-date.js'

import {sortByLikesDec} from '../../common/helpers/sort-by-likes.js'
import {sortByLikesInc} from '../../common/helpers/sort-by-likes.js'

// Imports CSS module as JS object
import s from './comments.module.scss'

import {Comment} from "../comment/comment";
import {getComments} from '../../common/loaders_data/get-comments-by-article.js'

export function Comments({articleId, commentsCount, changeSize}) {
    const [comments, setComments] = useState(null)
    const [sorted, setSorted] = useState(0)
    const [commentsSize, setCommentsSize] = useState(commentsCount)
    const [comment, setComment] = useState({
            commentId: 10,
            author: null,
            text: null,
            articleId: articleId,
            createdAt: "",
            currentLikes: 0
        }
    )



    useEffect(() => {
        getComments(articleId).then(fetchedComments => {
            setComments(fetchedComments)
            setCommentsSize(commentsCount)
        })
    }, [])


    const deleteComment = (delete_id) => {
        setComments([...comments.filter(({commentId}) => commentId !== delete_id)])
        setCommentsSize(commentsSize - 1)
        changeSize(-1)
    }

    const addComment = () => {
        const date = new Date()
        const currDate = date.toISOString().split('T')[0]
        setComment( {
            ...comment,
            createdAt: currDate,
            commentId: comment.commentId + 1
        })
        const newComment = {
            ...comment,
            createdAt: currDate
        }
        setComments([...comments, newComment])
        setCommentsSize(commentsSize + 1)
        changeSize(1)
    }

    const setAuthor = event => {
        const { value } = event.target
        setComment({
                ...comment,
                author: value
            }
        )
    }

    const setText = event => {
        const { value } = event.target
        setComment({
                ...comment,
                text: value
            }
        )
    }

    const sortDateIncComments = () => {
        sortByDateInc(comments)
        setSorted(sorted + 1)
    }

    const sortDateDecComments = () => {
        sortByDateDec(comments)
        setSorted(sorted + 1)
    }

    const sortLikeIncComments = () => {
        sortByLikesInc(comments)
        setSorted(sorted + 1)
    }

    const sortLikeDecComments = () => {
        sortByLikesDec(comments)
        setSorted(sorted + 1)
    }

    const commentSizeText = () => {
        if (commentsSize === 0) {
            return "There is no comment"
        }
        if (commentsSize === 1) {
            return "There is 1 comment"
        }
        return "There are " +  commentsSize + " comments"
    }

    const changeCurrentLikes = (changeId, value) => {
        comments
            .filter(it => it.commentId === changeId)
            .map(it => it.currentLikes += value)
    }


    return (
        <>
            <div className={s.comments}>
                <h3> {commentSizeText()} </h3>
                { comments
                    ?
                    <>
                        <h3>
                            <p>Select sorting method for comments:</p>
                            <div>
                                <input type="radio" onChange={sortDateIncComments} name="sort" />
                                <label>By date increasing</label>

                                <input type="radio" onChange={sortDateDecComments} name="sort"/>
                                <label>By date decreasing</label>
                                <br></br>
                                <input type="radio" onChange={sortLikeIncComments} name="sort"/>
                                <label>By likes increasing</label>

                                <input type="radio" onChange={sortLikeDecComments} name="sort"/>
                                <label>By likes decreasing</label>
                            </div>
                        </h3>

                    {comments.map(item =>
                    <div key={item.commentId}>
                        <Comment
                            commentId={item.commentId}
                            author={item.author}
                            text={item.text}
                            currentLikes={item.currentLikes}
                            createdAt={item.createdAt}
                            changeCurrentLikes={changeCurrentLikes}
                        />
                        <div className={s.deleteComment} onClick={() => deleteComment(item.commentId)}> delete </div>
                    </div>
                    )}
                    </>
                    :
                    <div>
                        Comments are loading...
                    </div>
                }
            </div>

            <div className={s.formAddComment}>
                <div className={s.headerForm}>Write your own comment</div>
                <input className={s.authorInput} type="text" value={comment.author} onChange={setAuthor} placeholder="Your name" />
                <textarea className={s.commentInput} placeholder="Your comment" value={comment.text} onChange={setText} />
                <div className={s.addButton} onClick={addComment}>Add</div>
            </div>
        </>

    )

}