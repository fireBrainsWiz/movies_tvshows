'use client'

import { useContext, useEffect, useRef, useState } from "react"
import CardBeingViewedContext from "../../(__pages__)/context/CardBeingViewedContext"
import { TfiClose } from "react-icons/tfi";
import { FaStar } from "react-icons/fa";
import { ImagePath, PLACEHOLDER_IMAGE, ResultType, TrailerType } from "../../lib/types";
import Image from "next/image";
import axios from "axios";
import MoviesOrTVshowsLinksContext from "../../(__pages__)/context/MoviesOrTVshowsLinksContext";
import MoviesOrTVshowsInfoContext from "../../(__pages__)/context/MoviesOrTVshowsInfoContext";
import {getInfoDataFromAxios} from "../../(__pages__)/hooks/getDataFromAxios";
import { TMDBOptions } from "../../client/helpers/TMDB_API";
import {MediaTypeInfoType} from '@/app/lib/MediaTypeInfoTypes'
import { 
  starDirectorWriterCreator, getTrailer, getFirstXItems, calculateRuntime
} from "./lib/utils";

import BackdropImage  from "./components/BackdropImage";
import Recommendations from "./components/Recommendations";
import Similar from "./components/Similar";
import Cast from "./components/Cast";
import Starring from "./components/Starring";
import PosterAndOthers from "./components/PosterAndOthers";
import ThemeContext from "@/app/(__pages__)/context/ThemeContext";
// import ImagesAndVideosContext from "@/app/(__pages__)/context/ImagesAndVideosContext";
import StarDirectorWriterCreator from "./components/StarDirectorWriterCreator";
import SpokenLanguages from "./components/SpokenLanguages";
import Keywords from "./components/Keywords";
import Trailer from "./components/Trailer";
import TitleImage from "./components/TitleImage";



