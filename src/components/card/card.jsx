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

    const [commentsInfo, setCommentsInfo] = useState({
        show: -1,
        count: commentsCount
    })


    const likeDislike = () => {
        setLike(oldLike => ({
            counter: oldLike.counter + oldLike.isLike,
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? "red" : "gray"
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