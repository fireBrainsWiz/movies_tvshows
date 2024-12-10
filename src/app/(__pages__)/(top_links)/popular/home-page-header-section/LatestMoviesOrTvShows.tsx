import Result from '@/app/(__pages__)/components/Result'
import MoviesOrTVshowsLinksContext from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import { MediaTypeInfoType } from '@/app/lib/MediaTypeInfoTypes'
import { ResultType } from '@/app/lib/types'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'


export default function LatestMoviesOrTvShows() {

  const {links} = useContext(MoviesOrTVshowsLinksContext)

  const [latestMoviesOrTvShows, setLatestMoviesOrTvShows] = 
  useState<ResultType | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const latest: MediaTypeInfoType['details'] = 
          await axios(`${links.LATEST}`, TMDBOptions).then(res => res.data)
        ;
        

        let result: ResultType

        if ('title' in latest) {
          result = {
            adult: latest.adult,
            backdrop_path: latest?.backdrop_path || latest.poster_path || '/no-image-2.webp',
            genre_ids: latest.genres.map(genre => genre.id),
            id: latest.id,
            original_language: latest.original_language,
            overview: latest.overview,
            popularity: latest.popularity,
            poster_path: latest.poster_path || '/no-image-2.webp',
            title: latest.title,
            vote_average: latest.vote_average,
            vote_count: latest.vote_count,
            first_air_date: latest.release_date,
            name: latest.title,
            original_name: latest.original_title
          }

        } else {
          result = {
            adult: latest.adult,
            backdrop_path: latest?.backdrop_path || latest.poster_path || '/no-image-2.webp',
            genre_ids: latest.genres.map(genre => genre.id),
            id: latest.id,
            original_language: latest.original_language,
            overview: latest.overview,
            popularity: latest.popularity,
            poster_path: latest.poster_path,
            first_air_date: latest.first_air_date || '',
            vote_average: latest.vote_average,
            vote_count: latest.vote_count,
            name: latest.name,
            original_name: latest.original_name,
            title: latest.name
          }
        }

        setLatestMoviesOrTvShows(result)

      } catch (error) {
        console.log(error)
      }
    })()
  }, [])


  
  return (
    <div>
      {
        latestMoviesOrTvShows && (
          <Result item={latestMoviesOrTvShows} />
        )
      }
    </div>
  )
}


const latestTVShow: MediaTypeInfoType["details"] = {
  "adult": false,
  "backdrop_path": null,
  "created_by": [],
  "episode_run_time": [],
  "first_air_date": "2025-01-02",
  "genres": [],
  "homepage": "",
  "id": 278605,
  "in_production": true,
  "languages": [],
  "last_air_date": null,
  "last_episode_to_air": null,
  "name": "The South Bureau",
  "next_episode_to_air": {
    "id": 5809315,
    "name": "Episode 1",
    "overview": "Episode 1 Episode 1 Episode 1 Episode 1",
    "vote_average": 0,
    "vote_count": 0,
    "air_date": "2025-01-02",
    "episode_number": 1,
    "episode_type": "standard",
    "production_code": "",
    "runtime": null,
    "season_number": 1,
    "show_id": 278605,
    "still_path": null
  },
  "networks": [],
  "number_of_episodes": 1,
  "number_of_seasons": 1,
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_name": "The South Bureau",
  "overview": "Story about the shocking conspiracy uncovered by the Zhang Family's secret intelligence organization \"The South Bureau\" during the investigation of mysterious events taking place in various parts of China during Republican era.",
  "popularity": 0,
  "poster_path": "/l1d6q5ZYMGjFrRX8jUwGPcuHK4p.jpg",
  "production_companies": [],
  "production_countries": [],
  "seasons": [
    {
      "air_date": "2025-01-02",
      "episode_count": 1,
      "id": 431571,
      "name": "Season 1",
      "overview": "",
      "poster_path": null,
      "season_number": 1,
      "vote_average": 0
    }
  ],
  "spoken_languages": [],
  "status": "Returning Series",
  "tagline": "",
  "type": "Scripted",
  "vote_average": 0,
  "vote_count": 0
}

