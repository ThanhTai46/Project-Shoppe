import { User } from '@/types/user'

export const setAccessTokenLocalStorage = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfile = (data: User) => {
  return localStorage.setItem('profile', JSON.stringify(data))
}
