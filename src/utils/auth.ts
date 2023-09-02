import { User } from '@/types/user'

export const setAccessTokenLocalStorage = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const LocalStorageEventTarget = new EventTarget();

export const CLEAR_LOCAL_STORAGE = 'clearLS'
export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event(CLEAR_LOCAL_STORAGE);
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfile = (data: User | null) => {
  return localStorage.setItem('profile', JSON.stringify(data))
}
