'use client'

import { createContext, useState } from "react"
// import { ResultType } from "@/app/lib/types"

const ToggleMenuContextType = {
  isVisibleMenu: false,
  setIsVisibleMenu: (isVisibleMenu: boolean) => {},
}

const ToggleMenuContext = createContext({
  ...ToggleMenuContextType
})

export function ToggleMenuContextProvider({ 
  children 
}: {
  children: React.ReactNode
}) {

  const [isVisibleMenu, setIsVisibleMenu] = useState(false)
    
  const value = {
    isVisibleMenu, setIsVisibleMenu,
  }
  
  return (
    <ToggleMenuContext.Provider value={value}>
      {children}
    </ToggleMenuContext.Provider>
  )
}

export default ToggleMenuContext