let ab: MediaTypeInfoType["details"] = {
  "adult": false,
  "backdrop_path": "/2eIlCirgcvEwmCSYh2wDfz5Sxvz.jpg",
  "created_by": [
    {
      "id": 52001,
      "credit_id": "5259743a760ee34661a5a053",
      "name": "Jon Bokenkamp",
      "original_name": "Jon Bokenkamp",
      "gender": 2,
      "profile_path": "/dhH9oElislVwxUUyt9jTT7jA3OK.jpg"
    }
  ],
  "episode_run_time": [],
  "first_air_date": "2013-09-23",
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 9648,
      "name": "Mystery"
    }
  ],
  "homepage": "https://www.nbc.com/the-blacklist",
  "id": 46952,
  "in_production": false,
  "languages": [
    "en"
  ],
  "last_air_date": "2023-07-13",
  "last_episode_to_air": {
    "id": 4406558,
    "name": "Raymond Reddington: Good Night (2)",
    "overview": "The future of the FBI's Reddington Task Force is decided.",
    "vote_average": 7,
    "vote_count": 8,
    "air_date": "2023-07-13",
    "episode_number": 22,
    "episode_type": "finale",
    "production_code": "",
    "runtime": 43,
    "season_number": 10,
    "show_id": 46952,
    "still_path": "/oYrNXZUDn7x5xgew2eIO7zElVhD.jpg"
  },
  "name": "The Blacklist",
  "next_episode_to_air": null,
  "networks": [
    {
      "id": 6,
      "logo_path": "/cm111bsDVlYaC1foL0itvEI4yLG.png",
      "name": "NBC",
      "origin_country": "US"
    }
  ],
  "number_of_episodes": 218,
  "number_of_seasons": 10,
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_name": "The Blacklist",
  "overview": "Raymond \"Red\" Reddington, one of the FBI's most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests: bringing down dangerous criminals and terrorists. In the last two decades, he's made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this \"The Blacklist\". Reddington will co-operate, but insists that he will speak only to Elizabeth Keen, a rookie FBI profiler.",
  "popularity": 518.242,
  "poster_path": "/r935SMphvXppx5bJjbIBNx02fwc.jpg",
  "production_companies": [
    {
      "id": 11073,
      "logo_path": "/aCbASRcI1MI7DXjPbSW9Fcv9uGR.png",
      "name": "Sony Pictures Television",
      "origin_country": "US"
    },
    {
      "id": 1302,
      "logo_path": "/zC3b70ixHh89qJIikLQPEvLqbPM.png",
      "name": "Davis Entertainment",
      "origin_country": "US"
    },
    {
      "id": 26727,
      "logo_path": "/jeTxdjXhzgKZyLr3l9MllkTn3fy.png",
      "name": "Universal Television",
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
      "air_date": "2013-09-10",
      "episode_count": 11,
      "id": 55083,
      "name": "Specials",
      "overview": "",
      "poster_path": "/5ZeJIlhrYO3zgW2JN62mi6mXkSM.jpg",
      "season_number": 0,
      "vote_average": 0
    },
    {
      "air_date": "2013-09-23",
      "episode_count": 22,
      "id": 55082,
      "name": "Season 1",
      "overview": "For decades, ex-government agent Raymond \"Red\" Reddington has been one of the FBI’s Most Wanted fugitives. Brokering shadowy deals for criminals across the globe, Red was known by many as the \"Concierge of Crime.\" Now, he’s mysteriously surrendered to the FBI with an explosive offer: he will help catch the world’s most elusive criminals, under the condition that he speaks only to Elizabeth \"Liz\" Keen, an FBI profiler fresh out of Quantico. For Liz, it’s going to be one hell of a first day on the job.",
      "poster_path": "/9oAb7SlHybGK6P7dsOfEFjPsPBM.jpg",
      "season_number": 1,
      "vote_average": 7.7
    },
    {
      "air_date": "2014-09-22",
      "episode_count": 22,
      "id": 61357,
      "name": "Season 2",
      "overview": "For decades, ex-government agent Raymond \"Red\" Reddington has been one of the FBI's Most Wanted fugitives. He mysteriously surrendered to the FBI but now the FBI works for him as he identifies a \"blacklist\" of politicians, mobsters, spies and international terrorists. He will help catch them all... with the caveat that Elizabeth \"Liz\" Keen continues to work as his partner. Red will teach Liz to think like a criminal and \"see the bigger picture\"... whether she wants to or not.",
      "poster_path": "/tW94pYXvS4hzJkMrkM2vK3k8qgF.jpg",
      "season_number": 2,
      "vote_average": 7.6
    },
    {
      "air_date": "2015-10-01",
      "episode_count": 23,
      "id": 70935,
      "name": "Season 3",
      "overview": "Now a fugitive on the run, Liz must figure out how to protect herself from the fallout of her actions in the explosive season two finale.",
      "poster_path": "/5vtwCpHCUtgl1tGmAK228FNldiN.jpg",
      "season_number": 3,
      "vote_average": 7.5
    },
    {
      "air_date": "2016-09-22",
      "episode_count": 22,
      "id": 80082,
      "name": "Season 4",
      "overview": "A mysterious man claiming to be Liz’s real father targets her, but first she must resolve the mystery of her lost childhood and reconcile her true identity with the elusive memories corrupted by Reddington. Without the truth, every day holds more danger for herself, her baby and her husband Tom. Meanwhile, the Task Force reels from Liz’s resurrection and friendships are fractured. Betrayed by those closest to him, Reddington’s specific moral code demands justice, all the while battling an army of new and unexpected blacklisters.",
      "poster_path": "/d5AJOxPzGkAHiaCHcESVCim1vHu.jpg",
      "season_number": 4,
      "vote_average": 7.2
    },
    {
      "air_date": "2017-09-27",
      "episode_count": 22,
      "id": 91328,
      "name": "Season 5",
      "overview": "Feeling surprisingly unencumbered, Raymond Reddington is back, and in the process of rebuilding his criminal empire. His lust for life is ever-present as he lays the foundation for this new enterprise - one that he'll design with Elizabeth Keen by his side. Living with the reality that Red is her father, Liz finds herself torn between her role as an FBI agent and the temptation to act on her more criminal instincts. In a world where the search for Blacklisters has become a family trade, Red will undoubtedly reclaim his moniker as the “Concierge of Crime.”",
      "poster_path": "/rl3yjCHmTIFKOkHtBjtxw4H18K0.jpg",
      "season_number": 5,
      "vote_average": 7.3
    },
    {
      "air_date": "2019-01-03",
      "episode_count": 22,
      "id": 112279,
      "name": "Season 6",
      "overview": "Following the startling revelation that Raymond \"Red\" Reddington isn't who he says he is, Elizabeth Keen is torn between the relationship she's developed with the man assumed to be her father and her desire to get to the bottom of years of secrets and lies. Meanwhile, #2fb89f leads Liz and the FBI to some of the most strange and dangerous criminals yet, growing his empire and eliminating rivals in the process. All throughout, Liz and Red engage in an uneasy cat-and-mouse game in which lines will be crossed and the truth will be revealed.",
      "poster_path": "/kjisSucFkzVVgyQlgUY0RwHmO1o.jpg",
      "season_number": 6,
      "vote_average": 7
    },
    {
      "air_date": "2019-10-04",
      "episode_count": 19,
      "id": 132066,
      "name": "Season 7",
      "overview": "After being abducted by Katarina Rostova, Raymond \"Red\" Reddington finds himself alone in hostile territory, unsure of who, if anyone, he can trust. Surrounded by old enemies and new allies, Red must stay one step ahead of the Blacklist's most dangerous criminal, who will stop at nothing to unearth the very truth Red wants no one to know about. To find it, Katarina will insinuate herself into the life of Elizabeth Keen, who has finally reunited with her daughter Agnes. Katarina’s presence will bring danger to Liz’s doorstep and forever alter her relationship with Red.",
      "poster_path": "/ybIqiVAYlKtLoAd52hbiz42ZC4R.jpg",
      "season_number": 7,
      "vote_average": 6.4
    },
    {
      "air_date": "2020-11-13",
      "episode_count": 22,
      "id": 165869,
      "name": "Season 8",
      "overview": "With his back against the wall, Raymond Reddington faces his most formidable enemy yet: Elizabeth Keen. Aligned with her mother, infamous Russian spy Katarina Rostova, Liz must decide how far she is willing to go to find out why Reddington has entered her life and what his endgame really is. The fallout between Reddington and Keen will have devastating consequences for all that lie in their wake, including the Task Force they helped to create.",
      "poster_path": "/yDELZilMblqHRnBb4E2jxza6072.jpg",
      "season_number": 8,
      "vote_average": 6.7
    },
    {
      "air_date": "2021-10-21",
      "episode_count": 22,
      "id": 200816,
      "name": "Season 9",
      "overview": "In the two years following the death of Elizabeth Keen, Raymond Reddington and the members of the FBI Task Force have disbanded – their lives now changed in unexpected ways and with Reddington’s whereabouts unknown. Finding themselves each at a crossroads, a common purpose compels them to renew their original mission: to take down dangerous, vicious and eccentric Blacklisters. In the process, they begin to uncover lethal adversaries, unimaginable conspiracies and surprising betrayals that will threaten alliances and spur vengeance for the past, led by the most devious criminal of them all – Raymond Reddington.",
      "poster_path": "/r935SMphvXppx5bJjbIBNx02fwc.jpg",
      "season_number": 9,
      "vote_average": 6.4
    },
    {
      "air_date": "2023-02-26",
      "episode_count": 22,
      "id": 315608,
      "name": "Season 10",
      "overview": "With Reddington's covert role as an FBI informant facing exposure, former Blacklisters will unite against him in their lethal desire for revenge – testing Red and the FBI Task Force as never before.",
      "poster_path": "/hAY623VkW1Gy0xMtZpkZB2tJZPM.jpg",
      "season_number": 10,
      "vote_average": 8.1
    }
  ],
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Ended",
  "tagline": "Never trust a criminal... Until you have to.",
  "type": "Scripted",
  "vote_average": 7.634,
  "vote_count": 3152
}

const latestMovie: MediaTypeInfoType["details"] = {
  "adult": false,
  "backdrop_path": null,
  "belongs_to_collection": null,
  "budget": 0,
  "genres": [],
  "homepage": "",
  "id": 1396855,
  "imdb_id": null,
  "origin_country": [
    "CN"
  ],
  "original_language": "zh",
  "original_title": "虚空中的光",
  "overview": "The experimental documentary poetically delves into a female artist's quest for self-identity.",
  "popularity": 0,
  "poster_path": null,
  "production_companies": [],
  "production_countries": [],
  "release_date": "",
  "revenue": 0,
  "runtime": 18,
  "spoken_languages": [],
  "status": "Released",
  "tagline": "",
  "title": "The Light Shining in the Void",
  "video": false,
  "vote_average": 0,
  "vote_count": 0
}