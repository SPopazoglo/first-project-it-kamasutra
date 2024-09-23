import React from 'react'
import styles from './Post.module.css'

function Post(props) {
  return (
    <div className={styles.item}>
      <img src="https://img.freepik.com/photos-premium/illustration-hibou-yeux-colores_893012-62564.jpg" />
      {props.message}
      <div>
        <span>Like</span> {props.likeCount}
      </div>
    </div>
  )
}

export default Post
