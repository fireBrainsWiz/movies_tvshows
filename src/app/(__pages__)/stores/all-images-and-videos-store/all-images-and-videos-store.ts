import { create } from 'zustand'
import { CommonTypes } from '@/app/lib/MediaTypeInfoTypes'
import { TrailerType } from '@/app/lib/types'


const useAllImagesAndVideosStore = 
create<AllImagesAndVideosStore>((set) => ({
  isVisibleAllImages: false,
  isVisibleAllVideos: false,

  images: null,
  setImages: (images) => set(_ => ( {images} )),

  setIsVisibleAllImages: (isVisibleAllImages) => 
  set(_ => ( {isVisibleAllImages} )),

  trailers: [],
  setTrailers: (trailers) => set(_ => ( {trailers} )),
  setIsVisibleAllVideos: (isVisibleAllVideos) =>
  set(_ => ( {isVisibleAllVideos} )),

  titleImageImages: null,
  setTitleImageImages: (images) => set(_ => ( {titleImageImages: images} ))
}))

export default useAllImagesAndVideosStore

export type AllImagesAndVideosStore = {
  titleImageImages: CommonTypes['Images'] | null,
  setTitleImageImages: (images: CommonTypes['Images'] | null) => void,
  
  images: CommonTypes['Images'] | null,
  setImages: (images: CommonTypes['Images'] | null) => void,
  isVisibleAllImages: boolean,
  setIsVisibleAllImages: (isVisibleAllImages: boolean) => void,

  trailers: TrailerType[],
  setTrailers: (trailers: TrailerType[]) => void,
  isVisibleAllVideos: boolean,
  setIsVisibleAllVideos: (isVisibleAllVideos: boolean) => void
}


export type Videos = {
  id: number,
  results: TrailerType[]
}

export type Images = {
  id: number,
  stills: CommonTypes['Person']['images']['profiles']
}