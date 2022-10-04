import React, {useEffect, useState} from 'react'

// Imports CSS module as JS object
import s from './comments.module.css'

import {getComments} from '../../loaders_data/get-comments-by-article.js'

export function Comments({articleId, commentsCount}) {
    const [comments, setComments] = useState(null)
    const [commentsSize, setCommentsSize] = useState(commentsCount)
    const [comment, setComment] = useState({
            commentId: 10,
            author: null,
            text: null,
            articleId: articleId
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
    }

    const addComment = () => {
        setComment({
            ...comment,
            commentId: comment.commentId + 1
        })
        const newComment = {...comment}
        setComments([...comments, newComment])
        setCommentsSize(commentsSize + 1)
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


    return (
        <>
            <div className={s.comments}>
                <h3>There are {commentsSize === 0 ? "no" : commentsSize} comments</h3>
                { comments ?
                    comments.map(item => <div className={s.comment}>
                        <div className={s.author}> {item.author} </div>
                        <div className={s.commentText}> {item.text} </div>
                        <div className={s.deleteComment} onClick={() => deleteComment(item.commentId)}> delete </div>
                    </div>)
                    :
                    <div>
                        Comments is loading...
                    </div>
                }
            </div>

            <div className={s.formAddComment}>
                <div className={s.headerForm}>Write your own comment</div>
                <input className={s.authorInput} type="text" value={comment.author} onChange={setAuthor} placeholder="Your name" />
                <textarea className={s.commentInput} placeholder="Your comment"  value={comment.text} onChange={setText} />
                <div className={s.addButton} onClick={addComment}>Add</div>
            </div>
        </>

    )

}