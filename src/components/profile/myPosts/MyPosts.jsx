import React from 'react'
import Post from './post/Post'
import styles from './MyPosts.module.css'

function MyPosts(props) {
  const postsData = [
    { id: 1, message: 'Hi, how are you?', likesCount: 5 },
    { id: 2, message: "Hello! It's my first post", likesCount: 10 },
    { id: 2, message: 'blalba', likesCount: 3 },
    { id: 2, message: 'yess!!!', likesCount: 105 },
  ]

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
        {postsData.map((p) => (
          <Post message={p.message} likesCount={p.likesCount} />
        ))}
      </div>
    </div>
  )
}

export default MyPosts
