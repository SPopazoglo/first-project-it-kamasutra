import React from 'react'
import styles from './users.module.css'

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photoURL:
          'https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2B.jpg',
        followed: false,
        fullName: 'Sergi',
        status: 'I am a boss',
        location: { city: 'Minsk', country: 'Belarus' },
      },
      {
        id: 2,
        photoURL:
          'https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2B.jpg',
        followed: true,
        fullName: 'Dmitry',
        status: 'I am a boss too',
        location: { city: 'Moscow', country: 'Russia' },
      },
      {
        id: 3,
        photoURL:
          'https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2B.jpg',
        followed: false,
        fullName: 'Natali',
        status: 'I am a boss too',
        location: { city: 'Odessa', country: 'Ukraine' },
      },
    ])
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoURL} className={styles.userPhoto} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id)
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id)
                  }}
                >
                  follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Users
