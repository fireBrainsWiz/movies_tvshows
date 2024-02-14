import Image from "next/image"
import { ResultType, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import { ImagePath } from "@/app/lib/types"
import { useEffect, useRef, useState } from "react"
import { MdAddCircleOutline } from "react-icons/md";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
// import {ThemeContextType} from "@/app/(__pages__)/context/ThemeContext";


export function BackdropImage({
  card, isLoadingBackdropImage, setIsLoadingBackdropImage, setBackdropImageColor
}: {
  card: ResultType, 
  isLoadingBackdropImage: boolean,
  setIsLoadingBackdropImage: (isLoadingBackdropImage: boolean) => void,
  setBackdropImageColor: (BackdropImageColor: string) => void
}) {

  const imageRef = useRef<HTMLImageElement | null>(null)

  useImagePixel({
    card, imageRef, setColor: setBackdropImageColor
  })
  
  const loadingContainerRef = 
  useRef<HTMLParagraphElement | null>(null)
  // console.log(isLoadingImage, n++)


  useEffect(() => {
    const img = imageRef.current
    const p = loadingContainerRef.current
    if (!p || !img) return

    const fn = () => {
      const { width, height } = img
      p.style.width = `${width}px`
      p.style.height = `${height}px`
    }
    fn()
    
    addEventListener('resize', fn)
    return () => {
      removeEventListener('resize', fn)
    }
  }, [loadingContainerRef, imageRef])

  useEffect(() => {
    const image = imageRef.current
    const fn = () => {
      setTimeout(() => {
        setIsLoadingBackdropImage(false)
      }, 1000)
    }

    if (!image) return

    image.addEventListener('load', fn)
    return () => {
      image.removeEventListener('load', fn)
    }
  }, [setIsLoadingBackdropImage, imageRef])


  
return (
  <div className="relative">
    { isLoadingBackdropImage && 
      <p 
        ref={loadingContainerRef} 
        className=" w-full h-full text-white  absolute top-0 flex items-center justify-center bg-blue-700/20 z-[1] pt-4">
        Loading...
      </p>
    }
    
    <div className="relative bg-green-600p ">
      <Image 
      ref={imageRef}
      alt={card.title || card.name} 
      src={`${ImagePath}${card.backdrop_path}`} 
      width={3840} height={2160}
      priority
      loading="eager"
      quality={100}
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
      style={{opacity: isLoadingBackdropImage ? 0 : 1}}
      className={`w-[100%] h-auto [transition:opacity_300ms_ease-in-out] `}
    />
    
      <button className="bg-stone-500/10 ml-4 absolute bottom-0 grid  grid-flow-col gap-2 place-items-center ">
        <span className=" w-[clamp(30px,7vmin,45px)] h-[clamp(30px,7vmin,45px)]">
          <MdAddCircleOutline color="white" size={'100%'}/>
        </span>
        Add to list
      </button>
    </div>

  </div>
)
}

