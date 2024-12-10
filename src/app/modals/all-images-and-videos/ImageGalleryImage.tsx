import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes"

export default function ImageGalleryImage<T extends CommonTypes['Images']['posters'][0]>(
  {image, type
  }: {
    image: T,
    type: 'backdrops' | 'posters' | 'logos',
  }
  ) {


  const loadingContainerRef = 
  useRef<HTMLParagraphElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

    
  // const [noImageUrl, setNoImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [imageURL, setImageURL] = useState(
    ImagePath + image.file_path || '/no-image.png'
  )
  const [isLightOpacity, setIsLightOpacity] = useState(false)

  useEffect(() => {
    setIsLoading(true)
  }, [])


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

  

  return (
    <button 
      className="m-[1px] relative w-full"
      onClick={() => {
        setIsLightOpacity(!isLightOpacity)
      }}
      style={{
        opacity: isLightOpacity ? 0.5 : 1
      }}
    >
      {
        isLoading &&(
          <p 
            ref={loadingContainerRef}
            className=" w-full mx-auto h-full text-white  absolute top-0 left-0 right-0 flex items-center justify-center bg-stone-700 z-[1] pt-4 animate-pulse max-h-[55vh]"
            >
            Loading...
          </p>
        )
      }
      {/* {
        !isOpenSingleImageSwiper && (
          1
        )
      } */}
      <Image 
        onDragStart={e => e.preventDefault()}
        ref={imageRef}
        src={imageURL}
        alt={image.file_path}
        width={800}
        height={800}
        placeholder="blur"
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        // sizes="(100vw - 2rem) 33vw, (100vw - 2rem) 50vw, 33vw"
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={() => {
          // setNoImageUrl('/no-image.png')
          setIsLoading(false)
        }}
        priority
        className={`${type === 'posters' ? 'md:w-[30%]': 'md:w-[90%] h-auto'} w-full h-auto min-w-[150px] mx-auto ${type === 'logos' ? 'max-h-[300px]' : 'h-auto'}`}
      />
    </button>
  )
}

// const posterStyle = 'md:w-1/2'