import React, {useCallback, useReducer, useState} from 'react'

// Imports CSS module as JS object
import s from './comments.module.scss'

import {Comment} from '../comment/comment';
import {selectByArticleId} from '../../common/loaders_data/get-comments-by-article.js'
import {useParams} from 'react-router';
import {connect} from 'react-redux';
import {actionEditComment} from '../../common/store/actions/editComment';
import {actionDeleteComment} from '../../common/store/actions/deleteComment';
import {actionAddComment} from '../../common/store/actions/addComment';
import {getCountOfComments} from '../../common/helpers/get-count-of-comments';
import {actionAddCommentCount} from '../../common/store/actions/addCommentSize';
import {actionSortCommentsDecDate} from '../../common/store/actions/sortCommentsDecDate';
import {actionSortCommentsAscDate} from '../../common/store/actions/sortCommentsAscDate';
import {actionSortCommentsDecLike} from '../../common/store/actions/sortCommentsDecLike';
import {actionSortCommentsAscLike} from '../../common/store/actions/sortCommentsAscLike';
import {init} from "../../common/store/actions/init";


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

    const initialComment = {
        commentId: 10,
        author: "",
        text: "",
        articleId: articleId,
        createdAt: "",
        currentLikes: 0
    }

    function reducerSorting(sorted, action) {
        switch (action.type) {
            case 'DEC_LIKE':
                sortCommentsDecLike()
                return sorted + 1
            case 'ASC_LIKE':
                sortCommentsAscLike()
                return sorted + 1
            case 'DEC_DATE':
                sortCommentsDecDate()
                return sorted + 1
            case 'ASC_DATE':
                sortCommentsAscDate()
                return sorted + 1
            default:
                return sorted
        }
    }

    function reducerComment(comment, action) {
        switch (action.type) {
            case 'SET_AUTHOR':
                return {
                    ...comment,
                    author: action.payload
                }
            case 'SET_TEXT':
                return {
                    ...comment,
                    text: action.payload
                }
            case 'ADD_COMMENT':
                const date = new Date()
                const currDate = date.toISOString().split('T')[0]
                const newComment = {
                    ...comment,
                    createdAt: currDate
                }

                addComment(newComment)
                changeCommentCount(commentsCount + 1, articleId)

                return {
                    ...comment,
                    createdAt: currDate,
                    commentId: comment.commentId + 1
                }
            case 'DELETE_COMMENT':
                deleteComment(action.payload)
                changeCommentCount(commentsCount - 1, articleId)
                return comment
            default:
                return comment
        }
    }

    const [sorted, sort] = useReducer(reducerSorting, 0, init);

    const [comment, dispatchComment] = useReducer(reducerComment, initialComment, init);

    const commentSizeText = () => {
        if (commentsCount === 0) {
            return "There is no comment"
        }
        if (commentsCount === 1) {
            return "There is 1 comment"
        }
        return "There are " +  commentsCount + " comments"
    }

    const changeCommentCallback = useCallback((newComment) => {
        editComment(newComment)
    }, [])


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
                                <input type="radio" onChange={() => sort({type: 'ASC_DATE'})} name="sort" />
                                <label>By date increasing</label>

                                <input type="radio" onChange={() => sort({type: 'DEC_DATE'})} name="sort"/>
                                <label>By date decreasing</label>
                                <br></br>
                                <input type="radio" onChange={() => sort({type: 'ASC_LIKE'})} name="sort"/>
                                <label>By likes increasing</label>

                                <input type="radio" onChange={() => sort({type: 'DEC_LIKE'})} name="sort"/>
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
                            changeComment={changeCommentCallback}
                        />
                        <div className={s.deleteComment}
                             onClick={() => dispatchComment({type: 'DELETE_COMMENT', payload: item.commentId})}> delete </div>
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
                <div className={s.headerForm}> Write your own comment </div>
                <input className={s.authorInput}
                       type="text"
                       value={comment.author}
                       onChange={(event) => dispatchComment({type: 'SET_AUTHOR', payload: event.target.value})}
                       placeholder="Your name"
                />
                <textarea className={s.commentInput}
                          placeholder="Your comment"
                          value={comment.text}
                          onChange={(event) => dispatchComment({type: 'SET_TEXT', payload: event.target.value})}
                />
                <div className={s.addButton}
                     onClick={() => dispatchComment({type: 'ADD_COMMENT'})}> Add </div>
            </div>
        </>

    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)