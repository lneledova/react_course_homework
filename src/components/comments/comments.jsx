import React, {useState} from 'react'

// Imports CSS module as JS object
import s from './comments.module.scss'

import {Comment} from "../comment/comment";
import {selectByArticleId} from '../../common/loaders_data/get-comments-by-article.js'
import {useParams} from "react-router";
import {connect} from "react-redux";
import {actionEditComment} from "../../common/store/actions/editComment";
import {actionDeleteComment} from "../../common/store/actions/deleteComment";
import {actionAddComment} from "../../common/store/actions/addComment";
import {getCountOfComments} from "../../common/helpers/get-count-of-comments";
import {actionAddCommentCount} from "../../common/store/actions/addCommentSize";
import {actionSortCommentsDecDate} from "../../common/store/actions/sortCommentsDecDate";
import {actionSortCommentsAscDate} from "../../common/store/actions/sortCommentsAscDate";
import {actionSortCommentsDecLike} from "../../common/store/actions/sortCommentsDecLike";
import {actionSortCommentsAscLike} from "../../common/store/actions/sortCommentsAscLike";


const mapStateToProps = (state) => ({
    articles: state.articlesReducer.articles,
    comments: state.commentsReducer.comments,
})

const mapDispatchToProps = (dispatch) => ({
    addComment: (newComment) => dispatch(actionAddComment(newComment)),
    deleteComment: (commentId) => dispatch(actionDeleteComment(commentId)),
    changeCommentCount: (commentCount, id) => dispatch(actionAddCommentCount(commentCount, id)),
    editComment: (newComment) => dispatch(actionEditComment(newComment)),
    sortCommentsDecDate: () => dispatch(actionSortCommentsDecDate()),
    sortCommentsAscDate: () => dispatch(actionSortCommentsAscDate()),
    sortCommentsDecLike: () => dispatch(actionSortCommentsDecLike()),
    sortCommentsAscLike: () => dispatch(actionSortCommentsAscLike())
})

function Comments({
                      articles,
                      comments,
                      addComment,
                      deleteComment,
                      changeCommentCount,
                      editComment,
                      sortCommentsDecDate,
                      sortCommentsAscDate,
                      sortCommentsDecLike,
                      sortCommentsAscLike
}) {
    const { articleId } = useParams()

    const commentsCount = getCountOfComments(articles, articleId)
    const commentsStore = selectByArticleId(comments, articleId)

    console.log(articleId)
    const [sorted, setSorted] = useState(0)
    const [comment, setComment] = useState({
        commentId: 10,
        author: "",
        text: "",
        articleId: articleId,
        createdAt: "",
        currentLikes: 0
    })

    const deleteCommentHandler = (delete_id) => {
        deleteComment(delete_id)
        changeCommentCount(commentsCount - 1, articleId)
    }

    const addCommentHandler = () => {
        const date = new Date()
        const currDate = date.toISOString().split('T')[0]
        const newComment = {
            ...comment,
            createdAt: currDate
        }

        addComment(newComment)
        changeCommentCount(commentsCount + 1, articleId)

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
        sortCommentsAscDate()
        setSorted(sorted + 1)
    }

    const sortDateDecComments = () => {
        sortCommentsDecDate()
        setSorted(sorted + 1)
    }

    const sortLikeIncComments = () => {
        sortCommentsAscLike()
        setSorted(sorted + 1)
    }

    const sortLikeDecComments = () => {
        sortCommentsDecLike()
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

    const changeComment = (newComment) => {
        editComment(newComment)
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
                        .map(item =>
                    <div key={item.commentId}>
                        <Comment
                            commentId={item.commentId}
                            author={item.author}
                            text={item.text}
                            currentLikes={item.currentLikes}
                            createdAt={item.createdAt}
                            articleId={articleId}
                            changeComment={changeComment}
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