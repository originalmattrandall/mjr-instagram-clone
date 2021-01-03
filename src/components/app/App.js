import React, { useState, useEffect } from 'react'
import './App.css';
import Header from '../header'
import Post from '../post'
import { db, auth } from '../../utils/firebase';
import CreatePost from '../create-post';

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  })

  return (
    <>
      <Header />

      <div className='app'>

        {auth.currentUser ? (
          <CreatePost />
        ) : (
            <h3>Create an account or login to make a post!</h3>
          )}

        <div className='posts'>
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              author={post.author}
              caption={post.caption}
              imageUrl={post.imageUrl}
              postId={id}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default App;
