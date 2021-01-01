import React, { useState, useEffect } from 'react'
import './App.css';
import Header from '../header'
import Post from '../post'
import { db } from '../../utils/firebase';

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  })

  return (
    <>
      <Header />

      <div className='posts'>
        {posts.map(post => (
          <Post
            author={post.author}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </>
  );
}

export default App;
