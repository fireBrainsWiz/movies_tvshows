import Result from "@/app/(__pages__)/components/Result"
import { useEffect, useState, MutableRefObject } from "react"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { LinksType } from "./Search";
import { ResultType } from "@/app/lib/types";
import Slider from "react-slick";

export default function ItemsSlide({
  page, links, results, sliderRef, title
}: {
  page: number,
  links: LinksType[0],
  results: ResultType[],
  sliderRef: MutableRefObject<Slider | null>,
  title: string
}) {
  // const [data, setData] = useState({} as Data)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)

 




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
  
  return (
    <div 
    // className="bg-rose-700p flex flex-wrap items-center justify-center gap-3 px-3  h-ful "
    className="bg-rose-700p grid grid-flow-col grid-rows-[repeat(10,minmax(0,1fr))] min-[400px]:grid-rows-5 md:grid-rows-4 lg:grid-rows-2 gap-3 px-3 "
    >
      {
        results?.map((result, i) => (
          <div key={i} className="w-[clamp(100px_10vmin_510px)]">
            <Result 
              item={result} 
            />
          </div>
        ))
      }
    </div>
  )
}

// type Data = {
//   page: number
//   results: ResultType[]
//   total_pages: number
//   total_results: number
// }