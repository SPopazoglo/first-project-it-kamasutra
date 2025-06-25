import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import {
  createField,
  GetStringKeys,
  Textarea,
} from '../../../common/FormsControls/FormsControls'
import { required } from '../../../../utils/validators/validators'
import styles from '../MyPosts.module.css'

type AddPostFormOwnProps = {}
export type AddPostFormValuesType = {
  newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, AddPostFormOwnProps> &
    AddPostFormOwnProps
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          'Your post',
          'newPostText',
          Textarea,
          [required]
        )}
      </div>
      <div>
        <button>add post</button>
      </div>
    </form>
  )
}

export default reduxForm<AddPostFormValuesType, AddPostFormOwnProps>({
  form: 'profileAddPostForm',
})(AddPostForm)
