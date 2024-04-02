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
  "backdrop_path": string,
  "belongs_to_collection": BelongsToCollection,
  "budget": number,
  "genres": Genre[],
  "homepage": string,
  "id": number,
  "imdb_id": string,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
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



const personDetails = {
  "adult": false,
  "also_known_as": [
    "杰森·莫玛",
    "제이슨 모모아",
    "Джейсон Момоа",
    "Joseph Jason Namakaeha Momoa",
    "Τζόζεφ Τζέισον Ναμακαέχα Μομόα",
    "Τζέισον Μομόα",
    "ジェイソン・モモア",
    "Jason Mamoa",
    "ג'ייסון מומואה"
  ],
  "biography": "Joseph Jason Namakaeha Momoa (born August 1, 1979) is an American actor and filmmaker. He made his acting debut as Jason Ioane on the syndicated action drama series Baywatch: Hawaii (1999–2001), which was followed by his portrayal of Ronon Dex on the Syfy science fiction series Stargate Atlantis (2005–2009), Khal Drogo in the first two seasons of the HBO fantasy drama series Game of Thrones (2011–2012), Declan Harp on the Discovery Channel historical drama series Frontier (2016–2018), and Baba Voss on the Apple TV+ science fiction series See (2019–present). Momoa was featured as the lead of the two lattermost series.\n\nSince 2016, Momoa portrays Arthur Curry / Aquaman in the DC Extended Universe (DCEU), headlining the eponymous 2018 film and its 2023 sequel. Momoa also played Duncan Idaho in the 2021 film adaptation of the science fiction novel Dune.\n\nDescription above from the Wikipedia article Jason Momoa, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
  "birthday": "1979-08-01",
  "deathday": null,
  "gender": 2,
  "homepage": null,
  "id": 117642,
  "imdb_id": "nm0597388",
  "known_for_department": "Acting",
  "name": "Jason Momoa",
  "place_of_birth": "Honolulu, Hawaii, USA",
  "popularity": 78.413,
  "profile_path": "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg"
}


const movieReviews = {
  "id": 572802,
  "page": 1,
  "results": [
    {
      "author": "Manuel São Bento",
      "author_details": {
        "name": "Manuel São Bento",
        "username": "msbreviews",
        "avatar_path": null,
        "rating": 6
      },
      "content": "FULL SPOILER-FREE REVIEW @ https://fandomwire.com/aquaman-and-the-lost-kingdom-review/\r\n\r\n\"Aquaman and the Lost Kingdom is a 'fine' farewell to the DCEU. Jason Momoa and Patrick Wilson's amusing chemistry offers plenty of entertaining moments, as their characters' complex relationship takes center stage as the primary thematic force. Mostly consistent from a visual standpoint, featuring well-executed set pieces that will leave the more action-addicted fans satisfied.\r\n\r\nNevertheless, the overreliance on exposition, a messy narrative structure, and other minor yet questionable decisions detract from the overall cohesiveness of the story. As the final installment, it's a pretty accurate mirror that reflects the highs and lows of the cinematic universe as a whole.\r\n\r\nWhile far from a mind-blowing send-off, it encapsulates the essence of the DCEU - a journey filled with few triumphs, many missed opportunities, and incomprehensible disasters.\"\r\n\r\nRating: B-",
      "created_at": "2023-12-21T16:26:21.038Z",
      "id": "6584672cf1759c3f51118a1e",
      "updated_at": "2023-12-21T16:26:21.147Z",
      "url": "https://www.themoviedb.org/review/6584672cf1759c3f51118a1e"
    },
    {
      "author": "CinemaSerf",
      "author_details": {
        "name": "CinemaSerf",
        "username": "Geronimo1967",
        "avatar_path": "/1kks3YnVkpyQxzw36CObFPvhL5f.jpg",
        "rating": 6
      },
      "content": "So here's good old \"Arthur\" (Jason Momoa) sitting around the house playing nursemaid to his young son with his wife \"Mera\" (Amber Heard) whilst all in his underwater kingdom is peaceful. Well not for long! \"Black Manta\" (Yahya Abdul-Mateen II) is still a tad narked after the last film (five years ago!) and now armed with an useful geek \"Dr. Shin\" (Randall Park) sets out to discover a secret trident that will enable him to destroy \"Atlantis\" altogether and maybe also release the long captive \"Kordax\" (wasn't that the stuff they used to make telephone cables from?) to help make his revenge complete. Initially hopelessly outgunned by his nemesis's sonic gun, he has to resort to the drastic step of rescuing his imprisoned brother \"Orm\" (Patrick Wilson) - whom you may recall he was instrumental in deposing and incarcerating in the first place; and hoping that he will join forces with them, \"Atlanna\" (Nicole Kidman) and \"King Nereus\" (an almost unrecognisable Dolph Lundgren). With battles lines drawn the films goes from \"Narnia\" to \"Middle Earth\" via the \"Lost World\" and even a bit of \"Ice Station Zebra\" for a series of ploddingly slow and disappointing set-piece adventures. To be fair, the last half hour does lift the pace a little, but by then I'm not sure if it wasn't all just a rather too late. Momoa is trying very hard here, but he's no Dwayne Johnson, and even the dulcets of John Rhys-Davies as the \"Brine King\" - with or without his claw - can't really raise this from it's pretty weak and feeble doldrums. Of course it looks good, loads of quality CGI and visual effects, but the story is light and overly strung out for two hours that really did feel more like two days at times. It's harmless fodder for Christmas cinema with very little to actually dislike about it - it's just the latest in a series of equally forgettable super-hero films that I suspect will leave no impact at all in the snow afterwards.",
      "created_at": "2023-12-24T12:28:49.987Z",
      "id": "65882401688cd057b284dd8f",
      "updated_at": "2023-12-24T12:28:50.084Z",
      "url": "https://www.themoviedb.org/review/65882401688cd057b284dd8f"
    },
    {
      "author": "hamfaceman",
      "author_details": {
        "name": "",
        "username": "hamfaceman",
        "avatar_path": null,
        "rating": 3
      },
      "content": "This movie was really quite terrible. I didn't watch the whole thing, but the parts that I did see were incredibly boring and poorly acted and the underwater stuff looks terrible. 2 hams carved into the shape of fists with the thumbs pointed downwards.",
      "created_at": "2024-01-30T22:13:46.379Z",
      "id": "65b9749a90fca3017b074392",
      "updated_at": "2024-01-30T22:13:46.481Z",
      "url": "https://www.themoviedb.org/review/65b9749a90fca3017b074392"
    }
  ],
  "total_pages": 1,
  "total_results": 3
}

