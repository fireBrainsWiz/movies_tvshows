import { z } from "zod"

export const signupSchema = z.object({
  username: z.string().min(3, {message: 'username is required'}),
  email: z.string().email(),
  password: z.string().min(10, {message: 'password must be at least 10 characters'}),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'passwords do not match',
  path: ['confirmPassword'],
})

export type SignupSchema = z.infer<typeof signupSchema>// created a type from the schema



export const enum Discover {
  MOVIE = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',

  TV = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'
}


export const enum GENRES { 
  ACTION = 'action',
  ADVENTURE = 'adventure',
  ANIMATION = 'animation',
  COMEDY = 'comedy',
  CRIME = 'crime',
  DOCUMENTARY = 'documentary',
  DRAMA = 'drama',
  FAMILY = 'family',
  FANTASY = 'fantasy',
  HISTORY = 'history',
  HORROR = 'horror',
  MUSIC = 'music',
  MYSTERY = 'mystery',
  ROMANCE = 'romance',
  SCIENCE_FICTION = 'science fiction',
  TV_MOVIE = 'tv movie',
  THRILLER = 'thriller',
  WAR = 'war',
  WESTERN = 'western'
}

export const LINKS = {
  MOVIELISTS: {
    NOWPLAYING: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
    POPULAR: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=',
    TOPRATED: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=',
    UPCOMING: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page='
  },

  TVLIST: {
    AIRINGTODAY: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=',
    ONTHEAIR: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=',
    POPULAR: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=',
    TOPRATED: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page='
  },

  TVDETAILS: 'https://api.themoviedb.org/3/tv/82856?language=en-US',

  POPULAR:  {
    MOVIE: 'https://api.themoviedb.org/3/movie/popular?language=en-US',
    TV: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page='
  }
}

export type GetLinks = {
    _tvshows? : {
      TVLIST: {
        AIRINGTODAY: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=',
        ONTHEAIR: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=',
        POPULAR: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=',
        TOPRATED: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page='
      },
      
    },


  _movies?: {
    MOVIELISTS: {
      NOWPLAYING: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
      POPULAR: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=',
      TOPRATED: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=',
      UPCOMING: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page='
    },
  }
}



