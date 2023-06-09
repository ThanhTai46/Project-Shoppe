import { User } from '@/types/user'
import { getAccessTokenFromLS, getProfile } from '@/utils/auth'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  profile: User | null
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfile()
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const profile = initialAppContext.profile || null
  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile }}>{children}</AppContext.Provider>
}
