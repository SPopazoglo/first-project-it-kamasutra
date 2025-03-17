import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '155c24dc-8220-47e4-8770-ad8fa1b93d2e',
  },
})

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },
  follow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data)
  },
  unfollow(id) {
    return instance.delete(`follow/${id}`).then((response) => response.data)
  },
}
