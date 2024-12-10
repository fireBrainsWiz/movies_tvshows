import { PartsType } from "./Parts"
import { ImagePath } from "@/app/lib/types"
import Image from "next/image"
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
import lightOrDark from "@/app/client/helpers/lightOrDark";
import getColor from "@/app/client/helpers/getColor";


export default function PartMain({
  part,
  partSelectorSelectedIndex,
  setPartSelectorSelectedIndex,
  partsLen,
  isLoadingCollectionPartsModalImage,
  setIsLoadingCollectionPartsModalImage,
}:{
  part: PartsType[0] | null
  partSelectorSelectedIndex: number
  setPartSelectorSelectedIndex: (_: number) => void
  partsLen: number
  isLoadingCollectionPartsModalImage: boolean
  setIsLoadingCollectionPartsModalImage: (_: boolean) => void
}) {

  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageColor, setImageColor] = useState('')



  useImagePixel({
    backdrop_path: part?.backdrop_path || '/no-image.png', 
    imageRef, 
    setColor: setImageColor
  })

  let brightness = lightOrDark(getColor(imageColor || 'rgb(22 6 6 / 1)'));
  // console.log(imageColor, {gC:getColor(imageColor)})


  const styleOnLight = brightness === 'light'
    ? ' bg-stone-600/60 text-black' : ''
  ;

  
  return (
    <div className={`h-full flex flex-wrap bg-blue-500p overflow-auto`}
      style={{
        background: imageColor 
      }}
    >
      <div className={`w-1/2 h-[90%]p bg-green-600p pl-5 ${styleOnLight} hidden sm:block`}>
        <p className=" px-4 pt-2 pb-10 capitalize font-bold">{part && part.media_type}</p>
        <h3 className=" px-4 mb-[clamp(0px,3vmax,50px)] text-[clamp(20px,5vmin,60px)]  leading-[1] font-black max-h-[250px] max-[680px]:max-h-[100px] overflow-hidden overflow-y-scroll">{part && part.title}</h3>
        <p className=" px-4 mb-[clamp(0px,3vmax,50px)] max-h-[100px] overflow-hidden overflow-y-auto bg-green-500p text-lg font-bold">{part && part.overview}</p>
        <p className=" px-4 bg-red-500p">
          <button className="w-[clamp(200px,15vmax,600px)] border border-white bg-green-600p px-3 rounded-full flex items-center justify-around">
          <span className="text-xl font-bold">More Info</span>
          <span><HiMiniArrowLongRight size={30}/></span>
          </button>
        </p>
      </div>

      <div className={`w-full h-[91%] flex bg-red-500/10p justify-center p-2 sm:w-1/2  ${styleOnLight}`}>
        {
          part && (
            <div className={`w-full h-full relative flex justify-center sm:justify-end`}>
              { isLoadingCollectionPartsModalImage && 
                  <p 
                    // ref={loadingContainerRef} 
                    className=" w-full h-full text-white  absolute top-0 flex items-center justify-center bg-blue-700/20 z-[1] pt-4 animate-pulse">
                    Loading...
                  </p>
                }


                <Image 
                ref={imageRef}
                src={part.poster_path? ImagePath + part.poster_path : '/no-image.png'} 
                alt={part.title} 
                width={400} 
                height={600} 

                onLoad={() => {
                  setTimeout(() => {
                    setIsLoadingCollectionPartsModalImage(false)
                  }, 1000)
                }}
                onError={() => {
                  setTimeout(() => {
                    setIsLoadingCollectionPartsModalImage(false)
                  }, 1000)
                }}

                style={{opacity: isLoadingCollectionPartsModalImage ? 0 : 1}}
                className={`max-w-fullp w-auto h-auto max-h-[100%] [transition:opacity_300ms_ease-in-out] object-coverp rounded-md`}
              />
            </div>
          )
        }
      </div>

      <div className={`w-full h-[90%]p bg-yellow-500/50p pl-5p ${styleOnLight} block sm:hidden`}>
        <p className=" px-4 pt-2 pb-10 capitalize">{part && part.media_type}</p>
        <h3 className=" px-4 mb-[clamp(0px,3vmax,50px)] text-[clamp(20px,10vmin,60px)]  leading-[1] font-bold max-h-[250px]p max-[680px]:max-h-[100px]p overflow-hidden overflow-y-scroll">{part && part.title}</h3>
        <p className=" px-4 mb-[clamp(0px,3vmax,50px)] max-h-[300px] overflow-hidden overflow-y-auto bg-green-500p text-lg font-bold">{part && part.overview}</p>
        <p className="bg-red-500p my-10">
          <button className="w-[clamp(200px,15vmax,600px)] border border-white bg-green-600p px-3p rounded-full flex items-center justify-around mx-auto">
          <span className="text-xl my-1">More Info</span>
          <span><HiMiniArrowLongRight size={30}/></span>
          </button>
        </p>
      </div>

      <div className="w-full h-[9%] bg-stone-600/50 flex items-center justify-between pl-4">
        <p className="underline capitalize">{part && part.original_language}</p>
        <p className=" flex gap-10 text-2xl">
          <button className="p-4 bg-amber-600/60p"
            onClick={()=> setPartSelectorSelectedIndex(
              partSelectorSelectedIndex>1
              ? partSelectorSelectedIndex-1 : partSelectorSelectedIndex
            )}
          >
            <MdArrowBackIosNew 
              color={ partSelectorSelectedIndex>1
                ? 'white' : 'grey'}
            />
          </button>
          <button className="p-4 bg-cyan-600/60p"
            onClick={()=> setPartSelectorSelectedIndex(
              partSelectorSelectedIndex < partsLen
              ? partSelectorSelectedIndex+1 : partSelectorSelectedIndex
            )}
          >
            <MdArrowForwardIos 
              color={partSelectorSelectedIndex < partsLen
                ? 'white' : 'grey'}
            />
          </button>
        </p>
      </div>
    </div>
  )
}



