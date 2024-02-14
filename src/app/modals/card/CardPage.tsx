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
  starDirectorWriter, getTrailer, getFirstXItems, calculateRuntime
} from "./lib/utils";

import { BackdropImage } from "./components/BackdropImage";
import Recommendations from "./components/Recommendations";
import Similar from "./components/Similar";
import Cast from "./components/Cast";
import Starring from "./components/Starring";
import PosterAndOthers from "./components/PosterAndOthers";
import ThemeContext from "@/app/(__pages__)/context/ThemeContext";
import ImagesAndVideosContext from "@/app/(__pages__)/context/ImagesAndVideosContext";


let scrollThrottleTimer: any
export default function CardPage() {

  const sectionRef = useRef<HTMLElement>(null)
  
  const {isVisibleCardPage, setIsVisibleCardPage, card, setCard, scrollTop} = useContext(CardBeingViewedContext)

  const {links} = useContext(MoviesOrTVshowsLinksContext)

  const {
    details, setDetails, credits, 
    setCredits, contentRatings, setContentRatings,
    keywords, setKeywords, 
  } = useContext(MoviesOrTVshowsInfoContext)!


  const {
    backdropImageColor, setBackdropImageColor,
    isLoadingBackdropImage, setIsLoadingBackdropImage
  } = useContext(ThemeContext)

  const {
    isVisibleAllImages, setIsVisibleAllImages,
    isVisibleAllVideos, setIsVisibleAllVideos
  } = useContext(ImagesAndVideosContext)

  // const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [trailers, setTrailers] = useState<TrailerType[]>([])
  const [rating, setRating] = useState('')
  

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
    id:  17610,
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

  useEffect(() => {
    if (card.backdrop_path) return
    setCard(myCard)
    setIsVisibleCardPage(true)
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
      if (document.documentElement.scrollTop) return
      clearTimeout(scrollThrottleTimer)

      scrollThrottleTimer = setTimeout(() => {
        document.body.style.overflow = 'hidden'
      })
    }

    addEventListener('scroll', fn)
    return () => {
      removeEventListener('scroll', fn)
    }
  }, [])

  useEffect(() => {
    if (!isVisibleCardPage) return

    (async () => {
      const res = await getTrailer(links.TRAILERS, card.id)
      setTrailers(res)
    })()
  }, [links, card.id, isVisibleCardPage])


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

      <div className="border border-stone-500 relative grid grid-cols-[100%] grid-flow-row md:grid-cols-[65%_35%] ">

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
            <h1 className="text-4xl font-black p-4p mb-2 bg-red-500p">
              {card.title || card.name}
            </h1>
            <p className="mb-8 italic">{details.tagline}</p>

            <span className="text-2xl">A {links.MEDIATYPE} about:</span>
            <ul className="bg-sky-800p w-full mb-4 flex flex-wrap gap-x-10 p-4">
                {
                  'keywords' in keywords 
                  ? (
                      keywords.keywords.map((keyword, i) => (
                        <li key={keyword.id} className="list-disc">
                          {keyword.name}
                        </li>
                      ))
                    )
                    
                    : 'results' in keywords 
                    ? (
                      keywords.results.map((result, i) => (
                        <li key={i} className="list-disc">
                          {result.name}
                        </li>
                      ))
                    )
                    : null
                }
            </ul>
          </div>

          {/* Starring */}
          <div className=" my-10 ">
            <p className="mb-4 text-center text-xl">Starring</p>
            <ul className="mb-4 bg-pink-500p md:w-full grid grid-cols-2 md:grid-cols-4 justify-around gap-4">
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
            <p className="bg-blue-500p h-[200px] overflow-hidden overflow-y-auto">
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
                  setIsVisibleAllImages={setIsVisibleAllImages}
                  setIsVisibleAllVideos={setIsVisibleAllVideos}
                />
              )
            }

            {
              trailers?.[0] ?  (
              <iframe
                title={trailers[0]?.name}
                key={trailers[0]?.key}
                className="w-[95%] mx-auto min-h-[216px]"
                src={`https://www.${trailers[0]?.site}.com/embed/${trailers[0]?.key}`}
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            )
            : (
              <div className="w-full h-[150px] mx-auto flex items-center justify-center  text-center italic">Sorry, no traliers available 😢</div>
              )
            }
          </div>
          
          
        </div>

      </div>

      <div className="my-10 ">

          {/* starDirectorWriter */}
          {
            credits.crew &&
            starDirectorWriter(details, null)[0] &&

            <div className="flex flex-wrap gap-x-4 m-4">
              <span className="mr-4">
                {
                  starDirectorWriter(details, null)[0]
                }
              </span> 
              <ul className=" flex flex-wrap gap-x-10 ">
                {
                  starDirectorWriter(details, null)[1]?.map(
                    star => (
                    <li key={star.id} className="list-disc">
                      {star.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          }
          
          {
            credits.crew && 
            starDirectorWriter(credits, 'Director')[0] &&
            
            <div className="flex flex-wrap gap-x-4 m-4">
                <span className="mr-4">
                {
                  starDirectorWriter(credits, 'Director')[0]
                }
              </span> 
              <ul className="flex flex-wrap gap-x-10 ">
                {
                  starDirectorWriter(credits, 'Director')[1]?.map(
                    star => (
                    <li key={star.id} className="list-disc">
                      {star.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        
          {
            credits.crew && 
            starDirectorWriter(credits, 'Writer')[0] &&

            <div className="flex flex-wrap gap-x-4 m-4">
              <span className="mr-4">
                {
                  starDirectorWriter(credits, 'Writer')[0]
                }
              </span> 
              <ul className=" flex flex-wrap gap-x-10">
                {
                  starDirectorWriter(credits, 'Writer')[1]?.map(
                    star => (
                    <li key={star.id} className="list-disc">
                      {star.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        
          {/* Spoken languages: */}
          <p className="my-10 mx-4">
            Spoken languages: {
            details.spoken_languages && details.spoken_languages.map((language) => (
              `${language.english_name} (${language.iso_639_1})`
            )).join(', ')
            }
          </p>

          <p className=" mx-4 text-xl">Cast: </p>
          {
            credits.cast &&
            <Cast 
              cast={credits.cast} 
              card={card}
            />  
          }

          {/* recommendations: */}
          <Recommendations id={card.id} links={links} />
          <Similar id={card.id} links={links} />
            
        
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


