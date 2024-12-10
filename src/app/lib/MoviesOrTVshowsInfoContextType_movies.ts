type Genre = {
  "id": number,
  "name": string
}

type ProductionCompany = {
  "id": number,
  "logo_path": string,
  "name": string,
  "origin_country": string
}

type ProductionCountry = {
  "iso_3166_1": string,
  "name": string
}

type SpokenLanguages = {
  "english_name": string,
  "iso_639_1": string,
  "name": string
}

type BelongsToCollection = {
  "id": number,
  "name": string,
  "poster_path": string,
  "backdrop_path": string
}

export type MovieDetails = {
  "adult": boolean,
  "backdrop_path": string | null,
  "belongs_to_collection": BelongsToCollection | null,
  "budget": number,
  "genres": Genre[],
  "homepage": string,
  "id": number,
  "imdb_id": string | null,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string | null,
  "production_companies": ProductionCompany[],
  "production_countries": ProductionCountry[],
  "release_date": string,
  "revenue": number,
  "runtime": number,
  "spoken_languages": SpokenLanguages[],
  "status": string,
  "tagline": string,
  "title": string,
  "video": false,
  "vote_average": number,
  "vote_count": number
}

// ?.....
type CastItem = {
  "adult": boolean,
  "gender": number,
  "id": number,
  "known_for_department": string,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string,
  "cast_id": number,
  "character": string,
  "credit_id": string,
  "order": number
}

type CrewItem = {
  "adult": boolean,
  "gender": number,
  "id": number,
  "known_for_department": string,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string,
  "credit_id": string,
  "department": string,
  "job": string
}

export type MovieCredits = {
  "id": number,
  "cast": CastItem[],
  "crew": CrewItem[]
}


// ?....

type ReleaseDate = {
  "certification": string,
  "descriptors": string[],
  "iso_639_1": string,
  "note": string,
  "release_date": string,
  "type": number
}

type ReleaseDates = {
  "iso_3166_1": string,
  "release_dates": ReleaseDate[]
}

export type MovieReleaseTypesAndStatusesAsContentRatings = {
  id: number,
  results: ReleaseDates[]
}

// ?....

export type MovieKeywords = {
  "id": number,
  "keywords": {
    "id": number,
    "name": string
  }[]
}

export type MovieTranslations = {
  "id": number,
  "translations": {
    "iso_3166_1": string,
    "iso_639_1": string,
    "name": string,
    "english_name": string,
    "data": {
      "homepage": string,
      "overview": string,
      "runtime": number,
      "tagline": string,
      "title": string
    }
  }[] 
}

export type MovieRecommendations = {
  "page": number,
  "results": {
    adult: boolean,
    backdrop_path: string,
    id: number,
    title: string,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity: number,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  }[],
}

// export type ResultType = {
//   adult: boolean 
//   backdrop_path: string
//   genre_ids: number[]
//   id: number
//   origin_country: string[]
//   original_language: string
//   name: string
//   title: string
//   original_name: string
//   original_title: string
//   overview: string
//   popularity: number
//   poster_path: string
//   first_air_date: string
//   vote_average: number
//   vote_count: number
// }

export type SimilarMovies = {
  "page": number,
  "results": {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }[],
  "total_pages": number,
  "total_results": number
}

// ?...





export type PersonMovieCredits = {
  id: number,
  cast: (SimilarMovies['results'][0] & {
    character: string,
    credit_id: string,
    order: number 
  })[],
  crew: (Omit<PersonMovieCredits['cast'][0], 'order' | 'character'> & {
    department: string,
    job: string
  })[]
}





/* 
page: 1
​​
results: Array(20) [ {…}, {…}, {…}, … ]
​​
total_pages: 2
​​
total_results: 40 

adult: false
​​​​
backdrop_path: "/euuK8owCrdiz0HMj8iVhhquPhDv.jpg"
​​​​
first_air_date: "2003-09-23"
​​​​
genre_ids: Array(3) [ 80, 18, 10759 ]
​​​​
id: 4614
​​​​
media_type: "tv"
​​​​
name: "NCIS"
​​​​
origin_country: Array [ "US" ]
​​​​
original_language: "en"
​​​​
original_name: "NCIS"
​​​​
overview: "From murder and espionage to terrorism and stolen submarines, a team of special agents investigates any crime that has a shred of evidence connected to Navy and Marine Corps personnel, regardless of rank or position."
​​​​
popularity: 849.955
​​​​
poster_path: "/2exOHePjOTquUsbThPGhuEjYTyA.jpg"
​​​​
vote_average: 7.6
​​​​
vote_count: 2137

*/




