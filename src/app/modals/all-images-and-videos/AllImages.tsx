'use client'

import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";
import ImagesAndVideosContext from "@/app/(__pages__)/context/ImagesAndVideosContext"
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import axios from "axios";
import { useContext, useEffect } from "react"
import { TfiClose } from "react-icons/tfi";
import AllImagesImage from "./AllImagesImage";



export default function AllImages() {

  const {
    isVisibleAllImages, setIsVisibleAllImages,
  } = useContext(ImagesAndVideosContext)

  const {links} = useContext(MoviesOrTVshowsLinksContext)
  const {card} = useContext(CardBeingViewedContext)
  const {images, setImages} = useContext(MoviesOrTVshowsInfoContext)!

  function handleCloseAllImagesClick() {
    setIsVisibleAllImages(false)
  }

  useEffect(() => {
    if(!isVisibleAllImages) return

    async function getImages() {
      try {
        const {data}: {data: typeof images} = await axios(
          `${
            links.INFOS.images.beforeStr}${card.id}${links.INFOS.images.afterStr
            }`,
          TMDBOptions
        ) 
        // console.log(data)
        setImages(data)

      } catch (error) {
        console.log(error)
      }
    }  
    getImages()
  }, [
    isVisibleAllImages, setImages, card.id, links.INFOS.images.beforeStr, links.INFOS.images.afterStr
  ])

  return (
    <div 
    className={`bg-[#024149ee] absolute w-full h-screen top-0 z-10 ${isVisibleAllImages ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out] overflow-y-auto mb-4`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseAllImagesClick}>
          <TfiClose />
        </button>
      </div>

      <div>
        <AllImagesImage />
      </div>
    </div>
  )
}