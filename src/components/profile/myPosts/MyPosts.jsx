import React from 'react'
import Post from './post/Post'
import styles from './MyPosts.module.css'
import { Field, reduxForm } from 'redux-form'
import {
  maxLengthCreator,
  required,
} from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'

function MyPosts(props) {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ))

  let onAddNewPost = (values) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My Posts</h3>
      <AddPostFormRedux onSubmit={onAddNewPost} />
      <div className={styles.posts}>{postsElements}</div>
    </div>
  )
}

const maxLength10 = maxLengthCreator(10)

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          placeholder="post message"
          name="newPostText"
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

export default MyPosts
