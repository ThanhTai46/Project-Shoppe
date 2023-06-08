import { getAccessTokenFromLS } from '@/utils/auth'
import React, { Dispatch, createContext, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: Boolean
  setAuthenticated: Dispatch<React.SetStateAction<Boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setAuthenticated: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<Boolean>(initialAppContext.isAuthenticated)

  return <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AppContext.Provider>
}
