import React from 'react'
import styles from './ProfileInfo.module.css'

function ProfileInfo() {
  return (
    <div>
      <div>
        <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" />
      </div>
      <div className={styles.descriptionBlock}>ava + description</div>
    </div>
  )
}

export default ProfileInfo
