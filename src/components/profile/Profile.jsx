import React from 'react'
import MyPosts from './myPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import styles from './Profile.module.css'

function Profile() {
  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  )
}

export default Profile
