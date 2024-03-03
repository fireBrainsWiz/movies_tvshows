'use client'

import { createContext, PropsWithChildren, useState } from "react"

const ImagesAndVideosContextDefaultValue = {
  isVisibleAllImages: true,
  setIsVisibleAllImages: (isVisibleAllImages: boolean) => {},
  isVisibleAllVideos: false,
  setIsVisibleAllVideos: (isVisibleAllVideos: boolean) => {}
}

const ImagesAndVideosContext = createContext(
  ImagesAndVideosContextDefaultValue
)

export function ImagesAndVideosContextProvider({
  children
}: PropsWithChildren<{}>) {

  const [isVisibleAllImages, setIsVisibleAllImages] = 
  useState(false) 
  const [isVisibleAllVideos, setIsVisibleAllVideos] =
  useState(false)

  const value = {
    isVisibleAllImages, setIsVisibleAllImages,
    isVisibleAllVideos, setIsVisibleAllVideos
  }
  
  return (
    <ImagesAndVideosContext.Provider
      value={value}
    >
      {children}
    </ImagesAndVideosContext.Provider>
  )
  
}

export default ImagesAndVideosContext