export default function CardPage() {


  const sectionRef = useRef<HTMLElement>(null)
  
  const {isVisibleCardPage, setIsVisibleCardPage, card, setCard, scrollTop} = useContext(CardBeingViewedContext)

  const {links} = useContext(MoviesOrTVshowsLinksContext)

  const {
    details, setDetails, credits, 
    setCredits, contentRatings, setContentRatings,
    keywords, setKeywords, images, setImages,
  } = useContext(MoviesOrTVshowsInfoContext)!


  const {
    backdropImageColor, setBackdropImageColor,
    isLoadingBackdropImage, setIsLoadingBackdropImage
  } = useContext(ThemeContext)

  // const {
  //   setIsVisibleAllImages,
  //   setIsVisibleAllVideos
  // } = useContext(ImagesAndVideosContext)

  // const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [trailers, setTrailers] = useState<TrailerType[]>([])
  const [rating, setRating] = useState('')
  
  // console.log(images.logos)
  // let m = 0
  // console.log({m: m++})


  // console.log(details)
  // console.log(credits)

  const myCard = {
    adult: false,
    title: "NCIS",
    backdrop_path: "/dAepkmD4vdfhS82r2OIqF1nwGR5.jpg",
    first_air_date: "2009-09-22",
    genre_ids:[ 10759, 18, 80],
    id:  46952 || 17610,
    name: "NCIS: Los Angeles",
    origin_country: [ "US" ],
    original_language: "en",
    original_name: "NCIS: Los Angeles",
    overview: "The exploits of the Los Angeles–based Office of Special Projects (OSP), an elite division of the Naval Criminal Investigative Service that specializes in undercover assignments.",
    popularity: 1565.095,
    poster_path: "/TIIgcznwNfNr3KOZvxn26eKV99.jpg",
    vote_average: 7.6,
    vote_count: 1075,
  }

  function handleCloseCardPageClick() {
    document.body.style.overflow = 'auto'
    setIsLoadingBackdropImage(true)
    setIsVisibleCardPage(false)

    window.scroll({
      top: scrollTop,
      left: 0,
      behavior: "smooth",
    });
  }

  // console.log(card.id)


  useEffect(() => {
    if (card.backdrop_path) return
    // setCard(myCard)
    // setIsVisibleCardPage(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    section.scrollTo(0, 0)
  }, [card.id, sectionRef])

  useEffect(() => {
    setIsLoadingBackdropImage(true)
  }, [card.id, setIsLoadingBackdropImage])


  useEffect(() => {
    async function getAndSetData() {
      if (!isVisibleCardPage) return

      try {
        const detailsRes: MediaTypeInfoType['details'] = 
        await getInfoDataFromAxios({URL: `
        ${links.INFOS.details.beforeStr}${card.id}${links.INFOS.details.afterStr}
        `})
        setDetails(detailsRes)
        // if ("episode_run_time" in datailsRes) {
        //   console.log(datailsRes)
        // }
        
        // if (typeof details === MediaTypeInfoType['details']) return

      } catch(err: any) {
        console.log(err)
      }

    // console.log(datailsRes)
      // setCard(res)
    }
    getAndSetData()
  }, [
    card.id, links.INFOS.details.beforeStr, links.INFOS.details.afterStr, setDetails, isVisibleCardPage
  ])
  
  useEffect(() => {
    async function getAndSetData() {
      if (!isVisibleCardPage || !card.id) return

      try {
        const {data}: {data: MediaTypeInfoType['credits']} = 
        await axios(`
        ${links.INFOS.credits.beforeStr}${card.id}${links.INFOS.credits.afterStr}
        `, TMDBOptions)
        setCredits(data)

      } catch(err: any) {
        console.log(err)
      }
    }
    getAndSetData()

  }, [
    card.id, links.INFOS.credits.beforeStr, links.INFOS.credits.afterStr, setCredits, isVisibleCardPage
  ])
  
  useEffect(() => {
    async function getAndSetData() {
      if (!isVisibleCardPage) return

      try {
        const keywordsRes: MediaTypeInfoType['keywords'] = 
        await getInfoDataFromAxios({URL: `
        ${links.INFOS.keywords.beforeStr}${card.id}${links.INFOS.keywords.afterStr}
        `})
        setKeywords(keywordsRes)

      } catch(err: any) {
        console.log(err)
      }
    }
    getAndSetData()
  }, [
    card.id, links.INFOS.keywords.beforeStr, links.INFOS.keywords.afterStr, setKeywords, isVisibleCardPage
  ])


  useEffect(() => {
    async function getAndSetData() {
      // if (!isVisibleCardPage) return

      try {
        const contentRatingsRes: 
        MediaTypeInfoType['contentRatings'] = 
        await getInfoDataFromAxios({URL: `
        ${links.INFOS.contentRatings.beforeStr}${card.id}${links.INFOS.contentRatings.afterStr}
        `})
        setContentRatings(contentRatingsRes)

      } catch(err: any) {
        console.log(err)
      }

    // console.log(datailsRes)
      // setCard(res)
    }
    getAndSetData()
  }, [
    card.id, links.INFOS.contentRatings.beforeStr, links.INFOS.contentRatings.afterStr, setContentRatings
  ])

  // rating
  useEffect(() => {
    if (!isVisibleCardPage || !contentRatings?.results) return
    
    let rating: 
    MediaTypeInfoType['contentRatings']['results'][0] | undefined 

    rating = contentRatings.results
    .find(item => item.iso_3166_1 === 'US') 

    if (!rating) return

    if ('rating' in rating) {
      setRating(rating.rating)
    } else {
      setRating(rating.release_dates[0].certification)
    }

  }, [contentRatings, isVisibleCardPage])

  
  useEffect(() => {
    if (isVisibleCardPage) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } 
  }, [isVisibleCardPage])

  // handle scroll
  useEffect(() => {
    const fn = () => {
      if (!isVisibleCardPage || document.documentElement.scrollTop) return

      document.body.style.overflow = 'hidden'
    }
    fn()

    addEventListener('scroll', fn)
    return () => {
      removeEventListener('scroll', fn)
    }
  }, [isVisibleCardPage])

  useEffect(() => {
    if (!isVisibleCardPage) return

    (async () => {
      const res = await getTrailer(links.TRAILERS, card.id)
      setTrailers(res)
    })()
  }, [links, card.id, isVisibleCardPage])


  //getAllImages
  useEffect(() => {
    if(!isVisibleCardPage || !card?.id) return

    async function getImages() {
      try {
        const {data}: {data: typeof images} = await axios(
          `${
            links.INFOS.images.beforeStr}${card.id}${links.INFOS.images.afterStr
            }`,
          TMDBOptions
        ) 
        // console.log(data)
        setImages(data)

      } catch (error) {
        console.log(error)
      }
    }  
    getImages()
  }, [
    isVisibleCardPage, setImages, card.id, 
    links.INFOS.images.beforeStr, links.INFOS.images.afterStr
  ])

  // console.log(credits.cast)

  // const bloods = {
  //   "page": 1,
  //   "results": [
  //     {
  //       "adult": false,
  //       "backdrop_path": "/lyWQh0lF1nUFLWrzZmeTh3Sdjw9.jpg",
  //       "id": 84768,
  //       "name": "Blood",
  //       "original_language": "en",
  //       "original_name": "Blood",
  //       "overview": "Cat Hogan returns to West Meath upon her mother's sudden death - she has an accident at home and died (or was it an accident?). Blood is about old secrets, older betrayals, mind games and the lies family tell each other.",
  //       "poster_path": "/aY23kASw02LgWBfoqBjLhCTZDTH.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         18,
  //         9648
  //       ],
  //       "popularity": 13.873,
  //       "first_air_date": "2018-10-08",
  //       "vote_average": 6.8,
  //       "vote_count": 44,
  //       "origin_country": [
  //         "IE"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/tNWZ1fyKYl2zWRWsyXTTH7OwuQr.jpg",
  //       "id": 746524,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "Jess, a newly separated mother and nurse, moves into her old family farmhouse with Tyler, her teenage daughter, and Owen, her eight-year-old son. One night, the family dog senses something in the woods and runs off to find it. He returns a couple of days later and attacks Owen, savagely biting him before Jess is able to intervene. Owen is rushed to the hospital. His condition worsens, and no one can figure out why... until Jess discovers a disturbing cure...",
  //       "poster_path": "/gCUFtTvjK4gbmjVxhx8bhyOhAeW.jpg",
  //       "media_type": "movie",
  //       "genre_ids": [
  //         27,
  //         9648,
  //         53
  //       ],
  //       "popularity": 26.343,
  //       "release_date": "2023-01-12",
  //       "video": false,
  //       "vote_average": 6.7,
  //       "vote_count": 142
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/axhScggZyi0fOxvVd8pd0zwygub.jpg",
  //       "id": 136278,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "Thriller charting the moral collapse of a police family. Two cop brothers, smothered by the shadow of their former police chief father, must investigate a crime they themselves have committed. Feature film adaptation of the 2004 series Conviction.",
  //       "poster_path": "/ZzTFu00nw3t7XD0ZAajuERkDX6.jpg",
  //       "media_type": "movie",
  //       "genre_ids": [
  //         18,
  //         53,
  //         80
  //       ],
  //       "popularity": 15.826,
  //       "release_date": "2012-10-09",
  //       "video": false,
  //       "vote_average": 5.83,
  //       "vote_count": 147
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/cw8B3TTL8LSmAu31Db9MzFNJ273.jpg",
  //       "id": 61440,
  //       "name": "Strike the Blood",
  //       "original_language": "ja",
  //       "original_name": "ストライク・ザ・ブラッド",
  //       "overview": "Kojou Akatsuki's days as an ordinary high school student in the Demon District of Itogami Island come to an abrupt end after a fateful encounter leaves him with the remarkable abilities of a vampire.  It isn't long before he is thrust into the center of attention when it is discovered that he is the fourth primogenitor, an immensely powerful vampire whom most consider to be merely a legend. Fearing Kojou's destructive potential, the Lion King Organization sends in an apprentice sword-shaman, Yukina Himeragi, to monitor, and should he become a threat, kill the boy deemed the world's most powerful vampire. Forced together by circumstance, the two form an unlikely alliance as Kojou comes to terms with his abilities and they both struggle to protect the city from various emerging chaotic forces.",
  //       "poster_path": "/rbGaCkEVS7PE5fKKMAmvO4XZXyA.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         10759,
  //         16,
  //         10765
  //       ],
  //       "popularity": 137.731,
  //       "first_air_date": "2013-10-04",
  //       "vote_average": 7,
  //       "vote_count": 53,
  //       "origin_country": [
  //         "JP"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/goDtZCB5pFIuuSfYDvApe6iXTID.jpg",
  //       "id": 32692,
  //       "name": "Blue Bloods",
  //       "original_language": "en",
  //       "original_name": "Blue Bloods",
  //       "overview": "A drama about a multi-generational family of cops dedicated to New York City law enforcement. Frank Reagan is the New York Police Commissioner and heads both the police force and the Reagan brood. He runs his department as diplomatically as he runs his family, even when dealing with the politics that plagued his unapologetically bold father, Henry, during his stint as Chief.",
  //       "poster_path": "/q1WlrxnCvNhBjJ4N7V0JQXjnIBN.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         18,
  //         80
  //       ],
  //       "popularity": 966.619,
  //       "first_air_date": "2010-09-24",
  //       "vote_average": 7.752,
  //       "vote_count": 794,
  //       "origin_country": [
  //         "US"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/hsal8CpIdnimtIDy9H2MVoxWMUk.jpg",
  //       "id": 73537,
  //       "name": "Christmas on Blood Mountain",
  //       "original_language": "no",
  //       "original_name": "Jul i Blodfjell",
  //       "overview": "A family gathering doesn't go as planned, as one by one is being killed by a mysterious murderer.",
  //       "poster_path": "/9g43enVgfb6CYZ0oIfKXAsF2bIN.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         80,
  //         35
  //       ],
  //       "popularity": 30.429,
  //       "first_air_date": "2017-12-01",
  //       "vote_average": 5.1,
  //       "vote_count": 5,
  //       "origin_country": [
  //         "NO"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/4Jrhz7c2skb6jKVql10zktXpJ0b.jpg",
  //       "id": 913812,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "Widow Chloe travels to Japan for work where she is welcomed by an old friend, Toshi. Sliding between the melancholy of loss and the awe of perspectives changed, Chloe wanders an unfamiliar landscape where love has carved all the guiding grooves.",
  //       "poster_path": "/tpXLySHYBJyLqmT818FskYRlliG.jpg",
  //       "media_type": "movie",
  //       "genre_ids": [
  //         18
  //       ],
  //       "popularity": 2.751,
  //       "release_date": "2022-01-24",
  //       "video": false,
  //       "vote_average": 1,
  //       "vote_count": 1
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": null,
  //       "id": 86195,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "After not having seen each other in five years, Chris Terry goes to visit his younger sister Noelle Terry in Montréal. Their lives, both together and apart, have been turbulent ones with something toxic having affected the way they interact with each other.",
  //       "poster_path": "/nmwMEiXg8dgjQ4ud49D3PKsN9xs.jpg",
  //       "media_type": "movie",
  //       "genre_ids": [
  //         18
  //       ],
  //       "popularity": 4.941,
  //       "release_date": "2004-10-22",
  //       "video": false,
  //       "vote_average": 5.6,
  //       "vote_count": 8
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/ArizfV38KXLHRIuEfMasUia6OFc.jpg",
  //       "id": 191378,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "20 years ago, Carl was responsible for genetically engineering a girl with narcotic blood. Now he's brought her home - and the boundaries between love and addiction are becoming increasingly blurred.",
  //       "poster_path": "/rZDhnwIds93t6l7ix9kbAANcX3N.jpg",
  //       "media_type": "movie",
  //       "genre_ids": [
  //         27,
  //         18
  //       ],
  //       "popularity": 3.196,
  //       "release_date": "2000-06-30",
  //       "video": false,
  //       "vote_average": 4.444,
  //       "vote_count": 9
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": null,
  //       "id": 438385,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "Made with the filmmaker’s blood, a testament to the ideals that we fight and die for.",
  //       "poster_path": null,
  //       "media_type": "movie",
  //       "genre_ids": [
  //         16
  //       ],
  //       "popularity": 0.662,
  //       "release_date": "2017-01-20",
  //       "video": false,
  //       "vote_average": 4,
  //       "vote_count": 1
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/bPn2W3r1o9219gyHFSJKcmcdyaC.jpg",
  //       "id": 112661,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "A mysterious family moves into their new home, but their secrets are far more sinister than anyone could imagine.",
  //       "poster_path": "/nAIbRfmXVy9V2jhlCgfeVyWRh0r.jpg",
  //       "media_type": "movie",
  //       "genre_ids": [
  //         27
  //       ],
  //       "popularity": 2.87,
  //       "release_date": "1973-09-01",
  //       "video": false,
  //       "vote_average": 5.1,
  //       "vote_count": 15
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/ifGVUbvl36CnY9mp4kquK8In1Rh.jpg",
  //       "id": 118956,
  //       "name": "DOTA: Dragon's Blood",
  //       "original_language": "en",
  //       "original_name": "DOTA: Dragon's Blood",
  //       "overview": "After encounters with a dragon and a princess on her own mission, a Dragon Knight becomes embroiled in events larger than he could have ever imagined.",
  //       "poster_path": "/6Qwwam0TQEMQmFMagjtLmcQHJYs.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         10765,
  //         10759,
  //         16
  //       ],
  //       "popularity": 81.58,
  //       "first_air_date": "2021-03-25",
  //       "vote_average": 7.829,
  //       "vote_count": 390,
  //       "origin_country": [
  //         "US"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/aKqNdwQOpHc4WoghCrPaAWeFka1.jpg",
  //       "id": 91657,
  //       "name": "Young Blood",
  //       "original_language": "zh",
  //       "original_name": "大宋少年志",
  //       "overview": "Set in the Song Dynasty of ancient China. Six brave and smart young men and women work together at the hidden front to keep the empire and people safe.",
  //       "poster_path": "/3eGiEXsC05aEJJhdA7cJuwXHJ0K.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         9648
  //       ],
  //       "popularity": 25.679,
  //       "first_air_date": "2019-06-03",
  //       "vote_average": 7.4,
  //       "vote_count": 13,
  //       "origin_country": [
  //         "CN"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": null,
  //       "id": 418643,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "A recently engaged bride-to-be becomes determined to find her blood family before she marries. But when she meets her unusual kin in the deep woods of Florida, she begins reliving horrifying suppressed memories that lead her to believe her newfound relatives may be hiding some dark secrets, and she starts to discover horrifying truths about her birth family.",
  //       "poster_path": null,
  //       "media_type": "movie",
  //       "genre_ids": [
  //         27
  //       ],
  //       "popularity": 1.96,
  //       "release_date": "",
  //       "video": false,
  //       "vote_average": 0,
  //       "vote_count": 0
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/fkgvxWEJHJGHIVhdixBjpclOHMz.jpg",
  //       "id": 64375,
  //       "name": "Mobile Suit Gundam: Iron-Blooded Orphans",
  //       "original_language": "ja",
  //       "original_name": "機動戦士ガンダム 鉄血のオルフェンズ",
  //       "overview": "When Mikazuki Augus, a young member of a private security company known as the CGS, accepts a mission to protect a young woman seeking to liberate the Martian city of Chryse from Earth’s rule, he sets off a chain of events that threatens to send the galaxy back to war.",
  //       "poster_path": "/x5M9yxvBhrUP4rsKSl3d9VzK7O.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         16,
  //         10768,
  //         10759,
  //         10765
  //       ],
  //       "popularity": 58.625,
  //       "first_air_date": "2015-10-04",
  //       "vote_average": 7.012,
  //       "vote_count": 41,
  //       "origin_country": [
  //         "JP"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": null,
  //       "id": 822895,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "",
  //       "poster_path": null,
  //       "media_type": "movie",
  //       "genre_ids": [],
  //       "popularity": 0.6,
  //       "release_date": "2003-01-01",
  //       "video": false,
  //       "vote_average": 0,
  //       "vote_count": 0
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/fXQEjHH26D0nmVA7I8J3BS4DKHs.jpg",
  //       "id": 219290,
  //       "name": "Blood Flowers",
  //       "original_language": "tr",
  //       "original_name": "Kan Çiçekleri",
  //       "overview": "The narrative of Dilan, whose aspirations and hopes were dashed on the one hand, and Baran, who had to marry to stop the feud and save her brother from this cycle on the other. This marriage, however, is a prison for the two of them, and his uncle, who is jealous of his wealth, wishes to renew the rivalry. This conflicted relationship will cause strong winds to blow between two hearts; will this marriage become a true marriage?",
  //       "poster_path": "/o6tosm7V0SMBlI1KsTUxPM9Papp.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         18
  //       ],
  //       "popularity": 132.776,
  //       "first_air_date": "2022-12-05",
  //       "vote_average": 7.7,
  //       "vote_count": 14,
  //       "origin_country": [
  //         "TR"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": null,
  //       "id": 859632,
  //       "title": "Blood",
  //       "original_language": "en",
  //       "original_title": "Blood",
  //       "overview": "When a down-on-his-luck 20-something discovers his blood cures cancer, he finds himself dangerously poised between the rush of fame and fortune and the hot pursuit of Big Pharma bent on eliminating him and his 'miracle blood.'",
  //       "poster_path": null,
  //       "media_type": "movie",
  //       "genre_ids": [],
  //       "popularity": 2.243,
  //       "release_date": "",
  //       "video": false,
  //       "vote_average": 0,
  //       "vote_count": 0
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": "/m8b52XWf1jO11Aeaz5vPpAgeqZp.jpg",
  //       "id": 62327,
  //       "name": "Blood Blockade Battlefront",
  //       "original_language": "ja",
  //       "original_name": "血界戦線",
  //       "overview": "One day, New York City as we know it vanished overnight into a mysterious fog. Now known as Hellsalem's Lot, it has become a place where another world beyond imagining is connected to our reality. The balance within this new world is protected by a secret society known as Libra. Leo, a journalist and photographer who arrives in the city, is unexpectedly recruited to join their ranks.",
  //       "poster_path": "/37Kvfpk5rxX2FYcAm8oiuqxkbfv.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         16,
  //         10765,
  //         10759,
  //         35
  //       ],
  //       "popularity": 72.849,
  //       "first_air_date": "2015-04-05",
  //       "vote_average": 7,
  //       "vote_count": 104,
  //       "origin_country": [
  //         "JP"
  //       ]
  //     },
  //     {
  //       "adult": false,
  //       "backdrop_path": null,
  //       "id": 40540,
  //       "name": "Bloodletting & Miraculous Cures",
  //       "original_language": "en",
  //       "original_name": "Bloodletting & Miraculous Cures",
  //       "overview": "Follows the lives of three young doctors fresh from medical school, and embarking on their new careers.",
  //       "poster_path": "/wz18bG1swHTcQ7YhPfSRSY9P7b9.jpg",
  //       "media_type": "tv",
  //       "genre_ids": [
  //         18
  //       ],
  //       "popularity": 17.778,
  //       "first_air_date": "2010-01-10",
  //       "vote_average": 0,
  //       "vote_count": 0,
  //       "origin_country": [
  //         "CA"
  //       ]
  //     }
  //   ],
  //   "total_pages": 204,
  //   "total_results": 4071
  // }

  // console.log(Object?.groupBy(bloods.results, ({media_type})=> media_type))

  if (!isVisibleCardPage) return null

  // console.log('cast', credits.cast)
  return (
    <section 
      ref={sectionRef}
      className={`bg-[#222] absolute w-full h-screen top-0 z-10 ${isVisibleCardPage ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out] overflow-y-auto mb-4`}>
      
    
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseCardPageClick}>
          <TfiClose />
        </button>
      </div>

      <div className="borderp border-stone-500 relative grid grid-cols-[100%] grid-flow-row md:grid-cols-[65%_35%] ">

        <div className="bg-cyan-600p ">
          <BackdropImage 
            card={card}
            isLoadingBackdropImage={isLoadingBackdropImage}
            setIsLoadingBackdropImage={setIsLoadingBackdropImage}
            setBackdropImageColor={setBackdropImageColor}
          />

          <div className="p-4 bg-yellow-500/20p relative"
          >
            <div className="w-full h-full bg-red-500p absolute top-0 left-0 z-[-1] opacity-30"
              style={{backgroundColor: backdropImageColor}}
            ></div>

            <div className="flex justify-between gap-4">
              <h1 className="text-4xl font-black p-4p mb-2 bg-red-500p">
                {card.title || card.name}
              </h1>
              <TitleImage card={card} images={images} />
            </div>

            <p className="mb-8 italic">{details.tagline}</p>

            {
              'keywords' in keywords && keywords.keywords?.[0] && (
                <span className="text-2xl">A {links.MEDIATYPE} about:</span>
              )
            }
            <ul className="bg-sky-800p w-full mb-4 flex flex-wrap gap-x-10 p-4">
                <Keywords keywords={keywords} />
            </ul>
          </div>

          {/* Starring */}
          <div className=" my-10 ">
            {
              credits.cast?.[0] &&
                <p 
                  className="mb-4 text-center text-xl">
                  Starring
                </p>
            }
            <ul className="mb-4 md:w-full grid grid-cols-2 lg:grid-cols-4 justify-around gap-4 ">
              {
                credits.cast && 
                <Starring  
                  stars={
                    getFirstXItems(credits.cast, 4)
                  }
                  card={card}
                />  
              }
            </ul>
          </div>
        </div>

        <div className="bg-amber-600p relative gridp content-betweenp mt-10 md:mt-0">
          <div className="px-4 bg-orange-700p">
            <p className="bg-blue-500p max-h-[200px] overflow-hidden overflow-y-auto">
              {card.overview}
            </p>

            <p className="flex flex-wrap gap-x-2 items-center justify-between  my-4">
              <span className="flex items-center gap-1">
                <FaStar />
                {
                  card.vote_average && card.vote_average.toFixed(1)
                }
              </span>
              <span>
                {'first_air_date' in card && 
                card.first_air_date.split('-')[0]} 
              </span>
              <span>{rating}</span>
              <span>
                {
                  'runtime' in details 
                  ? (
                    calculateRuntime(details?.runtime) 
                  )
                  : (
                    calculateRuntime(details?.last_episode_to_air?.runtime)
                  )
                }
              </span>
            </p>

            {/* Genres */}
            <ul className="px-4 flex bg-red-700p flex-wrap gap-x-10 my-10">
              {
                details.genres && details.genres.map((genre, i) => (
                  <li key={i} className="list-disc capitalize">
                    {genre.name}
                  </li>
                ))
              }
            </ul>

            <p className="my-10">
              <span>Status:</span>
              <span className="ml-4">{details.status}</span>
            </p>

              {/* PosterAndOthers */}
          </div>
          
          {/* trailer */}
          <div className="bg-stone-800p my-4 md:my-0">
            {
              'id' in card && (
                <PosterAndOthers 
                  card={card}
                  links={links}
                />
              )
            }

            <Trailer trailers={trailers} />
          </div>
          
          
        </div>

      </div>

      <div className="my-10">
        <StarDirectorWriterCreator 
          credits={credits} details={details}
        />
      
        <SpokenLanguages details={details} />
        
        {
          credits.cast?.[0] &&
          <p className=" mx-4 text-xl">Cast: </p>
        }
        {
          credits.cast &&
          <Cast cast={credits.cast} card={card}/>  
        }

        <Recommendations id={card.id} />
        <Similar id={card.id} />
            
        
        {/* <Iframes trailers={trailers}/> */}
      </div>

      <footer className="bg-slate-950 min-h-[200px]">
        <p>footer
          {
            // details
          }
        </p> 
      </footer>

    </section>
  )
}

/* 
<Image 
            alt={card.title || card.name} 
            src={`${ImagePath}${card.backdrop_path}`} 
            width={3840} height={2160}
            priority
            loading="eager"
            quality={100}
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            className="w-[100%] h-auto"
          />
*/

/*  
a media_type about keywords in which overview
staring
 moviie.credits.cast
Director
 moviie.credits.crew
"known_for_department": "Directing"
Writers
 moviie.credits.crew
"known_for_department": "Writing"
*/


