import React from 'react'
import Post from './post/Post'
import styles from './MyPosts.module.css'

function MyPosts(props) {
  let newPostElement = React.createRef()

  const addPost = () => {
    let text = newPostElement.current.value
    alert(text)
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement}></textarea>
        </div>
        <div>
          <button onClick={addPost}>add post</button>
        </div>
      </div>
      <div className={styles.posts}>
        {props.postsData.map((p) => (
          <Post message={p.message} likesCount={p.likesCount} />
        ))}
      </div>
    </div>
  )
}

export default MyPosts
