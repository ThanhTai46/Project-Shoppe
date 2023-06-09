import http from '@/utils/http'
import path from '@/utils/path'

type RegisterBody = {
  email: string
  password: string
}

export const registerAccount = (body: RegisterBody) => http.post(path.register, body)

export const loginAccount = (body: RegisterBody) => http.post(path.login, body)

export const logout = () => http.post(path.logout)
