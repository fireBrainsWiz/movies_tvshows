'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SVGRect, ToViewCoordsAndInfo } from "./PopularPeopleCards";
import { PopularPeopleList } from "@/app/(__pages__)/popular-people/layout";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import { getGenderByNumber } from "@/app/modals/card/lib/utils";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { steal } from "@/app/modals/card/lib/colorThief";
import { getSortedPosterPathsOfKnownFors } from "@/app/modals/card/lib/utils";



const personDetailsLink = {
  beforeStr: 'https://api.themoviedb.org/3/person/',
  afterStr: '?language=en-US'
}

export function Card({
    setIsActiveToViewSVG, setToViewCoordsAndInfo, 
    i,
    result,
    setCardData,
    itemsContainerParentRef,
    currentSlide,
    slideIndex
  }: {
    setIsActiveToViewSVG: (_: boolean) => void;
    setToViewCoordsAndInfo: (_: ToViewCoordsAndInfo) => void;
    i: number;
    result: PopularPeopleList['results'][number];
    setCardData: (_: PopularPeopleList['results'][number] & 
    MediaTypeInfoType['personDetails'] & 
    {imageColor: string, dominantColor: string}) => void
    itemsContainerParentRef: React.RefObject<HTMLDivElement | null>;
    currentSlide: number
    slideIndex: number
  }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [imageColor, setImageColor] = useState('')
  const [personDetail, setPersonDetail] = 
  useState({} as MediaTypeInfoType['personDetails']) 


  const color = steal(imageRef.current)
  const dominantColor = 'rgb('+ color?.[2]?.join(',') +')'

  
  function handleCardClick() {
    const svg = svgRef.current;
    if (!svg) return;

    // document.body.style.overflow = 'hidden'

    const { x, y, width, height } = svg.getBoundingClientRect();

    setToViewCoordsAndInfo({
      innerHeight: window.innerHeight,
      scrollY: itemsContainerParentRef?.current?.scrollTop || 0,
      scrollHeight: itemsContainerParentRef?.current?.scrollHeight || 0,
      x, y, width, height,
      i,
      isActiveToViewSVG: true
    });

    setIsActiveToViewSVG(true);//!
    setCardData({
      ...personDetail,
      ...result,
      imageColor,
      dominantColor
    })

    const elem = itemsContainerParentRef.current;
    if (!elem) return;
    // elem.style.overflow = 'hidden';
  }

  useImagePixel({
    backdrop_path: result.profile_path,
    imageRef,
    setColor: setImageColor,
  })

  // fetch person details
  useEffect(() => {
    (async () => {
      if (!result.id) return

      try {
        const {data}: {data: MediaTypeInfoType['personDetails']} = await axios(
          `${personDetailsLink.beforeStr}${result.id}${personDetailsLink.afterStr}`,
          TMDBOptions
        )
          // console.log({data})
          setPersonDetail(data)
      } catch(err: any) {
        console.log(err)
      }
    })()

  }, [result])

  // console.log(personDetail)

    
  return (
      currentSlide === slideIndex ||
      currentSlide+1 === slideIndex || 
      currentSlide-1 === slideIndex
    ) &&
    (
      <svg width="173" height="246" viewBox="0 0 173 246" fill="none" xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      onClick={handleCardClick} 
      className="cursor-pointer w-max"
      >
      <rect x="4" y="34" width="165" height="210" fill={imageColor} fillOpacity={0.5}/>
  
  
      <g>
        <foreignObject x="12" y="3" width="66" height="65" 
        >
          <div className={`w-full h-full  rounded-full overflow-hidden flex justify-center `}
            style={{backgroundColor: imageColor}}
          >
            <Image 
              ref={imageRef}
              src={
                result.profile_path
                ? ImagePath+result.profile_path 
                : '/no-image.png'
              }
              alt={result.name || 'profile image'} 
              width={100} 
              height={150} 
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
              className="max-w-full h-auto object-contain "
            />
          </div>
        </foreignObject>
  
        <foreignObject  x="81" y="35" width="87" height="37">
          <div className="w-full h-full bg-[#922D2D]p leading-[16px]">
            <p className="text-center my-[2px]">{result.known_for_department}</p>
            <p className="text-center text-xs truncate">{
              getGenderByNumber(result.gender)
            }</p>
          </div>
        </foreignObject>
        
  
        <foreignObject  x="4" y="78" width="166" height="165">
          <div className="w-full h-full bg-[#6E5E20]p flex flex-wrap">
            <p className=" p-2 truncate underline">
              {result.name}
            </p>
            <div className="text-xs">
              {
                personDetail?.birthday && 
                <p>{personDetail.birthday + ','}</p>
              }
              
              {
                personDetail?.place_of_birth &&
                <p>{personDetail.place_of_birth}</p>
              }
            </div>
              <div className="grid grid-cols-3 gap-1 w-full self-end pt-[5px]p">
                {
                  getSortedPosterPathsOfKnownFors(result)
                  .map((result, i) => {
                    return i<=3 && (
                    <KnownForImageSample
                      key={i}
                      i={i}
                      result={result}
                    />
                  )})
                }
              </div>
        
          </div>
        </foreignObject>
      </g>
  
      <g>
        <path d="M164.4 31.6016H84.5999C84.0999 31.6016 83.5999 32.1016 83.5999 32.6016V33.4016C83.5999 33.9016 84.0999 34.4016 84.5999 34.4016H164C166.8 34.4016 169 36.6016 169 39.4016V237.902C169 240.702 166.8 242.902 164 242.902H8.7999C5.9999 242.902 3.7999 240.702 3.7999 237.902V39.4016C3.7999 36.6016 5.9999 34.4016 8.7999 34.4016H9.3999C9.3999 33.4016 9.4999 32.5016 9.5999 31.6016H8.3999C3.9999 31.6016 0.399902 35.2016 0.399902 39.6016V237.802C0.399902 242.202 3.9999 245.802 8.3999 245.802H164.4C168.8 245.802 172.4 242.202 172.4 237.802V39.6016C172.4 35.2016 168.8 31.6016 164.4 31.6016Z" fill={dominantColor}
        filter="url(#displacementFilter)"
        />
        <path d="M44.9999 0C25.6999 0 9.9999 15.3 9.3999 34.4H12.1999C12.8999 16.9 27.2999 2.8 44.9999 2.8C62.6999 2.8 77.7999 17.5 77.7999 35.6C77.7999 53.7 63.1999 68.5 44.9999 68.5C28.3999 68.5 14.6999 56.2 12.4999 40.2C12.3999 39.2 12.3999 36.5 10.3999 37C8.8999 37.4 9.4999 39.2 9.6999 40.2C11.8999 57.7 26.8999 71.3 44.9999 71.3C64.6999 71.3 80.6999 55.3 80.6999 35.6C80.6999 15.9 64.6999 0 44.9999 0Z" fill={dominantColor}
        filter="url(#displacementFilter)"
        />
      </g>
  
    </svg>
  )
}

function KnownForImageSample({
  result, i, 
}:{
  result: PopularPeopleList['results'][number]['known_for'][number]
  i: number
}) {

  // return 

  return (
    <Image
      key={i}
      src={ 
        result.poster_path
        ? ImagePath+result.poster_path 
        : '/no-image.png'
      }
      alt={result.title || 'poster image'}
      width={100}
      height={150}
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
      className={`max-w-full h-auto object-contain mx-auto ${i===0? ' rounded-bl': i===2? 'rounded-br' : ''}`}
    />
  )
}


