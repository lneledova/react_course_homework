import React, {useState} from 'react'

// Imports CSS module as JS object
import s from './card.module.css'

import {Comments} from "../comments/comments";

export function Card({articleId, title, text, currentLikes, commentsCount}) {

    const [like, setLike] = useState({
        counter: currentLikes,
        isLike: 1,
        color: "gray"
    })

    const [showComments, setShowComments] = useState(-1)


    const likeDislike = () => {
        setLike(oldLike => ({
            counter: oldLike.counter + oldLike.isLike,
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? "red" : "gray"
        }))
    }

    const openComments = () => {
        setShowComments(showComments * (-1))
    }


    return (
        <>
            <div className={s.card}>

                <h2>{title}</h2>
                <h3>{text}</h3>
                <div className={s.likesHeart}>
                    <div className={s.likes}>{like.counter}</div>
                    <div className={like.color === "red" ? s.redHeart : s.grayHeart} onClick={likeDislike}></div>
                </div>


                    <div className={s.openButton} onClick={openComments}>
                        { showComments < 0 ?
                           <p> Open comments and adding comments </p>
                            :
                            <p> Close comments </p>
                        }
                    </div>


                {(showComments > 0) && <Comments articleId={articleId} commentsCount={commentsCount} /> }

            </div>
        </>
    )

}