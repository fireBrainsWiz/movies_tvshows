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

enum Discover {
  MOVIE = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',

  TV = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'
}


enum GENRES { 
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

enum LINKS {
  MOVIELIST = 'https://api.themoviedb.org/3/genre/movie/list?language=en',

  TVLIST = 'https://api.themoviedb.org/3/genre/tv/list?language=en',

  TVDETAILS = 'https://api.themoviedb.org/3/tv/82856?language=en-US'
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












export {Discover, GENRES, LINKS}