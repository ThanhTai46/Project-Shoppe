import { ResponseApi } from "@/types/utils"
import { User } from "@/types/user"

export type AuthResponse = ResponseApi<{
    access_token: string,
    expires: string,
    user: User
}>

