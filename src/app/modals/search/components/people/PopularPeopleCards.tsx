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

  // const [isActiveToViewSVG, setIsActiveToViewSVG] = useState(false)

  // const [cardData, setCardData] = 
  // useState<CardData>({
  //   ...{} as PopularPeopleList['results'][number],
  //   ...{} as MediaTypeInfoType['personDetails'],
  //   imageColor: '',
  //   dominantColor: ''
  // })

  // const [toViewCoordsAndInfo, setToViewCoordsAndInfo] = 
  // useState<ToViewCoordsAndInfo>({
  //   innerHeight,
  //   scrollY: itemsContainerParentRef?.current?.scrollTop || 0,
  //   scrollHeight: itemsContainerParentRef?.current?.scrollHeight || 0,
  //   x: 0,
  //   y: 0,
  //   width: 0,
  //   height: 0,
  //   i: 0,
  //   isActiveToViewSVG
  // })
/*  */
  // const [results, setResults] =           useState<PopularPeopleList['results']>([])


  // get results
  // useEffect(() => {

  //   (async () => {
  //     try {
  //       const {results}: PopularPeopleList = await axios(
  //         `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`, 
  //         TMDBOptions
  //       ).then(res => res.data) 

  //       setResults(results)

  //     } catch (error) {
  //       console.error(error)
  //     }
  //   })()
  // }, [page])

  // console.log(results, page)
  // alert(innerWidth)
  
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