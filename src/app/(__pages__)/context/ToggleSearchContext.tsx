'use client'

import { createContext, useState } from "react"
// import { ResultType } from "@/app/lib/types"

const ToggleSearchContextType = {
  isVisibleSearch: false,
  setIsVisibleSearch: (isVisibleSearch: boolean) => {},
}

const ToggleSearchContext = createContext({
  ...ToggleSearchContextType
})

export function ToggleSearchContextProvider({ 
  children 
}: {
  children: React.ReactNode
}) {

  const [isVisibleSearch, setIsVisibleSearch] = useState(false)
    
  const value = {
    isVisibleSearch, setIsVisibleSearch,
  }
  
  return (
    <ToggleSearchContext.Provider value={value}>
      {children}
    </ToggleSearchContext.Provider>
  )
}

export default ToggleSearchContext

