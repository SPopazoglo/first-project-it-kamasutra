import { instance } from './api'

type GetCaptchaURLResponseType = {
  url: string
}

export const securityAPI = {
  getCaptchaURL() {
    return instance
      .get<GetCaptchaURLResponseType>(`security/get-captcha-url`)
      .then((res) => res.data)
  },
}
