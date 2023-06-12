import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { clearLocalStorage, getAccessTokenFromLS, setAccessTokenLocalStorage, setProfile } from './auth'
import { AuthResponse } from '@/types/auth'
import path from '@/constants/path'

const apiKey = import.meta.env.VITE_URL
class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: apiKey,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          this.accessToken = (response.data as AuthResponse).data.access_token
          setAccessTokenLocalStorage(this.accessToken)
          const profile = (response.data as AuthResponse).data.user
          setProfile(profile)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.data !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
