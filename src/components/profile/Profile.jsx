import React from 'react'
import MyPosts from './myPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import styles from './Profile.module.css'

function Profile(props) {
  return (
    <div>
      <ProfileInfo />
      <MyPosts postsData={props.state.postsData} />
    </div>
  )
}

export default Profile
