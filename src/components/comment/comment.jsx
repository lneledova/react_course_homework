import React, {useCallback, useReducer, useState} from 'react'
import classnames from 'classnames/bind'

// Imports CSS module as JS object
import s from './comment.module.scss'
import EditImg from '../../common/img/edit_img_red.png';


const cx = classnames.bind(s);

function init(initial) {
    return {...initial};
}


export function Comment({commentId, author, text, currentLikes, createdAt, articleId,  changeComment}) {

    const [comment, setComment] = useState({
        commentId,
        articleId,
        author,
        text,
        currentLikes,
        createdAt,
    })

    const [like, setLike] = useState({
        isLike: 1,
        color: 'gray'
    })

    const initialStateUpdateComment = {
        text: text,
        newText: text,
        createdAt: null,
        isEditing: false
    }

    function reducerUpdateComment(updateComment, action) {
        switch (action.type) {
            case 'START_EDIT':
                return {
                    ...updateComment,
                    isEditing: true,
                    newText: updateComment.text
                };
            case 'END_EDIT':
                setComment({
                    ...comment,
                    text: updateComment.newText
                })

                const newComment = {
                    ...comment,
                    text: updateComment.newText
                }

                changeComment(newComment)
                return {
                     ...updateComment,
                     isEditing: false,
                     text: updateComment.newText
                };
            case 'SET_TEXT':
                return {
                    ...updateComment,
                    newText: action.payload
                }
            default:
                return updateComment;
        }
    }


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

    const [updateComment, dispatchUpdateComment] = useReducer(reducerUpdateComment, initialStateUpdateComment, init);

    return (
        <>
            <div className={s.comment}>
                <div className={s.authorDate}>
                    <div className={s.author}> {author} </div>
                    <div className={s.date}> {createdAt} </div>
                </div>
                {updateComment.isEditing
                    ?
                    <textarea className={s.commentInput}
                              placeholder={updateComment.newText}
                              value={updateComment.newText}
                              onChange={(event) => dispatchUpdateComment({type: 'SET_TEXT', payload: event.target.value})} />
                    :
                    <div className={s.commentText}> {updateComment.text} </div>
                }
                <div className={s.likesHeart}>
                    <div className={s.likes}>{comment.currentLikes}</div>
                    <div className={cx('heart', `heart-color-${like.color}`)} onClick={likeDislike}></div>
                    {updateComment.isEditing
                        ?
                        <div className={s.saveEditing} onClick={() => dispatchUpdateComment({type: 'END_EDIT'})}> save </div>
                        :
                        <img src={EditImg} onClick={() => dispatchUpdateComment({type: 'START_EDIT'})}/>}
                </div>
            </div>
        </>
    )
}