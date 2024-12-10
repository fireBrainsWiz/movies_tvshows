import Image from "next/image"
import { ResultType, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import { ImagePath } from "@/app/lib/types"
import { memo, useContext, useEffect, useRef, useState } from "react"
import { MdAddCircleOutline } from "react-icons/md";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
import { SaveOrRemoveFromSavedStore } from "@/app/(__pages__)/components/save/SaveOrRemoveFromSavedStore";
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext";
import { link } from "fs";


export default memo( function BackdropImage({
  card, isLoadingBackdropImage, setIsLoadingBackdropImage, setBackdropImageColor
}: {
  card: ResultType, 
  isLoadingBackdropImage: boolean,
  setIsLoadingBackdropImage: (isLoadingBackdropImage: boolean) => void,
  setBackdropImageColor: (BackdropImageColor: string) => void
}) {

  const imageRef = useRef<HTMLImageElement | null>(null)

  useImagePixel({
    backdrop_path: card.backdrop_path, 
    imageRef, setColor: setBackdropImageColor
  })
  
  const loadingContainerRef = 
  useRef<HTMLParagraphElement | null>(null)
  // console.log(isLoadingImage, n++)

  const {links} = useContext(MoviesOrTVshowsLinksContext)


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

  

  // useEffect(() => {
  //   const image = imageRef.current
  //   if (!image) return

  //   const fn = () => {
  //     setTimeout(() => {
  //       setIsLoadingBackdropImage(false)
  //     }, 1000)
  //   }

  //   image.addEventListener('load', fn)
  //   return () => {
  //     image.removeEventListener('load', fn)
  //   }
  // }, [setIsLoadingBackdropImage, imageRef])

const movieOrTvShowToSave = {...card, show_id: card.id, media_type: links.MEDIATYPE }
// console.log({movieOrTvShowToSave})

  
  return (
    <div className="relative overflow-hidden">
      { isLoadingBackdropImage && 
        <p 
          ref={loadingContainerRef} 
          className=" w-full h-full text-white  absolute top-0 flex items-center justify-center bg-stone-700 z-[1] pt-4 animate-pulse">
          Loading...
        </p>
      }
      
      <div className="relative">
        <Image 
          ref={imageRef}
          alt={card.title || card.name || 'no-image'} 
          src={`${ImagePath}${card.backdrop_path}`} 
          width={3840} 
          height={2160}
          priority
          loading="eager"
          quality={100}
          placeholder="blur"
          blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
          onLoad={() => {
            setTimeout(() => {
              setIsLoadingBackdropImage(false)
            }, 1000)
          }}
          onError={() => {
            setTimeout(() => {
              setIsLoadingBackdropImage(false)
            }, 1000)
          }}
          style={{opacity: isLoadingBackdropImage ? 0 : 1}}
          className={`w-[100%] h-auto [transition:opacity_300ms_ease-in-out] `}
        />
      
        <div className="bg-red-500/10p bg-red-500p ml-4p absolute bottom-0 grid grid-flow-col gap-2 z-10 w-full pl-4">
          <span className=" w-[clamp(30px,7vmin,45px)] h-[clamp(30px,7vmin,45px)]">
            <SaveOrRemoveFromSavedStore 
              item={movieOrTvShowToSave} 
              whatToAlter="movie_tvshow"
          />
          </span>
        </div>
      </div>

    </div>
  )
})

