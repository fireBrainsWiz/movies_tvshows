'use client'

import { createContext, useState } from "react"

export type ThemeContextType = {
  backdropImageColor: string,
  setBackdropImageColor: (backdropImageColor: string) => void
  isLoadingBackdropImage: boolean
  setIsLoadingBackdropImage: (isLoadingBackdropImage: boolean) => void
}

const defaultThemeContext: ThemeContextType = {
  backdropImageColor: '',
  setBackdropImageColor: (backdropImageColor: string) => {},
  isLoadingBackdropImage: true,
  setIsLoadingBackdropImage: (isLoadingBackdropImage: boolean) => {}
}

const ThemeContext = createContext<ThemeContextType>(
  defaultThemeContext
)

export  function ThemeContextProvider(
  { children }: {children: React.ReactNode}
  ) {
    const [backdropImageColor, setBackdropImageColor] = 
    useState('')
    const [isLoadingBackdropImage, setIsLoadingBackdropImage] = useState(true)

    const value = {
      backdropImageColor, setBackdropImageColor,
      isLoadingBackdropImage, setIsLoadingBackdropImage
    }
    
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext