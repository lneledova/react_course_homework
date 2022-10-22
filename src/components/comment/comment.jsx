import React, {useState} from 'react'
import classnames from 'classnames/bind'

// Imports CSS module as JS object
import s from './comment.module.scss'
import EditImg from '../../img/edit_img_red.png';


const cx = classnames.bind(s);

export function Comment({author, text, currentLikes, createdAt}) {

    const [like, setLike] = useState({
        counter: currentLikes,
        isLike: 1,
        color: 'gray'
    })

    const [comment, setComment] = useState({
            text: text,
            newText: text,
            createdAt: null,
            isEditing: false
        }
    )


    const likeDislike = () => {
        setLike(oldLike => ({
            counter: oldLike.counter + oldLike.isLike,
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? 'red' : 'gray'
        }))
    }

    const startEdit = () => {
        setComment({
            ...comment,
            isEditing: true,
            newText: comment.text
        })
    }

    const setNewText = event => {
        const { value } = event.target
        setComment( {
                ...comment,
                newText: value
            }
        )
    }

    const endEdit = () => {
        setComment({
            ...comment,
            isEditing: false,
            text: comment.newText
        })
    }


    return (
        <>
            <div className={s.comment}>
                <div className={s.authorDate}>
                    <div className={s.author}> {author} </div>
                    <div className={s.date}> {createdAt} </div>
                </div>
                {comment.isEditing ?
                    <textarea className={s.commentInput} placeholder={comment.newText}  value={comment.newText} onChange={setNewText} />
                :
                    <div className={s.commentText}> {comment.text} </div>
                }
                <div className={s.likesHeart}>
                    <div className={s.likes}>{like.counter}</div>
                    <div className={cx('heart', `heart-color-${like.color}`)} onClick={likeDislike}></div>
                    {comment.isEditing ?
                        <div className={s.saveEditing} onClick={endEdit}> save </div>
                        :
                        <img src={EditImg} onClick={startEdit}/>}
                </div>
            </div>
        </>
    )
}