const TVDetails = {
  "adult": false,
  "backdrop_path": "/9zcbqSxdsRMZWHYtyCd1nXPr2xq.jpg",
  "created_by": [
    {
      "id": 15277,
      "credit_id": "5bb6f5c39251410dc601d77f",
      "name": "Jon Favreau",
      "gender": 2,
      "profile_path": "/8MtRRnEHaBSw8Ztdl8saXiw1egP.jpg"
    }
  ],
  "episode_run_time": [],
  "first_air_date": "2019-11-12",
  "genres": [
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "homepage": "https://www.disneyplus.com/series/the-mandalorian/3jLIGMDYINqD",
  "id": 82856,
  "in_production": true,
  "languages": [
    "en"
  ],
  "last_air_date": "2023-04-19",
  "last_episode_to_air": {
    "id": 4237598,
    "name": "Chapter 24: The Return",
    "overview": "The Mandalorian and his allies confront their enemies.",
    "vote_average": 7.706,
    "vote_count": 34,
    "air_date": "2023-04-19",
    "episode_number": 8,
    "episode_type": "finale",
    "production_code": "",
    "runtime": 39,
    "season_number": 3,
    "show_id": 82856,
    "still_path": "/blG9C2voVSQlC8M1JkJZgo7BvCL.jpg"
  },
  "name": "The Mandalorian",
  "next_episode_to_air": null,
  "networks": [
    {
      "id": 2739,
      "logo_path": "/uzKjVDmQ1WRMvGBb7UNRE0wTn1H.png",
      "name": "Disney+",
      "origin_country": ""
    }
  ],
  "number_of_episodes": 24,
  "number_of_seasons": 3,
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_name": "The Mandalorian",
  "overview": "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
  "popularity": 139.862,
  "poster_path": "/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
  "production_companies": [
    {
      "id": 1,
      "logo_path": "/tlVSws0RvvtPBwViUyOFAO0vcQS.png",
      "name": "Lucasfilm Ltd.",
      "origin_country": "US"
    },
    {
      "id": 141697,
      "logo_path": "/cfyTfcjSd9njenirn3d07xqwrZQ.png",
      "name": "Golem Creations",
      "origin_country": "US"
    },
    {
      "id": 7297,
      "logo_path": "/l29JYQVZbTcjZXoz4CUYFpKRmM3.png",
      "name": "Fairview Entertainment",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "seasons": [
    {
      "air_date": "2019-11-12",
      "episode_count": 8,
      "id": 110346,
      "name": "Season 1",
      "overview": "Set after the fall of the Empire and before the emergence of the First Order. We follow the travails of a lone gunfighter in the outer reaches of the galaxy far from the authority of the New Republic.",
      "poster_path": "/K45A0qGcnGsxNKEvaOItvfVrZx.jpg",
      "season_number": 1,
      "vote_average": 8
    },
    {
      "air_date": "2020-10-30",
      "episode_count": 8,
      "id": 153254,
      "name": "Season 2",
      "overview": "The Mandalorian and the Child continue their journey, facing enemies and rallying allies as they make their way through a dangerous galaxy in the tumultuous era after the collapse of the Galactic Empire.",
      "poster_path": "/pQ33MqEUEQGChyknPtvWODUza1q.jpg",
      "season_number": 2,
      "vote_average": 8.2
    },
    {
      "air_date": "2023-03-01",
      "episode_count": 8,
      "id": 308088,
      "name": "Season 3",
      "overview": "The journeys of the Mandalorian through the Star Wars galaxy continue. Once a lone bounty hunter, Din Djarin has reunited with Grogu. Meanwhile, the New Republic struggles to lead the galaxy away from its dark history. The Mandalorian will cross paths with old allies and make new enemies as he and Grogu continue their journey together.",
      "poster_path": "/mYmFUlheJrXCLoZdS94kezG8Nuw.jpg",
      "season_number": 3,
      "vote_average": 7
    }
  ],
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Returning Series",
  "tagline": "Bounty hunting is a complicated profession.",
  "type": "Scripted",
  "vote_average": 8.5,
  "vote_count": 9482
}

type TopRatedTV = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/oOce9hLMVFubjAJliau4kiSNPnW.jpg",
      "genre_ids": [
        80,
        18
      ],
      "id": 549,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Law & Order",
      "overview": "In cases ripped from the headlines, police investigate serious and often deadly crimes, weighing the evidence and questioning the suspects until someone is taken into custody. The district attorney's office then builds a case to convict the perpetrator by proving the person guilty beyond a reasonable doubt. Working together, these expert teams navigate all sides of the complex criminal justice system to make New York a safer place.",
      "popularity": 5388.629,
      "poster_path": "/77OPlbsvX3pzoFbyfpcE3GXMCod.jpg",
      "first_air_date": "1990-09-13",
      "name": "Law & Order",
      "vote_average": 7.4,
      "vote_count": 486
    },
    {
      "adult": false,
      "backdrop_path": "/cvlLBcQWpO9X21jDHhgPJnE2aVq.jpg",
      "genre_ids": [
        80,
        18,
        9648
      ],
      "id": 1431,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "CSI: Crime Scene Investigation",
      "overview": "A Las Vegas team of forensic investigators are trained to solve criminal cases by scouring the crime scene, collecting irrefutable evidence and finding the missing pieces that solve the mystery.",
      "popularity": 5068.605,
      "poster_path": "/i5hmoRjHNWady4AtAGICTUXknKH.jpg",
      "first_air_date": "2000-10-06",
      "name": "CSI: Crime Scene Investigation",
      "vote_average": 7.642,
      "vote_count": 1081
    },
    {
      "adult": false,
      "backdrop_path": "/9xxLWtnFxkpJ2h1uthpvCRK6vta.jpg",
      "genre_ids": [
        80,
        18,
        9648
      ],
      "id": 2734,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Law & Order: Special Victims Unit",
      "overview": "In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.",
      "popularity": 4286.969,
      "poster_path": "/ywBt4WKADdMVgxTR1rS2uFwMYTH.jpg",
      "first_air_date": "1999-09-20",
      "name": "Law & Order: Special Victims Unit",
      "vote_average": 7.961,
      "vote_count": 3457
    },
    {
      "adult": false,
      "backdrop_path": "/xEtiiv2uhGr9IPgeruuECIfyfin.jpg",
      "genre_ids": [
        18,
        80
      ],
      "id": 1419,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Castle",
      "overview": "After a serial killer imitates the plots of his novels, successful mystery novelist Richard \"Rick\" Castle receives permission from the Mayor of New York City to tag along with an NYPD homicide investigation team for research purposes.",
      "popularity": 4113.665,
      "poster_path": "/diXBeMzvfJb2iJg3G0kCUaMCzEc.jpg",
      "first_air_date": "2009-03-09",
      "name": "Castle",
      "vote_average": 8.008,
      "vote_count": 1674
    },
    {
      "adult": false,
      "backdrop_path": "/ffyxj73OyMEgwS1JiluoYzd3VGb.jpg",
      "genre_ids": [
        18
      ],
      "id": 4601,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Law & Order: Criminal Intent",
      "overview": "The third installment of the “Law & Order” franchise takes viewers deep into the minds of its criminals while following the intense psychological approaches the Major Case Squad uses to solve its crimes.",
      "popularity": 4099.01,
      "poster_path": "/mwynkwd6jql0qamRW6i5Dv6aZ4k.jpg",
      "first_air_date": "2001-09-30",
      "name": "Law & Order: Criminal Intent",
      "vote_average": 7.6,
      "vote_count": 306
    },
    {
      "adult": false,
      "backdrop_path": "/65Y6PweSvQ1OOFBzStybjipURRP.jpg",
      "genre_ids": [
        80,
        18,
        9648
      ],
      "id": 4057,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Criminal Minds",
      "overview": "An elite team of FBI profilers analyze the country's most twisted criminal minds, anticipating their next moves before they strike again. The Behavioral Analysis Unit's most experienced agent is David Rossi, a founding member of the BAU who returns to help the team solve new cases.",
      "popularity": 4016.894,
      "poster_path": "/7TCwgX7oQKxcWYEhSPRmaHe6ULN.jpg",
      "first_air_date": "2005-09-22",
      "name": "Criminal Minds",
      "vote_average": 8.32,
      "vote_count": 3483
    },
    {
      "adult": false,
      "backdrop_path": "/wU1y7snEVYiJBpZ2k1DjIpHgJbx.jpg",
      "genre_ids": [
        16,
        35
      ],
      "id": 1434,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Family Guy",
      "overview": "Sick, twisted, politically incorrect and Freakin' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids. Stewie (a brilliant but sadistic baby bent on killing his mother and taking over the world), Meg (the oldest, and is the most unpopular girl in town) and Chris (the middle kid, he's not very bright but has a passion for movies). The final member of the family is Brian - a talking dog and much more than a pet, he keeps Stewie in check whilst sipping Martinis and sorting through his own life issues.",
      "popularity": 3974.638,
      "poster_path": "/hw2vi8agaJZ7oeSvS8uEYgOtK32.jpg",
      "first_air_date": "1999-01-31",
      "name": "Family Guy",
      "vote_average": 7.301,
      "vote_count": 3997
    },
    {
      "adult": false,
      "backdrop_path": "/rJFqKcmMSttdNP58l0dVzY2NcTA.jpg",
      "genre_ids": [
        80,
        18,
        9648
      ],
      "id": 5920,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "The Mentalist",
      "overview": "Patrick Jane, a former celebrity psychic medium, uses his razor sharp skills of observation and expertise at \"reading\" people to solve serious crimes with the California Bureau of Investigation.",
      "popularity": 3515.406,
      "poster_path": "/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
      "first_air_date": "2008-09-23",
      "name": "The Mentalist",
      "vote_average": 8.389,
      "vote_count": 3470
    },
    {
      "adult": false,
      "backdrop_path": "/qmcoEOrTm6BcgR4iO7KBQKE9AKT.jpg",
      "genre_ids": [
        80,
        18,
        10759
      ],
      "id": 4614,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "NCIS",
      "overview": "From murder and espionage to terrorism and stolen submarines, a team of special agents investigates any crime that has a shred of evidence connected to Navy and Marine Corps personnel, regardless of rank or position.",
      "popularity": 3660.674,
      "poster_path": "/2exOHePjOTquUsbThPGhuEjYTyA.jpg",
      "first_air_date": "2003-09-23",
      "name": "NCIS",
      "vote_average": 7.622,
      "vote_count": 2086
    },
    {
      "adult": false,
      "backdrop_path": "/mc3rG5M9dFVjMfaCFNfbD5gu2pK.jpg",
      "genre_ids": [
        16,
        35
      ],
      "id": 1433,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "American Dad!",
      "overview": "The series focuses on an eccentric motley crew that is the Smith family and their three housemates: Father, husband, and breadwinner Stan Smith; his better half housewife, Francine Smith; their college-aged daughter, Hayley Smith; and their high-school-aged son, Steve Smith. Outside of the Smith family, there are three additional main characters, including Hayley's boyfriend turned husband, Jeff Fischer; the family's man-in-a-goldfish-body pet, Klaus; and most notably the family's zany alien, Roger, who is \"full of masquerades, brazenness, and shocking antics.\"",
      "popularity": 4987.392,
      "poster_path": "/xnFFz3etm1vftF0ns8RMHA8XdqT.jpg",
      "first_air_date": "2005-02-06",
      "name": "American Dad!",
      "vote_average": 6.961,
      "vote_count": 1917
    },
    {
      "adult": false,
      "backdrop_path": "/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg",
      "genre_ids": [
        18,
        9648,
        10765
      ],
      "id": 1622,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Supernatural",
      "overview": "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
      "popularity": 4042.729,
      "poster_path": "/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
      "first_air_date": "2005-09-13",
      "name": "Supernatural",
      "vote_average": 8.302,
      "vote_count": 7023
    },
    {
      "adult": false,
      "backdrop_path": "/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg",
      "genre_ids": [
        10763
      ],
      "id": 94722,
      "origin_country": [
        "DE"
      ],
      "original_language": "de",
      "original_name": "Tagesschau",
      "overview": "German daily news program, the oldest still existing program on German television.",
      "popularity": 3379.149,
      "poster_path": "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg",
      "first_air_date": "1952-12-26",
      "name": "Tagesschau",
      "vote_average": 6.932,
      "vote_count": 190
    },
    {
      "adult": false,
      "backdrop_path": "/vjfgA2G6o5pcmFegzX6HVUSUIUT.jpg",
      "genre_ids": [
        10751,
        10762
      ],
      "id": 68913,
      "origin_country": [
        "NO"
      ],
      "original_language": "no",
      "original_name": "Snøfall",
      "overview": "Selma, a 9 year old girl who lost her parents in an accident, is now living with Ruth, a quite strict neighbour who was just supposed to temporarily look after Selma and her dog Casper.",
      "popularity": 3343.134,
      "poster_path": "/k9n1CAFyhf6IgSCNqTFOC1OEctE.jpg",
      "first_air_date": "2016-12-01",
      "name": "Snowfall",
      "vote_average": 5.893,
      "vote_count": 14
    },
    {
      "adult": false,
      "backdrop_path": "/oUptXLKYtcPqJSuvWFz84qlJwYf.jpg",
      "genre_ids": [
        35,
        80,
        18,
        9648
      ],
      "id": 1695,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Monk",
      "overview": "Adrian Monk was once a rising star with the San Francisco Police Department, legendary for using unconventional means to solve the department's most baffling cases. But after the tragic (and still unsolved) murder of his wife Trudy, he developed an extreme case of obsessive-compulsive disorder. Now working as a private consultant, Monk continues to investigate cases in the most unconventional ways.",
      "popularity": 3300.012,
      "poster_path": "/3axGMbUecXXOPSeG47v2i9wK5y5.jpg",
      "first_air_date": "2002-07-12",
      "name": "Monk",
      "vote_average": 7.9,
      "vote_count": 916
    },
    {
      "adult": false,
      "backdrop_path": "/e9n87p3Ax67spq3eUgLB6rjIEow.jpg",
      "genre_ids": [
        80,
        18
      ],
      "id": 1911,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Bones",
      "overview": "Dr. Temperance Brennan and her colleagues at the Jeffersonian's Medico-Legal Lab assist Special Agent Seeley Booth with murder investigations when the remains are so badly decomposed, burned or destroyed that the standard identification methods are useless.",
      "popularity": 3883.564,
      "poster_path": "/eyTu5c8LniVciRZIOSHTvvkkgJa.jpg",
      "first_air_date": "2005-09-13",
      "name": "Bones",
      "vote_average": 8.262,
      "vote_count": 2938
    },
    {
      "adult": false,
      "backdrop_path": "/2sjy8Tu8PJGFQI4Foz4682qk8Mw.jpg",
      "genre_ids": [
        18,
        9648,
        80
      ],
      "id": 1620,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "CSI: Miami",
      "overview": "CSI: Miami follows Crime Scene Investigators working for the Miami-Dade Police Department as they use physical evidence, similar to their Las Vegas counterparts, to solve grisly murders. The series mixes deduction, gritty subject matter, and character-driven drama in the same vein as the original series in the CSI franchise, except that the Miami CSIs are cops first, scientists second.",
      "popularity": 2967.824,
      "poster_path": "/pNW64pjaHvf6purNaFhq4SHYRfl.jpg",
      "first_air_date": "2002-09-23",
      "name": "CSI: Miami",
      "vote_average": 7.749,
      "vote_count": 1489
    },
    {
      "adult": false,
      "backdrop_path": "/7sJrNKwzyJWnFPFpDL9wnZ859LZ.jpg",
      "genre_ids": [
        18,
        9648,
        80
      ],
      "id": 1415,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Elementary",
      "overview": "A modern-day drama about a crime-solving duo that cracks the NYPD's most impossible cases. Following his fall from grace in London and a stint in rehab, eccentric Sherlock escapes to Manhattan where his wealthy father forces him to live with his worst nightmare - a sober companion, Dr. Watson.",
      "popularity": 2937.444,
      "poster_path": "/q9dObe29W4bDpgzUfOOH3ZnzDbR.jpg",
      "first_air_date": "2012-09-27",
      "name": "Elementary",
      "vote_average": 7.575,
      "vote_count": 1489
    },
    {
      "adult": false,
      "backdrop_path": "/ds1n5P0Y92cTh6UpbcA89hxM96a.jpg",
      "genre_ids": [
        18
      ],
      "id": 1416,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Grey's Anatomy",
      "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
      "popularity": 3104.71,
      "poster_path": "/daSFbrt8QCXV2hSwB0hqYjbj681.jpg",
      "first_air_date": "2005-03-27",
      "name": "Grey's Anatomy",
      "vote_average": 8.251,
      "vote_count": 9674
    },
    {
      "adult": false,
      "backdrop_path": "/1KclsHGiGNTkn11puPbMMnnpRRT.jpg",
      "genre_ids": [
        80,
        9648,
        10759,
        18
      ],
      "id": 2593,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Without a Trace",
      "overview": "The series follows the ventures of a Missing Persons Unit of the FBI in New York City.",
      "popularity": 2741.546,
      "poster_path": "/iNhE283iY7xtS8zCjhSxpTfOzn0.jpg",
      "first_air_date": "2002-09-26",
      "name": "Without a Trace",
      "vote_average": 7.373,
      "vote_count": 232
    },
    {
      "adult": false,
      "backdrop_path": "/r0Q6eeN9L1ORL9QsV0Sg8ZV3vnv.jpg",
      "genre_ids": [
        18,
        9648
      ],
      "id": 1408,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "House",
      "overview": "Dr. Gregory House, a drug-addicted, unconventional, misanthropic medical genius, leads a team of diagnosticians at the fictional Princeton–Plainsboro Teaching Hospital in New Jersey.",
      "popularity": 3298.525,
      "poster_path": "/3Cz7ySOQJmqiuTdrc6CY0r65yDI.jpg",
      "first_air_date": "2004-11-16",
      "name": "House",
      "vote_average": 8.596,
      "vote_count": 5941
    }
  ],
  "total_pages": 8050,
  "total_results": 160999
}

