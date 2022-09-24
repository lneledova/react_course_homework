import React, {useState} from 'react'

// Imports CSS module as JS object
import s from './make-card.module.css'


export function MakeCard({fields}) {
    const [like, setLike] = useState({
        counter: fields.currentLikes,
        isLike: 1,
        color: "gray"
    })


    const likeDislike = () => {
        setLike(oldLike => ({
            counter: oldLike.counter + oldLike.isLike,
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? "red" : "gray"

        }))
    }

    return (
        <>
            <div className={s.card}>

                <h2>{fields.title}</h2>
                <h3>{fields.text}</h3>
                <div className={s.likesHeart}>
                    <div className={s.likes}>{like.counter}</div>
                    <div className={like.color === "red" ? s.redHeart : s.grayHeart} onClick={likeDislike}></div>
                </div>

            </div>
        </>
    )

}