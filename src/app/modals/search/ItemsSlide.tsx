import Result from "@/app/(__pages__)/components/Result"
import { useEffect, useState, MutableRefObject } from "react"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { LinksType } from "./Search";
import { ResultType } from "@/app/lib/types";
import Slider from "react-slick";
import { People } from "./components/people/People";
import { PopularPeopleList } from "@/app/(__pages__)/popular-people/layout";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { CardData, ToViewCoordsAndInfo } from "./components/people/PopularPeopleCards";
import { Collections } from "./components/collections/Collections";
import { Companies } from "./components/company/Companies";


export default function ItemsSlide({
  page, 
  results, 
  title, 
  itemsContainerParentRef, 
  currentSlide, 
  slideIndex,

  setIsActiveToViewSVG,
  setToViewCoordsAndInfo,
  setCardData,

  isOpenCollectionParts,
  setIsOpenCollectionParts,
  setClickedCollectionId
  
}: {
  page: number,
  results: ResultType[],
  title: string
  itemsContainerParentRef: React.RefObject<HTMLDivElement | null>,
  currentSlide: number
  slideIndex: number

  setIsActiveToViewSVG: (_: boolean) => void,
  setToViewCoordsAndInfo: React.Dispatch<React.SetStateAction<ToViewCoordsAndInfo>>,
  setCardData: React.Dispatch<React.SetStateAction<CardData>>,

  isOpenCollectionParts: boolean,
  setIsOpenCollectionParts: (_ : boolean) => void
  setClickedCollectionId: (_ : number | null) => void
}) {
  // const [data, setData] = useState({} as Data)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)

//  if (title = 'People') {
//   console.log(results)
//  }

  const isOthers = ['People', 'Collections', 'Companies'].includes(title)


  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsLoading(true)
  //       const res = await axios(`${links.}${page}`, TMDBOptions)
  //       if (res.data.results.length) setData(res.data)
        
  //     } catch (error: any) {
  //       console.log(error)
  //       setError(error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   })()

  // }, [setData, page, links, TMDBOptions, setError, setIsLoading, ])
  // console.log({title})

  // return null

  
  return (
    <div 
    className={`
      ${!isOthers ? 'bg-emerald-700p flex flex-wrap gap-3 px-3 justify-center items-center' :''} 
      ${title === 'People' ? 'relative flex flex-wrap gap-3 px-3 justify-center items-center' :''} 
      ${title === 'Collections' ? ' overflow-hidden flex flex-wrap  text-center justify-center' :''} 
    `}
    >
      {
        !isOthers 
        ? results?.map((result, i) => (
            <Result 
              key={i}
              item={result} 
              media_type={title === 'Movies' ? 'movie' : 'tvshow'}
            />
        ))
        : (title === 'People')
        ? <People 
            results={results} 
            itemsContainerParentRef={itemsContainerParentRef}
            page={page}
            currentSlide={currentSlide}
            slideIndex={slideIndex}

            setIsActiveToViewSVG={setIsActiveToViewSVG}
            setToViewCoordsAndInfo={setToViewCoordsAndInfo}
            setCardData={setCardData}
          />
        : (title === 'Collections')
        ? <Collections 
            results={results} 
            itemsContainerParentRef={itemsContainerParentRef}
            title={title}
            isOpenCollectionParts={isOpenCollectionParts}
            setIsOpenCollectionParts={setIsOpenCollectionParts}
            setClickedCollectionId={setClickedCollectionId}
          />
        : <Companies 
          results={results} 
          companyOrNetwork="company"
        />
      }
    </div>
  )
}

export type CollectionType = {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path:string
}

export type CompanyType = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}