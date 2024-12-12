'use client';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { PopularPeopleList } from "@/app/(__pages__)/popular-people/layout";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import { getGenderByNumber } from "@/app/modals/card/lib/utils";
import { getSortedPosterPathsOfKnownFors } from "@/app/modals/card/lib/utils";
import Result from "@/app/(__pages__)/components/Result";


export  default function ToViewSVG({
  isActiveToViewSVG,
  setIsActiveToViewSVG,
  cardData,
}: {
  isActiveToViewSVG: boolean,
  setIsActiveToViewSVG: React.Dispatch<React.SetStateAction<boolean>>,
  cardData: PopularPeopleList['results'][number] & 
  MediaTypeInfoType['personDetails'] & 
  {imageColor: string, dominantColor: string}
}) {

const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elem = container?.parentElement?.parentElement?.parentElement as HTMLDivElement
    elem.style.overflow = isActiveToViewSVG ? 'hidden' : 'scroll'
    console.log(isActiveToViewSVG)

  }, [isActiveToViewSVG, cardData])

  if (!isActiveToViewSVG) return null

  return (
    <div 
    ref={containerRef}
    className=" bg-green-900p overflow-x-hidden overflow-y-auto absolute inset-0p top-0 left-0 w-full h-[500px] z-20 "
      onClick={()=> setIsActiveToViewSVG(false)}
    >
      <Human cardData={cardData} />
    </div>
    );
}


function Human({
  cardData
}: {
  cardData: PopularPeopleList['results'][number] & 
  MediaTypeInfoType['personDetails'] & 
  {imageColor: string, dominantColor: string}
}) {

  const [forSmallScreen, setForSmallScreen] = useState(false)

  // for small screen
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: 600px)`)//lg
    
    function my() {
      if (mediaQuery.matches) {
        setForSmallScreen(true)
      } else {
        setForSmallScreen(false)
      }
    }
    my()

    mediaQuery.addEventListener('change', my)
    return () => mediaQuery.addEventListener('change', my)
  }, [])
  
  
  return (
    <div className="h-full bg-green-900p overflow-x-hidden overflow-y-auto max-[1000px]:my-6">
      <div className="bg-[#5D5A52] w-max h-max flex min-h-[200px] mx-auto  gap-4 p-4 max-[600px]:p-1 rounded-[9px] my-10 max-[1000px]:block max-[600px]:py-4">
        <div className="bg-red-500p max-[1000px]:flex max-[1000px]:justify-center">
          <Image 
              src={
                cardData?.profile_path
                ?  ImagePath + cardData?.profile_path
                : '/no-image.png'
              }
              alt={cardData?.name || 'profile image'} 
              width={200} 
              height={300} 
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
              className="max-w-full h-auto object-contain "
            />
        </div>

        <div className="bg-amber-600p ">
          <p className="grid grid-cols-[auto_30px] max-[600px]:flex  max-[600px]:flex-wrap  pr-1 ">
            <span className="font-bold text-2xl truncate underline max-[600px]:mx-auto">{cardData?.name}</span>
            <span className="italic text-end max-[600px]:text-center w-full">(
              {
              cardData.deathday && 
              cardData.birthday
              ? (
                Number(cardData.deathday.slice(0,4)) -
                Number(cardData.birthday.slice(0,4))
              )
              : cardData?.birthday
                ? (
                  new Date().getFullYear() -
                  Number(cardData.birthday.slice(0,4))
                )
                : <span className="text-[9px]">N/A</span>
              }
            )</span>
          </p>

          <div className="overflow-hidden bg-blue-600p my-2"
          onClick={e => e.stopPropagation()}
        >
          {
            cardData?.known_for &&
            <div className="grid grid-cols-5 gap-1 max-[600px]:w-max max-[600px]:mx-auto overflow-hidden  h-max bg-green-300p items-center "
          >
          <hr className="border border-[#322C2C]"/>

            {
              getSortedPosterPathsOfKnownFors(cardData)
              .map((result, i) => {
                const modifiedResult = {
                  ...result,
                  original_name: result.original_title,
                  name: result.title,
                  first_air_date: result.release_date
                }

                return (
                  <span key={i} 
                    onClick={()=> {
                      // setMoviesOrTVshows(
                      //   result.media_type === 'movie' ? 'movie' : 'tvshow'
                      // )
                    }}
                    className="cursor-pointer overflow-hidden "
                    >
                    <Result 
                      item={modifiedResult} 
                      fromToViewSVG={true}
                      media_type={result.media_type === 'movie' ? 'movie' : 'tvshow'}
                      width={forSmallScreen? 65 : 100}
                    />
                  </span>
                )}
              )
            }

          <hr className="border border-[#322C2C]"/>

          </div>
          }
          </div>

          <div className="flex justify-center items-center my-2 max-[400px]:w-[90%] max-[600px]:mx-auto">
            <button className="bg-[#322C2C] py-1 px-10 max-[600px]:px-2 rounded-full truncate overflow-hidden max-[600px]:my-4">
              More about {cardData?.name}
            </button>
          </div>
          <p className="py-1 max-[400px]:w-[90%] max-[600px]:mx-auto max-[600px]:my-4">
            {cardData?.place_of_birth || 'N/A'}
          </p>
          <p className="grid grid-cols-[auto_70px]  pr-1 max-[400px]:w-[90%] max-[600px]:mx-auto">
            <span className=" truncate">{cardData?.birthday || 'N/A'}</span>
            <span className="italic text-end truncate">
              {
                getGenderByNumber(cardData?.gender)
              }
            </span>
          </p>
        </div>
        
      </div>
    </div>
  )
}