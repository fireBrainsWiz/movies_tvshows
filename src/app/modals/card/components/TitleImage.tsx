import Image from 'next/image';
import { ResultType, ImagePath } from '@/app/lib/types'
import { MediaTypeInfoType } from '@/app/lib/MediaTypeInfoTypes';
import { useMemo, useState } from 'react';

export default function TitleImage({
  card, images 
}: { 
  card: ResultType, 
  images: MediaTypeInfoType['images'] 
}) {

  const [isLoadingBackdropImage, setIsLoadingBackdropImage] = useState(true)

  useMemo(() => {
    setIsLoadingBackdropImage(true)
  }, [card.id])
  
  return (
    <div className="relative">
      {images.logos?.length > 0 &&  isLoadingBackdropImage && 
        <p 
          
          className=" w-full h-full text-white  absolute top-0 flex items-center justify-center bg-blue-700/20 z-[1] pt-4 animate-pulse">
          Loading...
        </p>
      }
      
      {
          images.logos?.length > 0 && (
          <Image 
            src={
              ImagePath + images.logos.sort((a, b) => 
                b.vote_average - a.vote_average
              )[0].file_path
            }
            alt={card.title || card.name}
            width={100}
            height={100}
            onLoad={() => {
              setTimeout(() => {
                setIsLoadingBackdropImage(false)
              }, 3000)
            }}
            onError={() => {
              setIsLoadingBackdropImage(false)
              setTimeout(() => {
                setIsLoadingBackdropImage(false)
              }, 3000)
            }}
            style={{
              opacity: isLoadingBackdropImage ? 0 : 1
            }}
            className="w-full max-w-[100px] h-auto"
          />
        )
      }
    </div>
  )
}