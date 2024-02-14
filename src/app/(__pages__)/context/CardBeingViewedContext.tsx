'use client'

import { createContext, useState } from "react"
import { ResultType } from "@/app/lib/types"

const cardBeingViewedContextType = {
  isVisibleCardPage: false,
  setIsVisibleCardPage: (isVisibleCardPage: boolean) => {},
  card: {} as ResultType,
  setCard: (card: ResultType) => {},
  scrollTop: 0,
  setScrollTop: (scrollTop: number) => {},
}

const CardBeingViewedContext = createContext({
  ...cardBeingViewedContextType
})

export function CardBeingViewedContextProvider({ 
  children 
}: {
  children: React.ReactNode
}) {

  const [isVisibleCardPage, setIsVisibleCardPage] = useState(false)
  const [card, setCard] = useState({} as ResultType)
  const [scrollTop, setScrollTop] = useState(0)

    
  const value = {
    isVisibleCardPage, setIsVisibleCardPage,
    card, setCard,
    scrollTop, setScrollTop
  }
  
  return (
    <CardBeingViewedContext.Provider value={value}>
      {children}
    </CardBeingViewedContext.Provider>
  )
}

export default CardBeingViewedContext

