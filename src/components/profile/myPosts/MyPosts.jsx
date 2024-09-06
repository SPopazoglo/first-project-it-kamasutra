import React from 'react'
import Post from './post/Post'
import styles from './MyPosts.module.css'

function MyPosts() {
  return (
    <div>
      <div>
        My Posts
        <div>
          <textarea></textarea>
          <button>add post</button>
        </div>
      </div>
      <Post message={`Hello! It's my first post`} likeCount={5} />
      <Post message="Hi, how are you?" likeCount={12} />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default MyPosts
