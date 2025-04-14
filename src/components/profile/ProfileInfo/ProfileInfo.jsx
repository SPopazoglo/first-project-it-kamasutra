import React from 'react'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import Preloader from '../../common/preloader/Preloader'
import styles from './ProfileInfo.module.css'

function ProfileInfo({ profile, status, updateStatus, isOwner, savePhoto }) {
  if (!profile) {
    return <Preloader />
  }

  const onMaimPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={styles.descriptionBlock}>
        <img
          src={
            profile.photos.large ||
            'https://cdn-icons-png.flaticon.com/256/5531/5531660.png'
          }
          className={styles.image}
        />
        {isOwner && <input type="file" onChange={onMaimPhotoSelected} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo
