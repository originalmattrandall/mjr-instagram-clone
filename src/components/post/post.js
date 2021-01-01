import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './post.css'

const Post = ({ author, caption, imageUrl }) => {
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
                <p><strong>Person Name</strong> Comment</p>
            </div>
        </div>
    )
}

export default Post