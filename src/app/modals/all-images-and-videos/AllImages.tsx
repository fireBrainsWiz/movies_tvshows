'use client'

import ImagesAndVideosContext from "@/app/(__pages__)/context/ImagesAndVideosContext"
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";
import { TfiClose } from "react-icons/tfi";
import BackdropLogoPosterImageSwiper from "./BackdropLogoPosterImageSwiper";
import { useContext, useEffect, useState } from "react";
import useAllImagesAndVideosStore from "../../(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";
import { IoIosArrowDown } from "react-icons/io";

export default function AllImages() {

  const {
    isVisibleAllImages, setIsVisibleAllImages, images
  } = useAllImagesAndVideosStore()


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

  if (!isVisibleAllImages) return null

  return (
    <div 
      key={isVisibleAllImages ? '1' : '0'}
    // ref={container}
    className={`bg-[#fff] absolute w-full h-screen top-0 z-20 ${isVisibleAllImages ? 'left-0' : 'left-[-100%]'} overflow-y-auto mb-4 pb-[50px]`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseAllImagesClick}>
          <TfiClose title="close button"/>
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
                <p className="flex justify-center gap-4 items-center font-bold capitalize">
                  <span>{isOpenBackdrops ? 'hide backdrops' : 'show backdrops'}</span>
                  <span className={` ${isOpenBackdrops? 'rotate-180': ''} [transition:transform_.3s_ease-in]`}>
                    <IoIosArrowDown size={30} color="#fff"/>
                  </span>
                </p>
              
              
            </button>

            <div 
            // ref={backdropContainer}
              className={` ${isOpenBackdrops?  'h-auto': 'h-0  overflow-hidden py-0'} justify-evenly gap-y-3  px-1p flex flex-wrap [transition:height_3s_ease-in-out] relative`}
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
              <p className="flex justify-center gap-4 items-center font-bold capitalize">
                <span>{isOpenPosters ? 'hide posters' : 'show posters'}</span>
                <span className={` ${isOpenPosters? 'rotate-180': ''} [transition:transform_.3s_ease-in]`}>
                  <IoIosArrowDown size={30} color="#fff"/>
                </span>
              </p>
            </button>

            <div 
              className={` ${isOpenPosters?  'h-auto': 'h-0  overflow-hidden py-0'} justify-evenly gap-y-3  px-1p flex flex-wrap [transition:height_3s_ease-in-out] relative`}
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
              <p className="flex justify-center gap-4 items-center font-bold capitalize">
                <span>{isOpenLogos ? 'hide logos' : 'show logos'}</span>
                <span className={` ${isOpenLogos? 'rotate-180': ''} [transition:transform_.3s_ease-in]`}>
                  <IoIosArrowDown size={30} color="#fff"/>
                </span>
              </p>
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