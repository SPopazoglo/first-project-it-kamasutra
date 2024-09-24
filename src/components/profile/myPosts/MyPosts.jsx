import React from 'react'
import Post from './post/Post'
import styles from './MyPosts.module.css'

function MyPosts(props) {
  return (
    <div className={styles.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>add post</button>
        </div>
      </div>
      <div className={styles.posts}>
        <Post message={`Hello! It's my first post`} likeCount={5} />
        <Post message="Hi, how are you?" likeCount={12} />
      </div>
    </div>
  )
}

export default MyPosts
