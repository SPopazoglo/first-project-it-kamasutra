import React from 'react'
import Post from './post/Post'
import styles from './MyPosts.module.css'
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/profileReducer'

function MyPosts(props) {
  let newPostElement = React.createRef()

  let addPost = () => {
    props.dispatch(addPostActionCreator())
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    let action = updateNewPostTextActionCreator(text)
    props.dispatch(action)
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea
            ref={newPostElement}
            value={props.newPostText}
            onChange={onPostChange}
          />
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
