import { User } from '@/types/user'
import { SuccessResponse } from './utils'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
