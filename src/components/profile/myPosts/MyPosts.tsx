import React from 'react'
import Post from './post/Post'
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm'
import styles from './MyPosts.module.css'
import { PostType } from '../../../../types/types'

export type MapPropsType = {
  posts: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ))

  let onAddNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={onAddNewPost} />
      <div className={styles.posts}>{postsElements}</div>
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized
