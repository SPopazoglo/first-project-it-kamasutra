import { GetItemsResType, instance, APIResponseType } from './api'

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<GetItemsResType>(`users?page=${currentPage}&count=${pageSize}`)
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
