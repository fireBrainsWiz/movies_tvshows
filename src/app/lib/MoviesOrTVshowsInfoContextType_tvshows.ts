type Rating ={
    descriptors: string[],
    iso_3166_1: string,
    rating: string
  }

export type TVshowsContentRatings = {
  id: number,
  results: Rating[]
}

// ?....

export type TVshowsDetails = {
  "adult": boolean,
  "backdrop_path": string,
  "created_by":  {
    "id": number,
    "credit_id": string,
    "name": string,
    "gender": number,
    "profile_path": string
  }[],
  "episode_run_time": number[],
  "first_air_date": string,
  "genres": {
    "id": number,
    "name": string
  }[],
  "homepage": string,
  "id": number,
  "in_production": boolean,
  "languages": string[],
  "last_air_date": string,
  "last_episode_to_air": {
    "air_date": string,
    "episode_number": number,
    "episode_type": number,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "runtime": number,
    "season_number": number,
    "show_id": number,
    "still_path": string,
    "vote_average": number,
    "vote_count": number
  },
  "name": string,
  "next_episode_to_air": {
    "air_date": string,
    "episode_number": number,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "runtime": number,
    "season_number": number,
    "show_id": number,
    "still_path": string,
    "vote_average": number,
    "vote_count": number
  } | null,
  "networks": {
    "name": string,
    "id": number,
    "logo_path": string,
    "origin_country": string
  }[],
  "number_of_episodes": number,
  "number_of_seasons": number,
  "origin_country": string[],
  "original_language": string,
  "original_name": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "production_companies": {
    "id": number,
    "logo_path": string,
    "name": string,
    "origin_country": string
  }[],
  "production_countries": {
    "iso_3166_1": string,
    "name": string
  }[],
  "seasons": {
    "air_date": string | null,
    "episode_count": number,
    "id": number,
    "name": string,
    "overview": string,
    "poster_path": string | null,
    "season_number": number
    "vote_average": number,
  }[],
  "spoken_languages": {
    "english_name": string,
    "iso_639_1": string,
    "name": string
  }[],
  "status": string,
  "tagline": string,
  "type": string,
  "vote_average": number,
  "vote_count": number
}

// ?....

export type TVshowsCredits = {
  'id': number,
  'cast': {
    'adult': boolean,
    'gender': number,
    'id': number,
    'known_for_department': string,
    'name': string,
    'original_name': string,
    'popularity': number,
    'profile_path': string,
    'character': string,
    'credit_id': string,
    'order': number
  }[],
  'crew': {
    'adult': boolean,
    'gender': number,
    'id': number,
    'known_for_department': string,
    'name': string,
    'original_name': string,
    'popularity': number,
    'profile_path': string,
    'credit_id': string,
    'department': string,
    'job': string
  }[]
}

export type TVshowsKeywords = {
  "id": number,
  "results": {
    "name": string,
    "id": number
  }[]
}

export type TVshowsTranslations = {
  "id": number,
  "translations": {
    "iso_3166_1": string,
    "iso_639_1": string,
    "name": string,
    "english_name": string,
    "data": {
      "name": string,
      "overview": string,
      "homepage": string,
      "tagline": string
    }
  }[]
}


export type TVshowsRecommendations = {
  "page": number,
  "results": {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity: number,
    first_air_date: string,
    vote_average: number,
    vote_count: number
    origin_country: string
  }[],
}

export type SimilarTVshows = {
  "page": number,
  "results": {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity: number,
    first_air_date: string,
    vote_average: number,
    vote_count: number
    origin_country: string
  }[],
  "total_pages": number,
  "total_results": number
}


// ?...

export type PersonTVshowCredits = {
  id : number,
  cast : (Omit<SimilarTVshows['results'][0], 'media_type'> & {
    character : string,
    credit_id : string,
    episode_count : number,
  })[],
  crew : (Omit<PersonTVshowCredits['cast'][0], 'character'> & {
    department : string,
    job : string
  })[]
}
