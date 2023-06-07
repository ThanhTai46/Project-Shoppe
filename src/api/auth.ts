import http from '@/utils/http'

type RegisterBody = {
  email: string
  password: string
}

export const registerAccount = (body: RegisterBody) => http.post('/register', body)

export const loginAccount = (body: RegisterBody) => http.post('/login', body)
