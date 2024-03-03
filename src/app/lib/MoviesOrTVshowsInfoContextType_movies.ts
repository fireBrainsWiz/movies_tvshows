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
    {
      "adult": false,
      "gender": 2,
      "id": 17178,
      "known_for_department": "Acting",
      "name": "Patrick Wilson",
      "original_name": "Patrick Wilson",
      "popularity": 57.137,
      "profile_path": "/tc1ezEfIY8BhCy85svOUDtpBFPt.jpg",
      "cast_id": 11,
      "character": "Orm",
      "credit_id": "5f41dea381a7fc00360ad5b3",
      "order": 1
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1639847,
      "known_for_department": "Acting",
      "name": "Yahya Abdul-Mateen II",
      "original_name": "Yahya Abdul-Mateen II",
      "popularity": 22.287,
      "profile_path": "/aBDebGZs2pAucyaK4EhHVJGm0Xu.jpg",
      "cast_id": 6,
      "character": "Black Manta",
      "credit_id": "5c3399c40e0a2666043e1ba7",
      "order": 2
    },
    {
      "adult": false,
      "gender": 2,
      "id": 79082,
      "known_for_department": "Acting",
      "name": "Randall Park",
      "original_name": "Randall Park",
      "popularity": 35.351,
      "profile_path": "/GpERQxWcT3TXLHpH8b6hIyUazK.jpg",
      "cast_id": 14,
      "character": "Dr. Shin",
      "credit_id": "60774d2b2938350029813250",
      "order": 3
    },
    {
      "adult": false,
      "gender": 1,
      "id": 55085,
      "known_for_department": "Acting",
      "name": "Amber Heard",
      "original_name": "Amber Heard",
      "popularity": 54.123,
      "profile_path": "/uSzl2r83U1GsI2IozMwXzlx9FAU.jpg",
      "cast_id": 34,
      "character": "Mera",
      "credit_id": "628ceae61a32483b641aa093",
      "order": 4
    },
    {
      "adult": false,
      "gender": 1,
      "id": 2227,
      "known_for_department": "Acting",
      "name": "Nicole Kidman",
      "original_name": "Nicole Kidman",
      "popularity": 70.177,
      "profile_path": "/q4pjhmbvI0bCvvX3N9tGS8Y1nUW.jpg",
      "cast_id": 36,
      "character": "Atlanna",
      "credit_id": "629e1e2b5507e93225ba4c64",
      "order": 5
    },
    {
      "adult": false,
      "gender": 2,
      "id": 16644,
      "known_for_department": "Acting",
      "name": "Dolph Lundgren",
      "original_name": "Dolph Lundgren",
      "popularity": 49.956,
      "profile_path": "/fisJpm05tw6GCJ4v62TKBCoWuZM.jpg",
      "cast_id": 23,
      "character": "King Nereus",
      "credit_id": "61352904d4d509002c5f1487",
      "order": 6
    },
    {
      "adult": false,
      "gender": 2,
      "id": 7242,
      "known_for_department": "Acting",
      "name": "Temuera Morrison",
      "original_name": "Temuera Morrison",
      "popularity": 29.043,
      "profile_path": "/1ckHDFgKXJ8pazmvLCW7DeOKqA0.jpg",
      "cast_id": 12,
      "character": "Tom",
      "credit_id": "605293aa447f9c00291960af",
      "order": 7
    },
    {
      "adult": false,
      "gender": 3,
      "id": 1789788,
      "known_for_department": "Acting",
      "name": "Indya Moore",
      "original_name": "Indya Moore",
      "popularity": 15.495,
      "profile_path": "/kW3BI0LFgePZCVKE5Xyl239vMbm.jpg",
      "cast_id": 25,
      "character": "Karshon",
      "credit_id": "614e4caa124c8d006240ee00",
      "order": 8
    },
    {
      "adult": false,
      "gender": 2,
      "id": 90060,
      "known_for_department": "Acting",
      "name": "Pilou Asbæk",
      "original_name": "Pilou Asbæk",
      "popularity": 27.035,
      "profile_path": "/tAfdT1vfbRol4L40xWvV0sqWGPF.jpg",
      "cast_id": 18,
      "character": "Kordax",
      "credit_id": "60789e5743d9b10057d58370",
      "order": 9
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1364149,
      "known_for_department": "Acting",
      "name": "Jani Zhao",
      "original_name": "Jani Zhao",
      "popularity": 12.679,
      "profile_path": "/dQ9nyHLc3q33hpJL9OUhzM9kkQH.jpg",
      "cast_id": 24,
      "character": "Stingray",
      "credit_id": "614e4c98a9b9a40091083b36",
      "order": 10
    },
    {
      "adult": false,
      "gender": 2,
      "id": 9831,
      "known_for_department": "Acting",
      "name": "Vincent Regan",
      "original_name": "Vincent Regan",
      "popularity": 34.08,
      "profile_path": "/cJQTmdDHWiEIh8PP9at7RGL3L60.jpg",
      "cast_id": 26,
      "character": "Atlan",
      "credit_id": "614e4ceeaaf897008f1f11f6",
      "order": 11
    },
    {
      "adult": false,
      "gender": 2,
      "id": 519,
      "known_for_department": "Acting",
      "name": "Martin Short",
      "original_name": "Martin Short",
      "popularity": 24.212,
      "profile_path": "/vWoZIOk7K8TSKu1IN90akswsWjZ.jpg",
      "cast_id": 56,
      "character": "Kingfish (voice)",
      "credit_id": "6584b0af6e938a4518741a34",
      "order": 12
    },
    {
      "adult": false,
      "gender": 2,
      "id": 655,
      "known_for_department": "Acting",
      "name": "John Rhys-Davies",
      "original_name": "John Rhys-Davies",
      "popularity": 27.423,
      "profile_path": "/bfn4WvhGo2QKYtv5ynk7tKu7NnL.jpg",
      "cast_id": 57,
      "character": "Brine King (voice)",
      "credit_id": "6584b0dcd55697527f527bc5",
      "order": 13
    },
    {
      "adult": false,
      "gender": 1,
      "id": 20755,
      "known_for_department": "Acting",
      "name": "Natalia Safran",
      "original_name": "Natalia Safran",
      "popularity": 7.589,
      "profile_path": "/3luVtifpeQvF54jEf6NbK2Oz0dE.jpg",
      "cast_id": 61,
      "character": "Council Lady",
      "credit_id": "6588243f2dffd85b40459638",
      "order": 14
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4446224,
      "known_for_department": "Acting",
      "name": "Samuel Gosrani",
      "original_name": "Samuel Gosrani",
      "popularity": 1.306,
      "profile_path": null,
      "cast_id": 62,
      "character": "Mercenary Tech",
      "credit_id": "6588244cb0cd20529b581e1b",
      "order": 15
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2651811,
      "known_for_department": "Acting",
      "name": "Jay Rincon",
      "original_name": "Jay Rincon",
      "popularity": 4.64,
      "profile_path": "/r7rJsxsJjfyN2YYWWaXzliu1zzh.jpg",
      "cast_id": 63,
      "character": "Scientist #1",
      "credit_id": "6588245afad8e95d228e2ec0",
      "order": 16
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1891226,
      "known_for_department": "Acting",
      "name": "Sohm Kapila",
      "original_name": "Sohm Kapila",
      "popularity": 6.624,
      "profile_path": "/ySLjCzMYmeMKiP0xVO48F2aJLTE.jpg",
      "cast_id": 64,
      "character": "Reporter",
      "credit_id": "65882473688cd057b284ddb3",
      "order": 17
    },
    {
      "adult": false,
      "gender": 2,
      "id": 25912,
      "known_for_department": "Acting",
      "name": "Ricardo Molina",
      "original_name": "Ricardo Molina",
      "popularity": 3.374,
      "profile_path": "/ubtiODxiE8Ne0axLW5c0XxiNsNY.jpg",
      "cast_id": 65,
      "character": "Reporter",
      "credit_id": "6588247e4da3d463a1421b4a",
      "order": 18
    },
    {
      "adult": false,
      "gender": 1,
      "id": 117656,
      "known_for_department": "Acting",
      "name": "Ingrid Bisu",
      "original_name": "Ingrid Bisu",
      "popularity": 11.343,
      "profile_path": "/2thd0dnfnI2TK7s9RZHkkq82O4t.jpg",
      "cast_id": 66,
      "character": "Pier Waitress",
      "credit_id": "65882496fad8e95d228e2eda",
      "order": 19
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1268988,
      "known_for_department": "Acting",
      "name": "Grant Huggair",
      "original_name": "Grant Huggair",
      "popularity": 1.75,
      "profile_path": "/8gnjria4AMwNdreJ5WLJFy0bggB.jpg",
      "cast_id": 67,
      "character": "Surface Dweller",
      "credit_id": "658824a1ea7b0e5ede8fe1da",
      "order": 20
    },
    {
      "adult": false,
      "gender": 0,
      "id": 2595392,
      "known_for_department": "Acting",
      "name": "Osian Roberts",
      "original_name": "Osian Roberts",
      "popularity": 3.855,
      "profile_path": null,
      "cast_id": 68,
      "character": "Atlantean Fighter Pilot #2",
      "credit_id": "658824af325a5157bb01bf14",
      "order": 21
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4446225,
      "known_for_department": "Acting",
      "name": "Jonny Vaughton",
      "original_name": "Jonny Vaughton",
      "popularity": 0.84,
      "profile_path": null,
      "cast_id": 69,
      "character": "Atlantean Fighter Pilot #1",
      "credit_id": "658824bd688cd057eb84a6c5",
      "order": 22
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2115876,
      "known_for_department": "Acting",
      "name": "Jay McDonald",
      "original_name": "Jay McDonald",
      "popularity": 1.34,
      "profile_path": null,
      "cast_id": 70,
      "character": "Ocean Freighter Captain",
      "credit_id": "658acd42688cd058fe84586d",
      "order": 23
    },
    {
      "adult": false,
      "gender": 2,
      "id": 3036833,
      "known_for_department": "Acting",
      "name": "Jonathan Bremner",
      "original_name": "Jonathan Bremner",
      "popularity": 4.406,
      "profile_path": null,
      "cast_id": 71,
      "character": "Octobot Mercenary #1",
      "credit_id": "658ace06dd258972556bd614",
      "order": 24
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1949685,
      "known_for_department": "Acting",
      "name": "Jack Waldouck",
      "original_name": "Jack Waldouck",
      "popularity": 1.657,
      "profile_path": null,
      "cast_id": 72,
      "character": "Octobot Mercenary #2",
      "credit_id": "658ace2b688cd057eb85cf37",
      "order": 25
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501895,
      "known_for_department": "Acting",
      "name": "Tyler Burger",
      "original_name": "Tyler Burger",
      "popularity": 0.6,
      "profile_path": null,
      "cast_id": 75,
      "character": "Junior Baby",
      "credit_id": "65b420979ba86a0183305ee8",
      "order": 26
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501896,
      "known_for_department": "Acting",
      "name": "Maddox Cruz-Porter",
      "original_name": "Maddox Cruz-Porter",
      "popularity": 0.98,
      "profile_path": null,
      "cast_id": 76,
      "character": "Junior Baby",
      "credit_id": "65b420a157530e0183d9f399",
      "order": 27
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501897,
      "known_for_department": "Acting",
      "name": "River Ao Moemoeā Green",
      "original_name": "River Ao Moemoeā Green",
      "popularity": 0.98,
      "profile_path": null,
      "cast_id": 77,
      "character": "Junior Baby",
      "credit_id": "65b420c25e14e501490c40d9",
      "order": 28
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501898,
      "known_for_department": "Acting",
      "name": "Nikau Keats Green",
      "original_name": "Nikau Keats Green",
      "popularity": 1.048,
      "profile_path": null,
      "cast_id": 78,
      "character": "Junior Baby",
      "credit_id": "65b420cea0f1a2017abeca11",
      "order": 29
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501899,
      "known_for_department": "Acting",
      "name": "Bodhi McCabe",
      "original_name": "Bodhi McCabe",
      "popularity": 1.008,
      "profile_path": null,
      "cast_id": 79,
      "character": "Junior Baby",
      "credit_id": "65b420d85541fa014ab16ab5",
      "order": 30
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501901,
      "known_for_department": "Acting",
      "name": "Elliot Oben-Perpa",
      "original_name": "Elliot Oben-Perpa",
      "popularity": 0.648,
      "profile_path": null,
      "cast_id": 80,
      "character": "Junior Baby",
      "credit_id": "65b420e8d236e60163c047c6",
      "order": 31
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501902,
      "known_for_department": "Acting",
      "name": "Lucian Oben-Perpa",
      "original_name": "Lucian Oben-Perpa",
      "popularity": 0.998,
      "profile_path": null,
      "cast_id": 81,
      "character": "Junior Baby",
      "credit_id": "65b420f95e14e501490c40ff",
      "order": 32
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501903,
      "known_for_department": "Acting",
      "name": "Arthur Rowe-Mayer",
      "original_name": "Arthur Rowe-Mayer",
      "popularity": 0.6,
      "profile_path": null,
      "cast_id": 82,
      "character": "Junior Baby",
      "credit_id": "65b421059ba86a00e42fe1ca",
      "order": 33
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501904,
      "known_for_department": "Acting",
      "name": "Noah Rowe-Mayer",
      "original_name": "Noah Rowe-Mayer",
      "popularity": 1.052,
      "profile_path": null,
      "cast_id": 83,
      "character": "Junior Baby",
      "credit_id": "65b42113d236e60184c08352",
      "order": 34
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4501913,
      "known_for_department": "Acting",
      "name": "Julie Chang",
      "original_name": "Julie Chang",
      "popularity": 0.6,
      "profile_path": null,
      "cast_id": 84,
      "character": "Reporter",
      "credit_id": "65b421929ba86a0183305f4d",
      "order": 35
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4453344,
      "known_for_department": "Acting",
      "name": "Mark Kwak",
      "original_name": "Mark Kwak",
      "popularity": 1.592,
      "profile_path": null,
      "cast_id": 85,
      "character": "Reporter",
      "credit_id": "65b4219b5541fa0131b1402d",
      "order": 36
    },
    {
      "adult": false,
      "gender": 1,
      "id": 2997157,
      "known_for_department": "Acting",
      "name": "Dylan Silver",
      "original_name": "Dylan Silver",
      "popularity": 0.998,
      "profile_path": "/xQlVukhlIAnYRjvg4HPF0EbAcGY.jpg",
      "cast_id": 86,
      "character": "Reporter",
      "credit_id": "65b421ada06645012f8d793b",
      "order": 37
    },
    {
      "adult": false,
      "gender": 0,
      "id": 2562705,
      "known_for_department": "Acting",
      "name": "Jon Birkbeck",
      "original_name": "Jon Birkbeck",
      "popularity": 1.166,
      "profile_path": null,
      "cast_id": 87,
      "character": "Orm Suit Performer",
      "credit_id": "65b421ea0ed2ab01638686a8",
      "order": 38
    },
    {
      "adult": false,
      "gender": 2,
      "id": 87118,
      "known_for_department": "Acting",
      "name": "Michael Beach",
      "original_name": "Michael Beach",
      "popularity": 16.541,
      "profile_path": "/7gCBCpK2OSzuUWk5iTZds9NjqkF.jpg",
      "cast_id": 54,
      "character": "Jesse Kane (archive footage) (uncredited)",
      "credit_id": "6583a36bf1759c3fd910fae3",
      "order": 39
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517728,
      "known_for_department": "Art",
      "name": "에볼루션카지노(Evolution Casino)",
      "original_name": "에볼루션카지노(Evolution Casino)",
      "popularity": 0.753,
      "profile_path": null,
      "cast_id": 102,
      "character": "EvolutionCasino",
      "credit_id": "65bfb0e0ba480201616ac23a",
      "order": 40
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517729,
      "known_for_department": "Art",
      "name": "더킹플러스카지노",
      "original_name": "더킹플러스카지노",
      "popularity": 1.943,
      "profile_path": null,
      "cast_id": 103,
      "character": "The King Plus Casino",
      "credit_id": "65bfb10112c604017c02b370",
      "order": 41
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517741,
      "known_for_department": "Acting",
      "name": "스페이스맨카지노",
      "original_name": "스페이스맨카지노",
      "popularity": 1.646,
      "profile_path": null,
      "cast_id": 104,
      "character": "Spaceman Casino",
      "credit_id": "65bfb11ffc6538017cec5ece",
      "order": 42
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517731,
      "known_for_department": "Costume & Make-Up",
      "name": "플러스카지노",
      "original_name": "플러스카지노",
      "popularity": 0.753,
      "profile_path": null,
      "cast_id": 105,
      "character": "Plus Casino",
      "credit_id": "65bfb13943999b0184c836de",
      "order": 43
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517732,
      "known_for_department": "Art",
      "name": "프리카지노",
      "original_name": "프리카지노",
      "popularity": 0.753,
      "profile_path": null,
      "cast_id": 106,
      "character": "Free Casino",
      "credit_id": "65bfb146fc6538017cec5ef1",
      "order": 44
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517733,
      "known_for_department": "Sound",
      "name": "로즈카지노",
      "original_name": "로즈카지노",
      "popularity": 0.753,
      "profile_path": null,
      "cast_id": 107,
      "character": "Rose Casino",
      "credit_id": "65bfb15c43999b0163c66e91",
      "order": 45
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517734,
      "known_for_department": "Crew",
      "name": "샌즈카지노",
      "original_name": "샌즈카지노",
      "popularity": 1.153,
      "profile_path": null,
      "cast_id": 108,
      "character": "Sands Casino",
      "credit_id": "65bfb169a35c8e017cd648f0",
      "order": 46
    }
  ],
  "crew": [
    {
      "adult": false,
      "gender": 2,
      "id": 36,
      "known_for_department": "Camera",
      "name": "Don Burgess",
      "original_name": "Don Burgess",
      "popularity": 5.996,
      "profile_path": "/aIB6XjNFDWxRpB2l5GKXWEzMI4O.jpg",
      "credit_id": "60e4e0734ca676005e169d68",
      "department": "Camera",
      "job": "Director of Photography"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1113,
      "known_for_department": "Production",
      "name": "Lucinda Syson",
      "original_name": "Lucinda Syson",
      "popularity": 2.218,
      "profile_path": null,
      "credit_id": "65b4239e9ba86a01623023e1",
      "department": "Production",
      "job": "Casting"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2127,
      "known_for_department": "Directing",
      "name": "James Wan",
      "original_name": "James Wan",
      "popularity": 24.447,
      "profile_path": "/bNJccMIKzCtYnndcOKniSKCzo5Y.jpg",
      "credit_id": "5c34e1950e0a2654b8d8d3ff",
      "department": "Directing",
      "job": "Director"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2127,
      "known_for_department": "Directing",
      "name": "James Wan",
      "original_name": "James Wan",
      "popularity": 24.447,
      "profile_path": "/bNJccMIKzCtYnndcOKniSKCzo5Y.jpg",
      "credit_id": "6078ca802faf4d0078abe393",
      "department": "Production",
      "job": "Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2127,
      "known_for_department": "Directing",
      "name": "James Wan",
      "original_name": "James Wan",
      "popularity": 24.447,
      "profile_path": "/bNJccMIKzCtYnndcOKniSKCzo5Y.jpg",
      "credit_id": "64fe6050fa40460139d711f6",
      "department": "Writing",
      "job": "Story"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2593,
      "known_for_department": "Sound",
      "name": "Rupert Gregson-Williams",
      "original_name": "Rupert Gregson-Williams",
      "popularity": 4.792,
      "profile_path": "/6qr9v5tsFrZtAA8EUfO1XQtUHhB.jpg",
      "credit_id": "6114946d283ed90045fac9ac",
      "department": "Sound",
      "job": "Original Music Composer"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 9545,
      "known_for_department": "Production",
      "name": "Anne McCarthy",
      "original_name": "Anne McCarthy",
      "popularity": 1.982,
      "profile_path": null,
      "credit_id": "65b4238ba0f1a2017abecb2c",
      "department": "Production",
      "job": "Casting"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 18330,
      "known_for_department": "Production",
      "name": "Rob Cowan",
      "original_name": "Rob Cowan",
      "popularity": 2.394,
      "profile_path": null,
      "credit_id": "61c378dd48333a00428eb3b8",
      "department": "Production",
      "job": "Producer"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 42263,
      "known_for_department": "Visual Effects",
      "name": "Alex Bicknell",
      "original_name": "Alex Bicknell",
      "popularity": 2.188,
      "profile_path": null,
      "credit_id": "65b4236ad236e60184c08440",
      "department": "Visual Effects",
      "job": "Visual Effects Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 47365,
      "known_for_department": "Production",
      "name": "Walter Hamada",
      "original_name": "Walter Hamada",
      "popularity": 4.587,
      "profile_path": "/cykm5UtrpVYMY6gc5CfFt6eXZXG.jpg",
      "credit_id": "61bbebf244a424001c13607f",
      "department": "Production",
      "job": "Executive Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 52259,
      "known_for_department": "Production",
      "name": "Peter Safran",
      "original_name": "Peter Safran",
      "popularity": 4.203,
      "profile_path": "/fi7kdDDUdNrn5K6vmLkLrLarQQs.jpg",
      "credit_id": "5c2fae46c3a3680b8ca2e881",
      "department": "Production",
      "job": "Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 52600,
      "known_for_department": "Art",
      "name": "Bill Brzeski",
      "original_name": "Bill Brzeski",
      "popularity": 1.37,
      "profile_path": null,
      "credit_id": "60774e1d19ab59004062d106",
      "department": "Art",
      "job": "Production Design"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 62813,
      "known_for_department": "Editing",
      "name": "Kirk M. Morri",
      "original_name": "Kirk M. Morri",
      "popularity": 3.98,
      "profile_path": null,
      "credit_id": "64fe6023ffc9de0ee00c5137",
      "department": "Editing",
      "job": "Editor"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 117642,
      "known_for_department": "Acting",
      "name": "Jason Momoa",
      "original_name": "Jason Momoa",
      "popularity": 69.497,
      "profile_path": "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
      "credit_id": "64fe605cffc9de0eded327c5",
      "department": "Writing",
      "job": "Story"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 142686,
      "known_for_department": "Writing",
      "name": "David Leslie Johnson-McGoldrick",
      "original_name": "David Leslie Johnson-McGoldrick",
      "popularity": 8.956,
      "profile_path": "/4asz1xDkGKMferQ2L9Gexd9CPvs.jpg",
      "credit_id": "64fe6073db4ed61032a6583f",
      "department": "Writing",
      "job": "Screenplay"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 142686,
      "known_for_department": "Writing",
      "name": "David Leslie Johnson-McGoldrick",
      "original_name": "David Leslie Johnson-McGoldrick",
      "popularity": 8.956,
      "profile_path": "/4asz1xDkGKMferQ2L9Gexd9CPvs.jpg",
      "credit_id": "64fe6056db4ed610343eb645",
      "department": "Writing",
      "job": "Story"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 256928,
      "known_for_department": "Visual Effects",
      "name": "Nick Davis",
      "original_name": "Nick Davis",
      "popularity": 3.433,
      "profile_path": "/xiS6GP2se6qJFEDyKuQCcQa9Ced.jpg",
      "credit_id": "64fe61372dffd8013bccb320",
      "department": "Visual Effects",
      "job": "Visual Effects Supervisor"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1222597,
      "known_for_department": "Writing",
      "name": "Mort Weisinger",
      "original_name": "Mort Weisinger",
      "popularity": 8.191,
      "profile_path": "/czoIFxONXNoWee6hPgcLXMCbGLc.jpg",
      "credit_id": "61c378c84bfa54008a2fdeb4",
      "department": "Writing",
      "job": "Characters"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1276602,
      "known_for_department": "Production",
      "name": "Kellie Roy",
      "original_name": "Kellie Roy",
      "popularity": 3.758,
      "profile_path": null,
      "credit_id": "65b42394a06645017c8de919",
      "department": "Production",
      "job": "Casting"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1342659,
      "known_for_department": "Crew",
      "name": "Steve Griffin",
      "original_name": "Steve Griffin",
      "popularity": 5.258,
      "profile_path": "/96jCbRYnTygubfWckJieITgCBsn.jpg",
      "credit_id": "6582478102576407c149d93e",
      "department": "Crew",
      "job": "Stunt Coordinator"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 1354914,
      "known_for_department": "Costume & Make-Up",
      "name": "Richard Sale",
      "original_name": "Richard Sale",
      "popularity": 3.577,
      "profile_path": null,
      "credit_id": "60e4e0a584591c005dbbb622",
      "department": "Costume & Make-Up",
      "job": "Costume Design"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1359416,
      "known_for_department": "Acting",
      "name": "Laura Swift",
      "original_name": "Laura Swift",
      "popularity": 7.507,
      "profile_path": "/eMYeKkEYIQ2MCdw4puoHWo65xnn.jpg",
      "credit_id": "65824761d5191f08e0ae2a47",
      "department": "Crew",
      "job": "Stunt Double"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1379940,
      "known_for_department": "Acting",
      "name": "Joel Adrian",
      "original_name": "Joel Adrian",
      "popularity": 3.851,
      "profile_path": null,
      "credit_id": "658247438dbc330918995b96",
      "department": "Crew",
      "job": "Stunt Double"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1427715,
      "known_for_department": "Crew",
      "name": "Jon Valera",
      "original_name": "Jon Valera",
      "popularity": 13.241,
      "profile_path": "/kvcBOZCEMrHLwfsb7kUBDPl0AMk.jpg",
      "credit_id": "65824774875d1a07aaaf80c8",
      "department": "Crew",
      "job": "Stunt Coordinator"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1545447,
      "known_for_department": "Sound",
      "name": "Michelle Kuznetsky Silverman",
      "original_name": "Michelle Kuznetsky Silverman",
      "popularity": 3.545,
      "profile_path": "/8yqEC1e0SphV0Rymtkjb7LQqRlI.jpg",
      "credit_id": "64fe5fefc3bffe00c78350eb",
      "department": "Sound",
      "job": "Music Supervisor"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 1696981,
      "known_for_department": "Acting",
      "name": "Akihiro Haga",
      "original_name": "Akihiro Haga",
      "popularity": 3.749,
      "profile_path": null,
      "credit_id": "65b422a65e14e5012f0c1ad5",
      "department": "Crew",
      "job": "Stunt Coordinator"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1718184,
      "known_for_department": "Writing",
      "name": "Paul Norris",
      "original_name": "Paul Norris",
      "popularity": 8.044,
      "profile_path": "/rHDHSx4g4nHU2BzXIB8LuMBx7Qk.jpg",
      "credit_id": "61c378c0d05a03001b1709e7",
      "department": "Writing",
      "job": "Characters"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1735551,
      "known_for_department": "Crew",
      "name": "Jacob Dewitt",
      "original_name": "Jacob Dewitt",
      "popularity": 4.092,
      "profile_path": null,
      "credit_id": "65b4229857530e012ed95f3d",
      "department": "Crew",
      "job": "Stunt Coordinator"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 1826391,
      "known_for_department": "Writing",
      "name": "Thomas Pa'a Sibbett",
      "original_name": "Thomas Pa'a Sibbett",
      "popularity": 1.543,
      "profile_path": null,
      "credit_id": "64fe606adb4ed6103854f17e",
      "department": "Writing",
      "job": "Story"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2272446,
      "known_for_department": "Crew",
      "name": "Kim Fardy",
      "original_name": "Kim Fardy",
      "popularity": 6.626,
      "profile_path": "/qDyu4KnaWLcnAwmh7RqfNMA2Iqh.jpg",
      "credit_id": "65824736226c5608769df528",
      "department": "Crew",
      "job": "Stunt Double"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 2475246,
      "known_for_department": "Production",
      "name": "Galen Vaisman",
      "original_name": "Galen Vaisman",
      "popularity": 1.46,
      "profile_path": null,
      "credit_id": "61c378b0d861af005edff123",
      "department": "Production",
      "job": "Executive Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2808013,
      "known_for_department": "Visual Effects",
      "name": "Reetu Aggarwal",
      "original_name": "Reetu Aggarwal",
      "popularity": 4.544,
      "profile_path": null,
      "credit_id": "63a5f5acfd630000dca349d9",
      "department": "Visual Effects",
      "job": "3D Artist"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 2879274,
      "known_for_department": "Crew",
      "name": "Melissa Jin",
      "original_name": "Melissa Jin",
      "popularity": 3.362,
      "profile_path": null,
      "credit_id": "6582472c875d1a07bbaf6355",
      "department": "Crew",
      "job": "Stunt Double"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 4445622,
      "known_for_department": "Production",
      "name": "Pete Chiappetta",
      "original_name": "Pete Chiappetta",
      "popularity": 1.943,
      "profile_path": null,
      "credit_id": "65876e3c596a915e15408bb1",
      "department": "Production",
      "job": "Executive Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 4445623,
      "known_for_department": "Production",
      "name": "Andrew Lary",
      "original_name": "Andrew Lary",
      "popularity": 1.912,
      "profile_path": null,
      "credit_id": "65876eea4da3d4644a417aaa",
      "department": "Production",
      "job": "Executive Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 4445624,
      "known_for_department": "Production",
      "name": "Anthony Tittanegro",
      "original_name": "Anthony Tittanegro",
      "popularity": 2.136,
      "profile_path": null,
      "credit_id": "65876f18fad8e95d768db184",
      "department": "Production",
      "job": "Executive Producer"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517728,
      "known_for_department": "Art",
      "name": "에볼루션카지노(Evolution Casino)",
      "original_name": "에볼루션카지노(Evolution Casino)",
      "popularity": 0.753,
      "profile_path": null,
      "credit_id": "65bfaf525cd16e01639cf985",
      "department": "Art",
      "job": "Lead Set Dresser"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517729,
      "known_for_department": "Art",
      "name": "더킹플러스카지노",
      "original_name": "더킹플러스카지노",
      "popularity": 1.943,
      "profile_path": null,
      "credit_id": "65bfaf9643999b0148c4d80d",
      "department": "Art",
      "job": "Additional Construction Grip"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517730,
      "known_for_department": "Art",
      "name": "스페이스맨카지노",
      "original_name": "스페이스맨카지노",
      "popularity": 1.153,
      "profile_path": null,
      "credit_id": "65bfafa5b3390300e9977454",
      "department": "Art",
      "job": "Draughtsman"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517731,
      "known_for_department": "Costume & Make-Up",
      "name": "플러스카지노",
      "original_name": "플러스카지노",
      "popularity": 0.753,
      "profile_path": null,
      "credit_id": "65bfaff2b33903018797b525",
      "department": "Costume & Make-Up",
      "job": "Makeup & Hair Assistant"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517732,
      "known_for_department": "Art",
      "name": "프리카지노",
      "original_name": "프리카지노",
      "popularity": 0.753,
      "profile_path": null,
      "credit_id": "65bfb000b3390301659794d4",
      "department": "Art",
      "job": "Standby Painter"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517733,
      "known_for_department": "Sound",
      "name": "로즈카지노",
      "original_name": "로즈카지노",
      "popularity": 0.753,
      "profile_path": null,
      "credit_id": "65bfb01643999b0184c835b8",
      "department": "Sound",
      "job": "Music Arranger"
    },
    {
      "adult": false,
      "gender": 0,
      "id": 4517734,
      "known_for_department": "Crew",
      "name": "샌즈카지노",
      "original_name": "샌즈카지노",
      "popularity": 1.153,
      "profile_path": null,
      "credit_id": "65bfb0239f37b001305b11f4",
      "department": "Crew",
      "job": "Lighting Camera"
    }
  ]
}

const personCredit = {
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