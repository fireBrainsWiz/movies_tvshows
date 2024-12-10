import Image from 'next/image';
import { ResultType, PLACEHOLDER_IMAGE, ImagePath, TrailerType } from '@/app/lib/types';
import { useEffect, useState, useRef, memo } from 'react';
import { IoImages } from "react-icons/io5";
import { IoImageSharp } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { _Movies, _TVshows } from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import useImagePixel from '@/app/(__pages__)/hooks/useImagePixel';
import useAllImagesAndVideosStore from '../../../(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store';
import { MediaTypeInfoType, CommonTypes } from '@/app/lib/MediaTypeInfoTypes';
import { steal } from '../lib/colorThief';
import  ThreeImages  from './ThreeImages';


export default memo( function PosterAndOthers({ 
  card, 
  links, 
  trailers,
  details,
  imagesToSet,
  colorThiefColor,
}:{
  card: ResultType, 
  links: _Movies | _TVshows,
  trailers: TrailerType[]
  details: MediaTypeInfoType['details']
  imagesToSet: CommonTypes['Images']
  colorThiefColor: number[][] | undefined
}) {

    const imageRef = useRef<HTMLImageElement>(null)

    const {setIsVisibleAllImages, setIsVisibleAllVideos} = useAllImagesAndVideosStore()

    const [imageColor, setImageColor] = useState('')

    useImagePixel({ 
      backdrop_path: card.poster_path, 
      imageRef, setColor: setImageColor 
    })


   

  
  return (

    <>
      <div className='block sm:hidden'>
        <div className=" grid flex-wrap">
          <div className="grid justify-center items-center p-4 gap-6">
            <div>
              {
                'origin_country' in details && (
                  <ul className="flex flex-wrap justify-center">
                    {
                      details.origin_country.map((country, i) => (
                        <li key={i} className="list-disc capitalize mx-2 first:ml-0  first:list-none">
                          {country}
                        </li>
                      ))
                    }
                  </ul>
                )  
              }
            </div>
            <div>
              {
                links.MEDIATYPE === 'tvshow' && (
                  <div className="flex justify-center">
                    {
                      'number_of_seasons' in details && (
                        <p>
                          <span>{details.number_of_seasons}</span>
                          <span className="ml-2">Seasons,</span> 
                        </p>
                      )
                    }
                    {
                      'number_of_episodes' in details && (
                        <p className="ml-4">
                          <span>{details.number_of_episodes}</span>
                          <span className="ml-2">Episodes</span> 
                        </p>
                      )
                    }
                  </div>
                )
              }
            </div>
            <div>
              {
                'in_production' in details && details.in_production && (
                  <p className="my-6">Currently in production</p>
                )
              }
            </div>
          </div>

          <div className='w-full my-6'>
            <div className='mx-auto w-max'>
              <ThreeImages 
                imagesToSet={imagesToSet} 
                trailers={trailers}
                colorThiefColor={colorThiefColor}
              />
            </div>
          </div>

          <div className="flex justify-end w-full bg-black mt-14 mb-6">
            <div className="inlene-block relative mx-auto">
              <Image 
                ref={imageRef}
                src={
                card?.poster_path
                ? ImagePath + card.poster_path : '/no-image-2.webp'
                }
                alt={card.name || card.title || 'poster image'}
                placeholder='blur'
                blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
                width={100} 
                height={100}
                priority
              />

              <div className="h-full w-full absolute bottom-0 top-0 -left-[10px]">
                <Image 
                  src={'/orange-rect-2.png'}
                  alt="poster"
                  width={220}
                  height={220}
                  priority
                  className="h-full object-cover"
                />
              </div>
              <div className="h-full w-full absolute bottom-0 top-0 -right-[10px] scale-x-[-1]">
                <Image 
                  src={'/orange-rect-2.png'}
                  alt="poster"
                  width={220}
                  height={220}
                  priority
                  className="h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='block [@media_(max-width:639px)]:hidden '>
        <div className="bg-yellow-500p grid grid-flow-col text-xs [@media_(max-width:1020px)]:text-base [@media_(min-width:1280px)]:text-base">
          <div className='bg-red-900p h-max'>
            <ThreeImages 
              imagesToSet={imagesToSet} 
              trailers={trailers}
              colorThiefColor={colorThiefColor}
            />
          </div>

          <div className="bg-green-500p grid justify-start items-center -ml-5 [@media_(max-width:1020px)]:ml-6 [@media_(min-width:1280px)]:ml-2 h-1/2 mt-3">
            <div className='overflow-hidden overflow-x-auto whitespace-nowrap'>
              {
                'origin_country' in details && (
                  <ul className="flex">
                    {
                      details.origin_country.map((country, i) => (
                        <li key={i} className="list-disc capitalize mx-2 first:ml-0  first:list-none">
                          {country}
                        </li>
                      ))
                    }
                  </ul>
                )  
              }
            </div>
            <div className='overflow-hidden overflow-x-auto whitespace-nowrap'>
              {
                links.MEDIATYPE === 'tvshow' && (
                  <div className="flex">
                    {
                      'number_of_seasons' in details && (
                        <p>
                          <span>{details.number_of_seasons}</span>
                          <span className="ml-2">Seasons,</span> 
                        </p>
                      )
                    }
                    {
                      'number_of_episodes' in details && (
                        <p className="ml-4">
                          <span>{details.number_of_episodes}</span>
                          <span className="ml-2">Episodes</span> 
                        </p>
                      )
                    }
                  </div>
                )
              }
            </div>
            <div className='overflow-hidden overflow-x-auto whitespace-nowrap'>
              {
                'in_production' in details && details.in_production && (
                  <p className="my-6">Currently in production</p>
                )
              }
            </div>
          </div>

          <div className="bg-red-500p flex justify-end [@media(max-width:600px)]:w-full [@media(max-width:600px)]:justify-center items-center">
            <div className="inlene-block bg-amber-500p p-2p relative">
              <Image 
                ref={imageRef}
                src={
                card?.poster_path
                ? ImagePath + card.poster_path : '/no-image-2.webp'
                }
                alt={card.name || card.title || 'poster image'}
                placeholder='blur'
                blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
                width={100} 
                height={100}
                priority
              />

              <div className="h-full w-full absolute bottom-0 top-0">
                <Image 
                  src={'/orange-rect.png'}
                  alt="poster"
                  width={220}
                  height={220}
                  priority
                  className="h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>





  )
})




