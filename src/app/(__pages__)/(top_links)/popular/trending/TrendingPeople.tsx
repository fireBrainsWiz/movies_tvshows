import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import axios from "axios"
import { useEffect, useState } from "react"
import { PreparePersonData } from "./PreparePersonData"


export default function TrendingPeople() {

  const [trendingPeopleData, setTrendingPeopleData] = 
  useState<TrendingPeopleData | null>(null)


  useEffect(() => {
    const getData = async () => {
      try {
        const trendingPeopleData: TrendingPeopleData = await axios(
          'https://api.themoviedb.org/3/trending/person/day?language=en-US', 
          TMDBOptions
        ).then(res => res.data)
        setTrendingPeopleData(trendingPeopleData)
        
      } catch (error) {
        console.log(error)
      } 
    }
    getData()

  }, [])

  const sortedTrendingPeopleData = trendingPeopleData?.results &&
  [...trendingPeopleData.results].sort((a, b) => b.popularity - a.popularity)
  
  return (
    <div className="my-6 px-4">
      <p className="text-2xl font-bold text-white text-center my-6">Trending Celebrities</p>

      <div className="grid grid-flow-col gap-6 overflow-x-auto py-12">
        {
          sortedTrendingPeopleData?.map((person, i) => (
            <PreparePersonData key={i} personData={person} />
          ))
        }
      </div>
    </div>
  )
}


export type TrendingPeopleData = {
  page: number,
  results: {
    "id": number,
    "name": string,
    "original_name": string,
    "media_type": string,
    "adult": boolean,
    "popularity": number,
    "gender": number,
    "known_for_department": string,
    "profile_path": string
  }[],
  total_pages: number,
  total_results: number
}

export type CombinedCredits = {
  id: number,
  cast: ({
    adult: boolean,
    backdrop_path: string | null,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    character: string,
    credit_id: string,
    order: number,
    media_type: string
  } | {
    adult: boolean,
    backdrop_path: string | null,
    genre_ids: number[],
    id: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    first_air_date: string,
    name: string,
    vote_average: number,
    vote_count: number,
    character: string,
    credit_id: string,
    episode_count: number,
    media_type: string
  })[],
}

export function getBestCombinedCredit(
  combinedCredits: CombinedCredits['cast'],
  searchOBJ?: Partial<typeof combinedCredits[0]>
) {
  const best = combinedCredits
  .filter(item => item.character || item.overview || item.backdrop_path)
  .sort((a, b) => b.popularity - a.popularity)[0];
  return best ? best : combinedCredits[0];
}
