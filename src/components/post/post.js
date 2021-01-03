import React, { useState, useEffect } from 'react'
import Firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import './post.css'
import { db, auth } from '../../utils/firebase'
import { Button } from '@material-ui/core'

const Post = ({ postId, author, caption, imageUrl }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const loggedInUser = auth.currentUser ? auth.currentUser.displayName : null

    useEffect(() => {
        if (!postId) return

        const unsubscribe = db.collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    comment: doc.data()
                })
                ))
            })

        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = event => {
        event.preventDefault()

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
                text: newComment,
                username: loggedInUser
            })

        setNewComment('')
    }

    return (
        <div className='post'>
            <h3 className='post--header'>
                <Avatar
                    alt={author}
                    src='asdfasfasf.jpg' />
                <div className='post--header-author'>{author}</div>
            </h3>

            <img className='post__img' src={imageUrl} alt='a dog'></img>

            <p className='post--caption'><strong>{author}</strong> {caption}</p>

            <div className='post--comments'>
                {loggedInUser ? (
                    <form>
                        <input
                            className=''
                            type='text'
                            placeholder='Get your 2 cents in...'
                            value={newComment}
                            onChange={event => setNewComment(event.target.value)}

                        />
                        <Button
                            className='post__new-comment'
                            disabled={!newComment}
                            onClick={postComment}
                        >
                            Post Comment
                </Button>
                    </form>
                ) : (
                        <p>Login or sign up to comment</p>
                    )}

                {
                    comments.map(({ id, comment }) => (
                        <div key={id} className='comment'>
                            <p><strong>{comment.username}</strong> {comment.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Post