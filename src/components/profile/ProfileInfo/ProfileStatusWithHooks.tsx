import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './ProfileInfo.module.css'

type PropsType = {
  status: string
  updateStatus: (newStatus: string) => void
}

const ProfileStatusWithHooks = (props: PropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  }

  return (
    <div>
      {!editMode && (
        <div>
          <b>Status:</b>{' '}
          <span onDoubleClick={activateEditMode}>{status || 'NO STATUS'}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            autoFocus
            onChange={onStatusChange}
            value={status}
          />
        </div>
      )}
    </div>
  )
}

export default ProfileStatusWithHooks
