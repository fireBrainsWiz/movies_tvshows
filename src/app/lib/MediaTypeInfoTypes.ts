import {
  MovieDetails, MovieCredits, MovieReleaseTypesAndStatusesAsContentRatings,
  MovieKeywords, MovieRecommendations, SimilarMovies,
  PersonMovieCredits
} from './MoviesOrTVshowsInfoContextType_movies'

import {
  TVshowsDetails, TVshowsCredits, TVshowsContentRatings,
  TVshowsKeywords, TVshowsRecommendations, SimilarTVshows,
  PersonTVshowCredits
} from './MoviesOrTVshowsInfoContextType_tvshows'



export type CommonTypes = {
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
    },
    images: {
      "id": number,
      "profiles": {
        "aspect_ratio": number,
        "height": number,
        "iso_639_1": string,
        "file_path": string,
        "vote_average": number,
        "vote_count": number,
        "width": number
      }[]
    }
  }

  Images: {
    backdrops:  CommonTypes['Person']['images']['profiles'],
    posters: CommonTypes['Images']['backdrops'],
    logos: CommonTypes['Images']['backdrops'],
    id: number
  }

  review: {
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
    "total_pages": number,
    "total_results": number
  }

  watchProviders: {
    id: number
    results: {
      [key: string]: {
        link: string
        flatrate?: {
          logo_path: string
          provider_id: number
          provider_name: string
          display_priority: number
        }[]
        buy?: {
          logo_path: string
          provider_id: number
          provider_name: string
          display_priority: number
        }[]
        rent?: {
          logo_path: string
          provider_id: number
          provider_name: string
          display_priority: number
        }[]
      }
    }
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
  
  // images: CommonTypes['Images']
  // setImages: (images: CommonTypes['Images']) => void
  

  // ??......
  personDetails: CommonTypes['Person']['details']
  setPersonDetails: (personDetails: CommonTypes['Person']['details']) => void

  personMovieCredits: PersonMovieCredits
  setPersonMovieCredits: (personMoviesCredits: PersonMovieCredits) => void

  personTVshowCredits: PersonTVshowCredits
  setPersonTVshowCredits: (personTVshowsCredits: PersonTVshowCredits) => void
} 