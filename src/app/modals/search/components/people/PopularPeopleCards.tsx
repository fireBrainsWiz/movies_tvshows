'use client'

import { useEffect, useState } from "react"
import ToViewSVG from "./modal/ToViewSVG"
import { Card } from "./Card"
import { PopularPeopleList } from "@/app/(__pages__)/popular-people/layout"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { Modal } from "./modal/Modal"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"

export default function PopularPeopleCards({
  page, itemsContainerParentRef, results, currentSlide, slideIndex,

  setIsActiveToViewSVG,
  setToViewCoordsAndInfo,
  setCardData,

}: {
  page: number,
  itemsContainerParentRef: React.RefObject<HTMLDivElement | null>,
  results: PopularPeopleList['results']
  currentSlide: number
  slideIndex: number

  setIsActiveToViewSVG: (_: boolean) => void,
  setToViewCoordsAndInfo: React.Dispatch<React.SetStateAction<ToViewCoordsAndInfo>>,
  setCardData: React.Dispatch<React.SetStateAction<CardData>>,
}) {


  
  return (
    < 
    // className="flex flex-wrap gap-4 justify-center bg-red-500"
    // className="flex flex-wrap gap-4 justify-center bg-red-500 overflow-hiddenp overflow-y-auto"
    // className="bg-red-500 flex flex-wrap overflow-y-auto"
    // style={{
    //   height: innerHeight - (itemsContainerParentRef?.current?.getBoundingClientRect().top || 0) + 'px'
    // }}
    >
      {
        results.map((result, i) => {
          return (
          // (i==1) && 
          <Card 
            key={i} 
            i={i}
            setIsActiveToViewSVG={setIsActiveToViewSVG}
            setToViewCoordsAndInfo={setToViewCoordsAndInfo}
            result={result}
            setCardData={setCardData}
            itemsContainerParentRef={itemsContainerParentRef}
            currentSlide={currentSlide}
            slideIndex={slideIndex}
          />
        )})
      }

    </>


    // results.map((result, i) => {
    //   return (
    //     <div 
    //       key={i} className="flex justify-center bg-red-500 w-[160px] h-[200px]">
    //       hello
    //     </div> 
    //   )
    //   })
    // )

)}


/* 
  {
      isActiveToViewSVG && (
        <Modal 
          isActiveToViewSVG={isActiveToViewSVG}
          setIsActiveToViewSVG={setIsActiveToViewSVG}
          itemsContainerParentRef={itemsContainerParentRef}
        />
      )
    }

    <ToViewSVG
      key={toViewCoordsAndInfo.i} 
      coordsAndInfo={toViewCoordsAndInfo}
      isActiveToViewSVG={isActiveToViewSVG}
      setIsActiveToViewSVG={setIsActiveToViewSVG}
      cardData={cardData}
      itemsContainerParentRef={itemsContainerParentRef}
    />
 */





export type Coords = {
  innerHeight: number,
  scrollY: number,
  scrollHeight: number
}

export type SVGRect = {
  x: number,
  y: number,
  width: number,
  height: number
}

export type ToViewCoordsAndInfo = Coords & SVGRect & {
  i: number
  isActiveToViewSVG: boolean
}

export type CardData = 
PopularPeopleList['results'][number] & 
MediaTypeInfoType['personDetails'] & 
{
  imageColor: string, 
  dominantColor: string
}