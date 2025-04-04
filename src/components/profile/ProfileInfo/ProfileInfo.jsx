import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

function ProfileInfo({ profile, status, updateStatus }) {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <div className={styles.descriptionBlock}>
        <img
          src={
            profile.photos.large ||
            'https://cdn-icons-png.flaticon.com/256/5531/5531660.png'
          }
        />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
