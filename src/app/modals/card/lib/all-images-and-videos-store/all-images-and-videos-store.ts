import { create } from 'zustand'
import { AllImagesAndVideosStore } from '@/app/lib/types'


const useAllImagesAndVideosStore = 
create<AllImagesAndVideosStore>((set) => ({
  isVisibleAllImages: false,
  isVisibleAllVideos: false,

  setIsVisibleAllImages: (isVisibleAllImages) => 
  set(_ => ( {isVisibleAllImages} )),

  setIsVisibleAllVideos: (isVisibleAllVideos) =>
  set(_ => ( {isVisibleAllVideos} ))


}))

export default useAllImagesAndVideosStore
