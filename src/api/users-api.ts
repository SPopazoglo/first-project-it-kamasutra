import { GetItemsResType, instance, APIResponseType } from './api'

export const usersAPI = {
  getUsers(
    currentPage: number,
    pageSize: number,
    term: string = '',
    friend: null | boolean = null
  ) {
    return instance
      .get<GetItemsResType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`)
      )
      .then((res) => res.data)
  },
  follow(id: number) {
    return instance
      .post<APIResponseType>(`follow/${id}`)
      .then((res) => res.data)
  },
  unfollow(id: number) {
    return instance
      .delete<APIResponseType>(`follow/${id}`)
      .then((res) => res.data)
  },
}
