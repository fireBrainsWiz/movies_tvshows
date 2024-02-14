'use client'

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {MediaTypeInfoType} from '@/app/lib/MediaTypeInfoTypes'




const MoviesOrTVshowsInfoContext = 
createContext<MediaTypeInfoType | undefined>(undefined)


export function  MoviesOrTVshowsInfoContextProvider(
  {children}: PropsWithChildren<{}>) {

    const [details, setDetails] = 
      useState({} as MediaTypeInfoType['details'])

    const [credits, setCredits] = useState({} as MediaTypeInfoType['credits'])

    const [contentRatings, setContentRatings] = useState({} as MediaTypeInfoType['contentRatings'])

    const [keywords, setKeywords] = useState({} as MediaTypeInfoType['keywords'])

    const [recommendations, setRecommendations] = useState({} as MediaTypeInfoType['recommendations'])

    const [similar, setSimilar] = useState({} as MediaTypeInfoType['similar'])

    const [personDetails, setPersonDetails] = useState({} as MediaTypeInfoType['personDetails'])

    const [images, setImages] = useState({} as MediaTypeInfoType['images'])

  
    
    const value = {
      details, setDetails,
      credits, setCredits,
      contentRatings, setContentRatings,
      keywords, setKeywords,
      recommendations, setRecommendations,
      similar, setSimilar,
      personDetails, setPersonDetails,
      images, setImages
    }
    
  return (
    <MoviesOrTVshowsInfoContext.Provider
      value={value}
    >
      {children}
    </MoviesOrTVshowsInfoContext.Provider>
  )
}

export default MoviesOrTVshowsInfoContext


