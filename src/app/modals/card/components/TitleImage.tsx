import Image from 'next/image';
import { ResultType, ImagePath } from '@/app/lib/types'
import { MediaTypeInfoType, CommonTypes } from '@/app/lib/MediaTypeInfoTypes';
import { memo, useEffect, useMemo, useState } from 'react';
import { steal } from '../lib/colorThief';


export default memo(function TitleImage({
  card, images, setColorThiefColor, className 
}: { 
  card: ResultType, 
  images: CommonTypes['Images'] 
  setColorThiefColor?: React.Dispatch<React.SetStateAction<number[][] | undefined>>
  className?: string
}) {

  const [isLoadingTitleImage, setIsLoadingTitleImage] = useState(true)

  // console.log(images.id) 

  // useMemo(() => {
  //   setIsLoadingTitleImage(true)
  // }, [card.id])

  // console.log(card.id, isLoadingTitleImage)
  
  return (
    <div 
      // key={card.id} 
      className="relative"
      style={{
        maxHeight: isLoadingTitleImage ? '50px' : '300px'
      }}
    >
      {images.logos?.length > 0 &&  isLoadingTitleImage && 
        // <p 
        //   className=" w-full h-full text-white  absolute top-0 flex items-center justify-center bg-red-700p z-10 pt-4 pr-4 animate-pulse text-3xl font-black mx-auto truncate ">
        //   {card.title || card.name}
        // </p>  
        <p 
          className=" w-full h-full text-white absolute top-0 left-0 z-10 animate-pulse text-4xl font-black mx-auto truncate ">
          {card.title || card.name}
        </p>  
      }

      {
        images.logos?.length > 0 
        ? (
          <Image 
            // key={card.id}
            src={
              isLoadingTitleImage
              ? '/no-image-1.webp'
              : ImagePath + images.logos.sort((a, b) => 
                  b.vote_average - a.vote_average
                )[0].file_path || '/no-image-1.webp'
            }
            alt={card.title || card.name || 'no-image'}
            width={300}
            height={300}
            priority
            onLoad={ e => {
              setIsLoadingTitleImage(false)

              if (e.target && setColorThiefColor) {
                setColorThiefColor(steal(e.target))
              }
            }}
            onError={() => setIsLoadingTitleImage(false)}
            style={{opacity: isLoadingTitleImage ? 0 : 1}}
            className={className || ' w-full max-h-[150px] min-h-[70px] h-auto'}
          />

        ) : (
            <h1 className="text-4xl font-black mb-2">
              {card.title || card.name}
            </h1>
          )
      }
    </div>
  )
})





{/* <p className='fixed bg-red-500p     top-0 left-0 w-[80%] grid grid-flow-col gap-4'>
{
  colorThiefColor && (
    colorThiefColor.map((color, i) => (
      <span key={i} className='text-xs'
        style={{background: `rgb(${color[0]},${color[1]},${color[2]})`}}
      >
        {color[0]}, {color[1]}, {color[2]}
      </span>
    )) 
  )
}
</p> */}



