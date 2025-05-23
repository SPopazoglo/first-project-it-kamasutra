import axios, { AxiosResponse } from 'axios'
import { ProfileType, UserType } from '../../types/types'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '155c24dc-8220-47e4-8770-ad8fa1b93d2e',
  },
})

type GetUsersResType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
type FollowResType = {
  data: {}
  messages: Array<string>
  resultCode: ResultCodesEnum
}
type UnfollowResType = {
  data: {}
  messages: Array<string>
  resultCode: ResultCodesEnum
}

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<GetUsersResType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },
  follow(id: number) {
    return instance
      .post<FollowResType>(`follow/${id}`)
      .then((response) => response.data)
  },
  unfollow(id: number) {
    return instance
      .delete<UnfollowResType>(`follow/${id}`)
      .then((response) => response.data)
  },
  getProfile(userId: number) {
    console.warn('Obsoled method. Use please profileAPI object.')
    return profileAPI.getProfile(userId)
  },
}

type UpdateStatusResType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}
type SavePhotoResType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  photos: {
    small: string | null
    large: string | null
  }
}
type SaveProfileResType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/` + userId)
      .then((response) => response.data)
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/` + userId)
      .then((response) => response.data)
  },
  updateStatus(status: string) {
    return instance
      .put<UpdateStatusResType>(`profile/status`, { status: status })
      .then((response) => response.data)
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance
      .put<SavePhotoResType>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<SaveProfileResType>(`profile`, profile)
      .then((response) => response.data)
  },
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CapthaIsReguired = 10,
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodeForCaptcha
  messages: Array<string>
}
type LogoutResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance
      .get<MeResponseType>(`auth/me`)
      .then((response) => response.data)
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data)
  },
  logout() {
    return instance
      .delete<LogoutResponseType>(`auth/login`)
      .then((response) => response.data)
  },
}

type GetCaptchaURLResponseType = {
  url: string
}

export const securityAPI = {
  getCaptchaURL() {
    return instance
      .get<GetCaptchaURLResponseType>(`security/get-captcha-url`)
      .then((response) => response.data)
  },
}
