import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"


export default function ImageGalleryImage<T extends MediaTypeInfoType['images']['posters'][0]>(
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
      className="m-[1px] relative bg-red-600 w-full"
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
            className=" w-fullp h-full text-white  absolute top-0 bottom-0 flex items-center justify-center bg-stone-700 z-[1] pt-4 animate-pulse"
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
        alt=''
        width={200}
        height={300}
        placeholder="blur"
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={() => {
          // setNoImageUrl('/no-image.png')
          setIsLoading(false)
        }}
        priority
        className={`${type === 'posters' ? 'md:w-[30%]': 'md:w-[90%] h-auto'} w-full h-auto min-w-[150px] mx-auto`}
      />
    </button>
  )
}

const posterStyle = 'md:w-1/2'