export const enum PLACEHOLDER_IMAGE {
  TMDB_IMAGE = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg",

  MY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEtSURBVHgBASIB3f4AAAAAAB4XQG9FIEDfdyU4/yEeWs9gKmUwAAAAAAEjRXJgQe3bnwEI7wB5ZWwAhabDAPfk8fAtPzsxAyklL69SKgYQ4yEoABz71gD4BSYAWDw0CJ+9twEC6AgVILgfTAAP6t4AtLnQACML3gC77tkAzfoFLwLt7/wA8tfsANsEJgDI9BUA+w/5AKnmBgD77+QAAg/dxgDq5vYAGx4oAOf6+gDiHUoA5f4WAAL9/wACDggRADIlBwDW+AMATWp0ANjrAQA4AvEACAABAAILDQfgHiQgAFswKQD09/UA4e4IAArxAAAQBxzRAUIUG3DzDR+PBh4vAOv49gACFSUACt/X8AYNDTEAAAAAAAgFDWAPDiDfDhAf/w0UKb8gGzUwAAAAAFcVYK9CC2DKAAAAAElFTkSuQmCC',

}

export const ImagePath = "https://image.tmdb.org/t/p/original"

export type ResultType = {
  adult: boolean 
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country?: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  title: string
  name: string
  vote_average: number
  vote_count: number
}

