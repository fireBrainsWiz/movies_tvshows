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
  "backdrop_path": string | null,
  "created_by":  {
    "id": number,
    "credit_id": string,
    "name": string,
    "original_name": string,
    "gender": number,
    "profile_path": string
  }[],
  "episode_run_time": number[],
  "first_air_date": string | null,
  "genres": {
    "id": number,
    "name": string
  }[],
  "homepage": string,
  "id": number,
  "in_production": boolean,
  "languages": string[],
  "last_air_date": string | null,
  "last_episode_to_air": {
    "air_date": string,
    "episode_number": number,
    "episode_type": string,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "runtime": number | null,
    "season_number": number,
    "show_id": number,
    "still_path": string | null,
    "vote_average": number,
    "vote_count": number
  } | null,
  "name": string,
  "next_episode_to_air": {
    "air_date": string,
    "episode_number": number,
    "episode_type": string,
    "id": number,
    "name": string,
    "overview": string,
    "production_code": string,
    "runtime": number | null,
    "season_number": number,
    "show_id": number,
    "still_path": string | null,
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

export type TVcrew = {
  'job': string
  'department': string,
  'credit_id': string,
  'adult': boolean,
  'gender': number,
  'id': number,
  'known_for_department': string,
  'name': string,
  'original_name': string,
  'popularity': number,
  'profile_path': string,
}

export type TVcast = {
  'character': string,
  'credit_id': string,
  'order': number
  'adult': boolean,
  'gender': number,
  'id': number,
  'known_for_department': string,
  'name': string,
  'original_name': string,
  'popularity': number,
  'profile_path': string,
}

export type TVshowsCredits = {
  'id': number,
  'cast': TVcast[],
  'crew': TVcrew[]
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


const TVshowsVideos = {
  "id": 46952,
  "results": [
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Reddington surrenders himself to the FBI",
      "key": "SoT5JImB1H8",
      "site": "YouTube",
      "size": 1080,
      "type": "Clip",
      "official": false,
      "published_at": "2016-02-09T19:41:34.000Z",
      "id": "5ec42b5a3d3557001eeae23a"
    }
  ]
}


//? SEASONS...
export type SeasonType = {
  air_date: string | null
  episode_count: number 
  id: number 
  name: string 
  overview: string 
  poster_path: string | null
  season_number: number 
  vote_average: number 
}




export type SeasonDetails = {
  _id: string
  air_date: string
  episodes: {
    air_date: string
    episode_number: number
    episode_type: string
    id: number
    name: string
    overview: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
    crew: TVcrew[]
    guest_stars: TVcast[]
  }[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
  vote_average: number
}


// export type ResultType = {
//   adult: boolean 
//   backdrop_path: string
//   genre_ids: number[]
//   id: number
//   origin_country?: string[]
//   original_language: string
//   original_name: string
//   overview: string
//   popularity: number
//   poster_path: string
//   first_air_date: string
//   title: string
//   name: string
//   vote_average: number
//   vote_count: number
// }
