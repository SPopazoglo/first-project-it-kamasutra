import {
  instance,
  ResultCodeForCaptcha,
  ResultCodesEnum,
  APIResponseType,
} from './api'

type MeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  me() {
    return instance
      .get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then((response) => response.data)
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodesEnum | ResultCodeForCaptcha
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data)
  },
  logout() {
    return instance
      .delete<APIResponseType>(`auth/login`)
      .then((response) => response.data)
  },
}
