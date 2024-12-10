'use client'

import { createContext, useState } from "react";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";

type ToggleShowPersonContextType = {
  isVisiblePerson: boolean,
  setIsVisiblePerson: (isVisiblePerson: boolean) => void,
  personDetails: MediaTypeInfoType['personDetails'],
  setPersonDetails: (personDetails: MediaTypeInfoType['personDetails']) => void
  prsonCompZIndex: number,
  setPrsonCompZIndex: (prsonCompZIndex: number) => void
}

const ToggleShowPersonContext = createContext<ToggleShowPersonContextType>({
  isVisiblePerson: false,
  setIsVisiblePerson: (isVisiblePerson: boolean) => {},
  personDetails: {} as MediaTypeInfoType['personDetails'],
  setPersonDetails: (personDetails: MediaTypeInfoType['personDetails']) => {},
  prsonCompZIndex: 20,
  setPrsonCompZIndex: (prsonCompZIndex: number) => {}
})

export function ToggleShowPersonContextProvider({
  children
}: { 
  children: React.ReactNode
}) {
  const [isVisiblePerson, setIsVisiblePerson] = useState(false)
  const [personDetails, setPersonDetails] = 
  useState({} as MediaTypeInfoType['personDetails'])
  const [prsonCompZIndex, setPrsonCompZIndex] = 
  useState(20)

  const value = {
    isVisiblePerson, setIsVisiblePerson,
    personDetails, setPersonDetails,
    prsonCompZIndex, setPrsonCompZIndex
  }

  return (
    <ToggleShowPersonContext.Provider value={value}>
      {children}
    </ToggleShowPersonContext.Provider>
  )
}


export default ToggleShowPersonContext
