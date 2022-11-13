import React, {useEffect, useState} from 'react'
import {sortByDateDec} from '../../common/helpers/sort-by-date.js'
import {sortByDateInc} from '../../common/helpers/sort-by-date.js'

import {sortByLikesDec} from '../../common/helpers/sort-by-likes.js'
import {sortByLikesInc} from '../../common/helpers/sort-by-likes.js'

// Imports CSS module as JS object
import s from './comments.module.scss'

import {Comment} from "../comment/comment";
import {getComments} from '../../common/loaders_data/get-comments-by-article.js'
import {useParams} from "react-router";
import {connect} from "react-redux";
import {actionEditComment} from "../../common/store/actions/editComment";
import {actionDeleteComment} from "../../common/store/actions/deleteComment";
import {actionAddComment} from "../../common/store/actions/addComment";

function extractArticleId() {
    return window.location.href.split('/').pop()
}

const mapStateToProps = (state) => ({
    commentsCount: state.articlesReducer.articles.filter(({articleId}) => {
        return articleId.toString() === extractArticleId()
    })[0].commentsCount,
    commentsStore: state.commentsReducer.comments,
})

const mapDispatchToProps = (dispatch) => ({
    changeComment: (newComment) => dispatch(actionEditComment(newComment)),
    addComment: (newComment) => dispatch(actionAddComment(newComment)),
    deleteComment: (commentId) => dispatch(actionDeleteComment(commentId)),
})

function Comments({commentsCount, commentsStore, changeComment, addComment, deleteComment}) {
    const { articleId } = useParams()
    //const [comments, setComments] = useState(commentsP)
    const [sorted, setSorted] = useState(0)
    // const [commentsSize, setCommentsSize] = useState(commentsCount)
    const [comment, setComment] = useState({
        commentId: 10,
        author: "",
        text: "",
        articleId: articleId,
        createdAt: "",
        currentLikes: 0
    })

    console.log("comments in component:")
    console.log(commentsStore)

    const deleteCommentHandler = (delete_id) => {
        deleteComment(delete_id)
    }

    const addCommentHandler = () => {
        const date = new Date()
        const currDate = date.toISOString().split('T')[0]
        const newComment = {
            ...comment,
            createdAt: currDate
        }
        addComment(newComment)
        setComment( {
            ...comment,
            createdAt: currDate,
            commentId: comment.commentId + 1
        })
    }

    const setAuthor = event => setComment({
        ...comment,
        author: event.target.value
    })

    const setText = event => setComment({
        ...comment,
        text: event.target.value
    })

    const sortDateIncComments = () => {
        sortByDateInc(commentsStore)
        setSorted(sorted + 1)
    }

    const sortDateDecComments = () => {
        sortByDateDec(commentsStore)
        setSorted(sorted + 1)
    }

    const sortLikeIncComments = () => {
        sortByLikesInc(commentsStore)
        setSorted(sorted + 1)
    }

    const sortLikeDecComments = () => {
        sortByLikesDec(commentsStore)
        setSorted(sorted + 1)
    }

    const commentSizeText = () => {
        if (commentsCount === 0) {
            return "There is no comment"
        }
        if (commentsCount === 1) {
            return "There is 1 comment"
        }
        return "There are " +  commentsCount + " comments"
    }

    const changeCurrentLikes = (changeId, value) => {
        commentsStore
            .filter(it => it.commentId === changeId)
            .map(it => it.currentLikes += value)
    }


    return (
        <>
            <div className={s.comments}>
                <h3> {commentSizeText()} </h3>
                { commentsStore
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

                    {commentsStore
                        .filter((it) => it.articleId.toString() === articleId)
                        .map(item =>
                    <div key={item.commentId}>
                        <Comment
                            commentId={item.commentId}
                            author={item.author}
                            text={item.text}
                            currentLikes={item.currentLikes}
                            createdAt={item.createdAt}
                            changeCurrentLikes={changeCurrentLikes}
                        />
                        <div className={s.deleteComment} onClick={() => deleteCommentHandler(item.commentId)}> delete </div>
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
                <div className={s.addButton} onClick={addCommentHandler}>Add</div>
            </div>
        </>

    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)