const credit = {
  "id": 572802,
  "cast": [
    {
      "adult": false,
      "gender": 2,
      "id": 117642,
      "known_for_department": "Acting",
      "name": "Jason Momoa",
      "original_name": "Jason Momoa",
      "popularity": 69.497,
      "profile_path": "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
      "cast_id": 93,
      "character": "Arthur Curry / Aquaman",
      "credit_id": "65b4239557530e0147d981bc",
      "order": 0
    },
  ]
}

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



//combined credits
const personCombinedCredit = {
  "credit_type": "crew",
  "department": "Camera",
  "job": "Director of Photography",
  "media": {
    "adult": false,
    "backdrop_path": "/cnqwv5Uz3UW5f086IWbQKr3ksJr.jpg",
    "id": 572802,
    "title": "Aquaman and the Lost Kingdom",
    "original_language": "en",
    "original_title": "Aquaman and the Lost Kingdom",
    "overview": "Black Manta seeks revenge on Aquaman for his father's death. Wielding the Black Trident's power, he becomes a formidable foe. To defend Atlantis, Aquaman forges an alliance with his imprisoned brother. They must protect the kingdom.",
    "poster_path": "/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg",
    "media_type": "movie",
    "genre_ids": [
      28,
      12,
      14
    ],
    "popularity": 1111.929,
    "release_date": "2023-12-20",
    "video": false,
    "vote_average": 6.965,
    "vote_count": 1474
  },
  "media_type": "movie",
  "id": "60e4e0734ca676005e169d68",
  "person": {
    "adult": false,
    "id": 36,
    "name": "Don Burgess",
    "original_name": "Don Burgess",
    "media_type": "person",
    "popularity": 5.996,
    "gender": 2,
    "known_for_department": "Camera",
    "profile_path": "/aIB6XjNFDWxRpB2l5GKXWEzMI4O.jpg"
  }
}

const personImages = {
  "id": 92404,
  "profiles": [
    {
      "aspect_ratio": 0.666,
      "height": 899,
      "iso_639_1": null,
      "file_path": "/c4TTWy1WntzDxpgIe8kbODjWOfD.jpg",
      "vote_average": 5.388,
      "vote_count": 4,
      "width": 599
    },
  ]
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




