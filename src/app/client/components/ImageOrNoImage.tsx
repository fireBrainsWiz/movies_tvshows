'use client'

import { ImagePath } from "@/app/lib/types"
import axios from "axios"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { TMDBOptions } from "../helpers/TMDB_API"
import { CommonTypes, MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"


export default function ImageOrNoImage({
  bgColor = '#623480',
  children,
  hasImagePath,
  horizontal,
  collectionId 
}:{
  children?: React.ReactNode
  bgColor?: string
  hasImagePath: boolean
  horizontal?: boolean
  collectionId: number
}) {

  const [collectionImages, setCollectionImages] = useState<CollectionImages | null>(null)

  useEffect(() => {
    ;(async () =>{
      if (hasImagePath || !collectionId) return

      try {
        const collectionImages: CollectionImages = 
        await axios(
          `https://api.themoviedb.org/3/collection/${collectionId}/images?`,
          TMDBOptions
        ).then(res => res.data)

        setCollectionImages(collectionImages)

      } catch (error) {
        console.log(error)
      }
    })()

  }, [collectionId, hasImagePath])


  const image = useMemo(() => {
    let image = collectionImages?.posters.find(image => image.file_path)
    if (!image) image = collectionImages?.backdrops.find(image => image.file_path)
    return image
  }, [collectionImages])

  
  return (
  <div className={`${horizontal?'relative' : 'h-full w-full flex justify-center relative rounded-md overflow-hidden'} ${!hasImagePath ? bgColor : ''}`
  }
    style={!hasImagePath ? {
      // backgroundColor: `rgba(${bgColor}, 0.7)`
    }: {}}
  >
    {children}

    {
      !hasImagePath &&
      <div className={
        horizontal 
        ? `absolute bottom-0 w-full h-full  ` 
        :`absolute top-0 bottom-0 w-full h-full`
      }>
        <Image 
          className={
            horizontal 
            ? `scale-75 -mt-10p mt-[clamp(-30px,-10vmin,-15px)] ` 
            :`bg-red-500p mx-auto` 
          }
          src={horizontal
            ? '/no-image-1.webp' 
            : image?.file_path ? ImagePath + image.file_path : '/no-image-2.webp'
          } 
          alt={''}
          width={200*1.3}
          height={300*1.3}
        />

        {
          horizontal? 
          <div className="absolute mt-[clamp(0px,300vmin,100px)] bottom-0 w-full h-fullp text-[10px] leading-[14px]">
            <p className="">NO IMAGE</p>
            <p>(yet)</p>
          </div>
          : 
          <div className="text-[clamp(15px,4vmin,25px)]">
            <p className="text-2xlp">NO IMAGE</p>
            <p>(yet)</p>
          </div>
        }
      </div>
    }
  </div>
  )
}



type CollectionImages = {
  id: number
  backdrops: CommonTypes['Images']['backdrops']
  posters: CollectionImages['backdrops']
}