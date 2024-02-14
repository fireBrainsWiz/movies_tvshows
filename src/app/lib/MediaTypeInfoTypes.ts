import {
  MovieDetails, MovieCredits, MovieReleaseTypesAndStatusesAsContentRatings,
  MovieKeywords, MovieRecommendations, SimilarMovies
} from './MoviesOrTVshowsInfoContextType_movies'

import {
  TVshowsDetails, TVshowsCredits, TVshowsContentRatings,
  TVshowsKeywords, TVshowsRecommendations, SimilarTVshows
} from './MoviesOrTVshowsInfoContextType_tvshows'



type CommonTypes = {
  Person: {
    details: {
      "adult": boolean,
      "also_known_as": string[],
      "biography": string,
      "birthday": string,
      "deathday": string,
      "gender": number,
      "homepage": string,
      "id": number,
      "imdb_id": string,
      "known_for_department": string,
      "name": string,
      "place_of_birth": string,
      "popularity": number,
      "profile_path": string
    }
  }

  Images: {
    backdrops: {
      apect_ratio: number,
      height: number,
      iso_639_1: string,
      file_path: string,
      vote_average: number,
      vote_count: number,
      width: number
    }[],
    posters: CommonTypes['Images']['backdrops'],
    logos: CommonTypes['Images']['backdrops'],
    id: number
  }

  reviews: {
    "id": number,
    "page": number,
    "results": {
      "author": string,
      "author_details": {
        "name": string,
        "username": string,
        "avatar_path": string | null,
        "rating": number | null
      },
      "content": string,
      "created_at": string,
      "id": number,
      "updated_at": string,
      "url": string
    }[],
  }
}



export type MediaTypeInfoType = {
  details: MovieDetails | TVshowsDetails
  setDetails: (details: MovieDetails | TVshowsDetails) => void

  credits: MovieCredits | TVshowsCredits
  setCredits: (credits: MovieCredits | TVshowsCredits) => void

  contentRatings: MovieReleaseTypesAndStatusesAsContentRatings | TVshowsContentRatings
  setContentRatings: (contentRatings: MovieReleaseTypesAndStatusesAsContentRatings | TVshowsContentRatings) => void

  keywords: MovieKeywords | TVshowsKeywords
  setKeywords: (keywords: MovieKeywords | TVshowsKeywords) => void

  recommendations: MovieRecommendations | TVshowsRecommendations
  setRecommendations: (recomendations: MovieRecommendations | TVshowsRecommendations) => void

  similar: SimilarMovies | SimilarTVshows
  setSimilar: (similar: SimilarMovies | SimilarTVshows) => void

  personDetails: CommonTypes['Person']['details']
  setPersonDetails: (personDetails: CommonTypes['Person']['details']) => void

  images: CommonTypes['Images']
  setImages: (images: CommonTypes['Images']) => void
} 