export type TrailerType = {
  "iso_639_1": string,
  "iso_3166_1": string,
  "name": string,
  "key": string,
  "site": string,
  "size": number,
  "type": string,
  "official": boolean,
  "published_at": string,
  "id": string
}


export type Genre =
  | "action & adventure"
  | "animation"
  | "comedy"
  | "crime"
  | "documentary"
  | "drama"
  | "family"
  | "kids"
  | "mystery"
  | "news"
  | "reality"
  | "sci-Fi & fantasy"
  | "soap"
  | "talk"
  | "war & politics"
  | "western"
;

type MovieGenre = {
  genres: {
    id: number
    name: string
  }
}

export type posisibleMovieGenreName = [
  "Action",
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'TV Movie',
  'Thriller',
  'War',
  'Western'
]


export type PossibleTVshowGenreName = [
  "Action & Adventure",
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Kids',
  'Mystery',
  'News',
  'Reality',
  'Sci-Fi & Fantasy',
  'Soap',
  'Talk',
  'War & Politics',
  'Western'
]



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


export type AllImagesAndVideosStore = {
  isVisibleAllImages: boolean,
  isVisibleAllVideos: boolean,
  setIsVisibleAllImages: (isVisibleAllImages: boolean) => void,
  setIsVisibleAllVideos: (isVisibleAllVideos: boolean) => void
}