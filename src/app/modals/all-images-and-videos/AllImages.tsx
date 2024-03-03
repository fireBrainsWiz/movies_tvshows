'use client'

import ImagesAndVideosContext from "@/app/(__pages__)/context/ImagesAndVideosContext"
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";
import { TfiClose } from "react-icons/tfi";
import BackdropLogoPosterImageSwiper from "./BackdropLogoPosterImageSwiper";
import { useContext, useEffect, useState } from "react";
import useAllImagesAndVideosStore from "../card/lib/all-images-and-videos-store/all-images-and-videos-store";



export default function AllImages() {

  const {
    isVisibleAllImages, setIsVisibleAllImages,
  } = useAllImagesAndVideosStore()

  const {images} = useContext(MoviesOrTVshowsInfoContext)!

  const [isOpenBackdrops, setIsOpenBackdrops] = useState(true) 
  const [isOpenPosters, setIsOpenPosters] = useState(
    false
  )
  const [isOpenLogos, setIsOpenLogos] = useState(
    false
  )



  function handleCloseAllImagesClick() {
    setIsVisibleAllImages(false)
    // setImages({} as typeof images)
  }


  return (
    <div 
    // ref={container}
    className={`bg-[#024149ee] absolute w-full h-screen top-0 z-10 ${isVisibleAllImages ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out] overflow-y-auto mb-4 pb-[50px]`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseAllImagesClick}>
          <TfiClose />
        </button>
      </div>


      {
        // isVisibleAllImages
        // ? (
            <div>
          {
          images?.backdrops?.[0]  && (
          <div className="my-12">
          <button 
          className="block w-full bg-slate-500 text-center  my-4 p-2"
          onClick={() => setIsOpenBackdrops(!isOpenBackdrops)}>
            {isOpenBackdrops ? 'hide backdrops' : 'show backdrops'}
          </button>

          <div 
          // ref={backdropContainer}
          className={` bg-red-500p ${isOpenBackdrops?  'h-auto': 'h-0  overflow-hidden py-0'} justify-evenly gap-y-3  px-1p flex flex-wrap [transition:height_3s_ease-in-out] relative`}
          >
          {
            ('backdrops' in images) && (
              <BackdropLogoPosterImageSwiper 
                images={images.backdrops} 
                type="backdrops"
                isVisibleAllImages={isVisibleAllImages}
              />
            )
          }
          </div>
          </div>
          )
          }


          {
          images?.posters?.[0]  && (
          <div className="my-12">
          <button 
          className="block w-full bg-slate-500 text-center my-4 p-2"
          onClick={() => setIsOpenPosters(!isOpenPosters)}>
          {isOpenPosters ? 'hide posters' : 'show posters'}
          </button>

          <div 
          className={` bg-red-500p ${isOpenPosters?  'h-auto': 'h-0  overflow-hidden py-0'} justify-evenly gap-y-3  px-1p flex flex-wrap [transition:height_3s_ease-in-out] relative`}
          >
          {
            ('posters' in images) && (
              <BackdropLogoPosterImageSwiper 
                images={images.posters} 
                type="posters"
                isVisibleAllImages={isVisibleAllImages}
              />
            )
          }
          </div>
          </div>
          )
          }


          {
          images?.logos?.[0]  && (
          <div className="my-12">
          <button 
          className="block w-full bg-slate-500 text-center  my-4 p-2"
          onClick={() => setIsOpenLogos(!isOpenLogos)}>
          {isOpenLogos ? 'hide logos' : 'show logos'}
          </button>

          <div 
          className={` bg-red-500p ${isOpenLogos?  'h-auto': 'h-0  overflow-hidden py-0'} justify-evenly gap-y-3  px-1p flex flex-wrap [transition:height_3s_ease-in-out] relative`}
          >
          {
            ('logos' in images) && (
              <BackdropLogoPosterImageSwiper 
                images={images.logos} 
                type="logos"
                isVisibleAllImages={isVisibleAllImages}
              />
            )
          }
          </div>
          </div>
          )
          }



            </div>
        // ) : null
      }
    </div>
  )
}