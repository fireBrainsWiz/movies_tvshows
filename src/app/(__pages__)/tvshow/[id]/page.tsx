
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import axios from "axios"
import { useEffect } from "react"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { SimilarTVshows } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows"
import Test from "./Test"


export default async function Page({
  params
}: {
  params: Params
}) {

  const tempAbArr: Data['results'] = []
  const ids: number[] = []

  for (let i = 0; i < 500; i++) {
    try {
      const {data}: {data: Data} =  await axios(`
        https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${i+1}&sort_by=popularity.desc
        `, TMDBOptions
      )

      if (data.results.length > 0) {
        tempAbArr.push(...data.results)
        ids.push(...data.results.map(item => item.id))
      }
    } catch (error) {
      console.log(error)
    } 
    
  }
  // console.log(params)
  
  return (
    <div>
      <Test id={params.id}
      />
    </div>
  )
}


export async function generateStaticParams() {
  const tempAbArr: Data['results'] = []
  const ids: number[] = []

  for (let i = 0; i < 500; i++) {
    try {
      const {data}: {data: Data} =  await axios(`
        https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${i+1}&sort_by=popularity.desc
        `, TMDBOptions
      )

      if (data.results.length > 0) {
        tempAbArr.push(...data.results)
        ids.push(...data.results.map(item => item.id))
      }
    } catch (error) {
      console.log(error)
    } 
    
  }

  // console.log(tempAbArr.length)
  // console.log(ids)
  // console.log('ì-------------------')


  return ids.map((id) => {
    // console.log(ids.length)
    return {
      id: id.toString(),
    }
  })
}

type Data = {
  page: number
  results: Omit<SimilarTVshows['results'][0], 'media_type'>[]
  total_pages: number
  total_results: number
}

type Params = {
  id: string,
}

