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
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default MyPosts
