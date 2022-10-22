import React, {useEffect, useState} from 'react'

// Imports CSS module as JS object
import s from './comments.module.scss'

import {Comment} from "../comment/comment";
import {getComments} from '../../loaders_data/get-comments-by-article.js'

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

    const sortDateIncCards = () => {
        comments.sort((o1, o2) => {
            return new Date(o1.createdAt) -  new Date(o2.createdAt)
        })
        setSorted(sorted + 1)
    }

    const sortDateDecCards = () => {
        comments.sort((o1, o2) => {
            return new Date(o2.createdAt) -  new Date(o1.createdAt)
        })
        setSorted(sorted + 1)
    }

    const sortLikeIncCards = () => {
        comments.sort((o1, o2) => {
            return new Date(o1.currentLikes) -  new Date(o2.currentLikes)
        })
        setSorted(sorted + 1)
    }

    const sortLikeDecCards = () => {
        comments.sort((o1, o2) => {
            return new Date(o2.currentLikes) -  new Date(o1.currentLikes)
        })
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


    return (
        <>
            <div className={s.comments}>
                <h3> {commentSizeText()} </h3>
                { comments ?
                    <>
                        <h3>
                            <p>Select sorting method for comments:</p>
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

                    {comments.map(item =>
                    <div key={item.commentId}>
                        <Comment
                            author={item.author}
                            text={item.text}
                            currentLikes={item.currentLikes}
                            createdAt={item.createdAt}
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