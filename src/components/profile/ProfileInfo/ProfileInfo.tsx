import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import Preloader from '../../common/preloader/Preloader'
import styles from './ProfileInfo.module.css'
import ProfileDataFormReduxForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../../types/types'

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    // todo: remove then
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
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
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataFormReduxForm
            initialValues={profile}
            onSubmit={onSubmit}
            profile={profile}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true)
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  goToEditMode,
}) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professionals skills:</b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b>{' '}
        {Object.keys(profile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key as keyof ContactsType]}
          />
        ))}
      </div>
    </div>
  )
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  )
}

export default ProfileInfo
