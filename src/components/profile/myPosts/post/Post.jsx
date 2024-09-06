import React from 'react'
import styles from './Post.module.css'

function Post() {
  return (
    <div className={styles.item}>
      <img src="https://img.freepik.com/photos-premium/illustration-hibou-yeux-colores_893012-62564.jpg" />
      Post 1
      <div>
        <span>Like</span>
      </div>
    </div>
  )
}

export default Post
