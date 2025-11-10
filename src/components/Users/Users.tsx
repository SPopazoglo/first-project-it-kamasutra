import React, { useEffect } from 'react'
import User from './User'
import Paginator from '../common/Paginator/Paginator'
import UsersSearchForm from './UsersSearchForm'
import {
  FilterType,
  follow,
  unfollow,
  requestUsers,
} from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/reduxStore'

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsers)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const followw = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfolloww = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            key={u.id}
            user={u}
            followingInProgress={followingInProgress}
            follow={followw}
            unfollow={unfolloww}
          />
        ))}
      </div>
    </div>
  )
}
