import Image from "next/image"
import Result from "./Result"
import useReactQuery from "../hooks/useReactQuery"
import {LINKS} from '@/app/lib/types'
import { useEffect, useState } from "react"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"


export default function ScrollIntoView({page}) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await axios(`${LINKS.MOVIELISTS.TOPRATED}${page}`, TMDBOptions)
        setData(res.data)
        
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()

  }, [setData])
  
  return (
    <swiper-slide>
      <div className="bg-rose-700 flex flex-wrap items-center justify-center gap-3 px-3 my-8"
      >
        {
          data?.results.map((result, i) => (
            <div key={i} className="w-[clamp(100px_10vmin_510px)]">
              <Result item={result}/>
            </div>
          ))
        }
      </div>
    </swiper-slide>
  )
}