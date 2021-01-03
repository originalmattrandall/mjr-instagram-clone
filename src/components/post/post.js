import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './post.css'
import { db } from '../../utils/firebase'

const Post = ({ postId, author, caption, imageUrl }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (!postId) return

        const unsubscribe = db.collection('posts')
            .doc(postId)
            .collection('comments')
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc =>
                    doc.data()
                ))
            })

        return () => {
            unsubscribe()
        }
    }, [postId])

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
                {
                    comments.map(comment =>
                        <p><strong>{comment.username}</strong> {comment.text}</p>
                    )}
            </div>
        </div>
    )
}

export default Post