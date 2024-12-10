import { useEffect, useState } from "react"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { _Movies, _TVshows } from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext"
import Result from "@/app/(__pages__)/components/Result"
import { SimilarMovies } from "@/app/lib/MoviesOrTVshowsInfoContextType_movies"
import { ResultType } from "@/app/lib/types"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"

export default function PopularMovieOrTVshowSlide({
  page, 
  links
}: {
  page: number,
  links: _TVshows | _Movies
}) {
  const [data, setData] = useState<MediaTypeInfoType['similar'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)



  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const popularMovieOrTvShow: MediaTypeInfoType['similar'] = await axios(`
          ${links.TOPLINKS.POPULAR}${page}
          `, TMDBOptions
        ).then(res => res.data)
        // if (res.data.results.length) setData(res.data)
        setData(popularMovieOrTvShow)
        
      } catch (error) {
        console.log(error)
        // setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()

  }, [page, links])


  
  return (
    <div className="flex flex-wrap items-center justify-center gap-3  my-3"
    >
      {
        data?.results.map((result, i) => {
          let alteredResult: ResultType 

          if ('name' in result) {
            alteredResult = {
              adult: result.adult,
              backdrop_path: result.backdrop_path,
              genre_ids: result.genre_ids,
              id: result.id,
              origin_country: [result.origin_country],
              original_language: result.original_language,
              original_name: result.name,
              overview: result.overview,
              popularity: result.popularity,
              poster_path: result.poster_path,
              first_air_date: result.first_air_date,
              name: result.name,
              title: result.name,
              vote_average: result.vote_average,
              vote_count: result.vote_count,
            }
          } else {
            alteredResult = {
              adult: result.adult,
              backdrop_path: result.backdrop_path,
              genre_ids: result.genre_ids,
              id: result.id,
              original_language: result.original_language,
              original_name: result.title,
              overview: result.overview,
              popularity: result.popularity,
              poster_path: result.poster_path,
              first_air_date: result.release_date,
              title: result.title,
              name: result.title,
              vote_average: result.vote_average,
              vote_count: result.vote_count,
            }
          }

          return (
            <div key={i} className="w-[clamp(100px,45%,200px)]">
              <Result 
                item={alteredResult} 
              />
              
            </div>
          )
        })
      }
    </div>
  )
}
