'use client'

import { useEffect, useState } from "react"
import  ToViewSVG  from "./ToViewSVG"
import { Card } from "./Card"
import { PopularPeopleList } from "../layout"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { Modal } from "./Modal"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"

export default function PopularPeopleCards({
  results,
}: {
  results: PopularPeopleList['results']
}) {

  const [isActiveToViewSVG, setIsActiveToViewSVG] = useState(false)

  const [cardData, setCardData] = 
  useState<PopularPeopleList['results'][number] & 
  MediaTypeInfoType['personDetails'] & 
  {imageColor: string, dominantColor: string}>({
    ...{} as PopularPeopleList['results'][number],
    ...{} as MediaTypeInfoType['personDetails'],
    imageColor: '',
    dominantColor: ''
  })

  const [toViewCoordsAndInfo, setToViewCoordsAndInfo] = 
  useState<ToViewCoordsAndInfo>({
    innerHeight,
    scrollY,
    scrollHeight: document.body.scrollHeight,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    i: 0,
    isActiveToViewSVG
  })


  return (
    <div 
    className="flex flex-wrap gap-4 justify-center"
    >
      {
        results.map((result, i, arr) => {
          return (
          // (i===19) && 
          <Card 
            key={i} 
            i={i}
            setIsActiveToViewSVG={setIsActiveToViewSVG}
            setToViewCoordsAndInfo={setToViewCoordsAndInfo}
            result={result}
            setCardData={setCardData}
          />
        )})
      }

      {
        isActiveToViewSVG && (
          <Modal 
            isActiveToViewSVG={isActiveToViewSVG}
            setIsActiveToViewSVG={setIsActiveToViewSVG}
          />
        )
      }

      <ToViewSVG
        key={toViewCoordsAndInfo.i} 
        coordsAndInfo={toViewCoordsAndInfo}
        isActiveToViewSVG={isActiveToViewSVG}
        setIsActiveToViewSVG={setIsActiveToViewSVG}
        cardData={cardData}
      />
    </div>
  )

}








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