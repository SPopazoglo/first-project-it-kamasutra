import React from 'react'
import MyPosts from './myPosts/MyPosts'
import styles from './Profile.module.css'

function Profile() {
  return (
    <div className={styles.content}>
      <div>
        <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" />
      </div>
      <div>ava + description</div>
      <MyPosts />
    </div>
  )
}

export default Profile
