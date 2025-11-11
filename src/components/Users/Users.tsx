import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import Paginator from '../common/Paginator/Paginator'
import {
  FilterType,
  follow,
  unfollow,
  requestUsers,
} from '../../redux/usersReducer'
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

type QueryParamsType = {
  term?: string
  page?: string
  friend?: string
}

export const Users: React.FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const users = useSelector(getUsers)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const query = queryString.parse(location.search) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!query.page) actualPage = Number(query.page)

    if (!!query.term)
      actualFilter = { ...actualFilter, term: query.term as string }

    switch (query.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    navigate(`?${queryString.stringify(query)}`)
  }, [filter, currentPage])

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
