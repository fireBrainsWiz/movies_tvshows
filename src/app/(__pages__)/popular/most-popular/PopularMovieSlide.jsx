import Result from "../../components/Result"
import { useEffect, useState } from "react"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"


export default function PopularMovieSlide({page, links}) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)



  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await axios(`${links.TOPLINKS.POPULAR}${page}`, TMDBOptions)
        if (res.data.results.length) setData(res.data)
        
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()

  }, [setData, page, links, TMDBOptions, setError, setIsLoading])
  
  return (
    <div className="bg-rose-700p flex flex-wrap items-center justify-center gap-3 px-3 my-8"
    >
      {
        data?.results.map((result, i) => (
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