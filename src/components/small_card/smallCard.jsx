import React, {useState} from 'react'
import classnames from 'classnames/bind'

// Imports CSS module as JS object
import s from './smallCard.module.scss'
import {Link} from 'react-router-dom';

const cx = classnames.bind(s);

export function SmallCard({articleId, title, text, currentLikes, createdAt}) {

    const [like, setLike] = useState({
        counter: currentLikes,
        isLike: 1,
        color: 'gray'
    })

    const [article, setArticle] = useState({
        text: text.substring(0, 100)
    })

    const likeDislike = () => {
        setLike(oldLike => ({
            counter: oldLike.counter + oldLike.isLike,
            isLike: oldLike.isLike * (-1),
            color: oldLike.isLike === 1 ? 'red' : 'gray'
        }))
    }



    return (
        <>
            <div className={s.card}>
                <div className={s.date}>{createdAt}</div>
                <Link  to={`${articleId}`} key={articleId}>
                    <h2>{title}</h2>
                </Link>
                    <>
                        <h3>{article.text}</h3>
                    </>
                <div className={s.likesHeart}>
                    <div className={s.likes}>{like.counter}</div>
                    <div className={cx('heart', `heart-color-${like.color}`)} onClick={likeDislike}></div>
                </div>
            </div>
        </>
    )

}