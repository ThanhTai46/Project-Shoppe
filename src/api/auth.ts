import http from '@/utils/http'
import path from '@/constants/path'

type RegisterBody = {
  email: string
  password: string
}

const authAPI = {
  registerAccount(body: RegisterBody) {
    return http.post(path.register, body)
  },
  loginAccount(body: RegisterBody) {
    return http.post(path.login, body)
  },
  logout() {
    return http.post(path.logout)
  }
}

export default authAPI
