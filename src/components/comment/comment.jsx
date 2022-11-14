import React, {useState} from 'react'
import classnames from 'classnames/bind'

// Imports CSS module as JS object
import s from './comment.module.scss'
import EditImg from '../../common/img/edit_img_red.png';


const cx = classnames.bind(s);

export function Comment({commentId, author, text, currentLikes, createdAt, articleId,  changeComment}) {

    const [like, setLike] = useState({
        isLike: 1,
        color: 'gray'
    })

    const [updateComment, setUpdateComment] = useState({
            text: text,
            newText: text,
            createdAt: null,
            isEditing: false
        }
    )

    const [comment, setComment] = useState({
        commentId,
        articleId,
        author,
        text,
        currentLikes,
        createdAt,
    })


    const likeDislike = () => {
        const newComment = {
            ...comment,
            currentLikes: comment.currentLikes + like.isLike
        }

        changeComment(newComment)

        setLike(oldLike => ({
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? 'red' : 'gray'
        }))
        setComment(newComment)
    }

    const startEdit = () => {
        setUpdateComment({
            ...updateComment,
            isEditing: true,
            newText: updateComment.text
        })
    }

    const setNewText = event => {
        const { value } = event.target
        setUpdateComment( {
                ...updateComment,
                newText: value
            }
        )
    }

    const endEdit = () => {
        setUpdateComment({
            ...updateComment,
            isEditing: false,
            text: updateComment.newText
        })
        setComment({
            ...comment,
            text: updateComment.newText
        })

        const newComment = {
            ...comment,
            text: updateComment.newText
        }

        changeComment(newComment)
    }


    return (
        <>
            <div className={s.comment}>
                <div className={s.authorDate}>
                    <div className={s.author}> {author} </div>
                    <div className={s.date}> {createdAt} </div>
                </div>
                {updateComment.isEditing
                    ?
                    <textarea className={s.commentInput} placeholder={updateComment.newText}  value={updateComment.newText} onChange={setNewText} />
                    :
                    <div className={s.commentText}> {updateComment.text} </div>
                }
                <div className={s.likesHeart}>
                    <div className={s.likes}>{comment.currentLikes}</div>
                    <div className={cx('heart', `heart-color-${like.color}`)} onClick={likeDislike}></div>
                    {updateComment.isEditing
                        ?
                        <div className={s.saveEditing} onClick={endEdit}> save </div>
                        :
                        <img src={EditImg} onClick={startEdit}/>}
                </div>
            </div>
        </>
    )
}