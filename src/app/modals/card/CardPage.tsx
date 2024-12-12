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
import {MediaTypeInfoType, CommonTypes} from '@/app/lib/MediaTypeInfoTypes'
import { 
  starDirectorWriterCreator, getTrailers, getFirstXItems, calculateRuntime
} from "./lib/utils";

import BackdropImage  from "./components/BackdropImage";
import Recommendations from "./components/Recommendations";
import Similar from "./components/Similar";
import Cast from "./components/Cast";
import Starring from "./components/Starring";
import PosterAndOthers from "./components/PosterAndOthers";
// import ThemeContext from "@/app/(__pages__)/context/ThemeContext";
// import ImagesAndVideosContext from "@/app/(__pages__)/context/ImagesAndVideosContext";
import StarDirectorWriterCreator from "./components/StarDirectorWriterCreator";
import StarDirectorWriterCreatorBar from "./components/StarDirectorWriterCreatorBar";
import SpokenLanguages from "./components/SpokenLanguages";
import Keywords from "./components/Keywords";
import Trailer from "./components/Trailer";
import TitleImage from "./components/TitleImage";
import Reviews from "./components/reviews/Reviews";
import WatchProviders from "./components/watch-providers/WatchProviders";
import { Companies } from "../search/components/company/Companies";
import ShowSelectSeason from "./components/seasons/ShowSelectSeason";
import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store";
import BackdropImageNormal from "./components/BackdropImageNormal";
import useAllImagesAndVideosStore from "@/app/(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";
import { SeasonType } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { HiMiniArrowLongUp } from "react-icons/hi2";
import LatestMoviesOrTvShows from "@/app/(__pages__)/(top_links)/popular/home-page-header-section/LatestMoviesOrTvShows";



export type BackdropImageInfo = {
  bounds: {
    width: number, 
    height: number, 
    top: number, 
    left: number,
    x: number,
    y: number
  }
  backdropImageRef: {
    current: HTMLImageElement | null
  }
}

export default function CardPage() {

  const sectionRef = useRef<HTMLElement>(null)
  // const backdropImageRef = useRef<HTMLImageElement | null>(null)
  const cardPageMainContainerRef = useRef<HTMLDivElement | null>(null)
  const titleImageContainerRef = useRef<HTMLDivElement | null>(null)
  const posterAndOthersContainerRef = useRef<HTMLDivElement | null>(null)
  const overviewContainerRef = useRef<HTMLDivElement | null>(null)
  
  const {isVisibleCardPage, setIsVisibleCardPage, card, setCard, scrollTop} = useContext(CardBeingViewedContext)

  const {links} = useContext(MoviesOrTVshowsLinksContext)

  const {
    details, setDetails, credits, 
    setCredits, contentRatings, setContentRatings,
    keywords, setKeywords,
  } = useContext(MoviesOrTVshowsInfoContext)!


  // const {} = useContext(ThemeContext)


  const {options, setOptions, setSelectedSeason} = useSeasonsStore()
  const {setTitleImageImages} = useAllImagesAndVideosStore()

  
  // const {
    //   setIsVisibleAllImages,
    //   setIsVisibleAllVideos
    // } = useContext(ImagesAndVideosContext)
    
    // const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [backdropImageColor, setBackdropImageColor] = useState('')
  const [isLoadingBackdropImage, setIsLoadingBackdropImage] = useState(true)
  const [trailers, setTrailers] = useState<TrailerType[]>([])
  const [rating, setRating] = useState('')
  const [images, setImages] = useState<CommonTypes['Images'] | null>(null)

  const [backdropImageInfo, setBackdropImageInfo] = useState<BackdropImageInfo>({
    bounds: {width: 0, height: 0, top: 0, left: 0, x: 0, y: 0},
    backdropImageRef: {
      current: null
    }
  })
  
  const [forBigScreen, setForBigScreen] = useState(false)
  const [colorThiefColor, setColorThiefColor] = useState<number[][]>()

  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false)


  // console.log({backdropImageColor})
  // console.log(images.logos)
  // let m = 0
  // console.log({m: m++})

  // console.log({details})
  
  

  const blacklist = 46952 
  const ncis = 17610 
  const homeland = 1407 
  const time = 126116 

  const myCard = {
    adult: false,
    title: "Blacklist",
    backdrop_path: "/dAepkmD4vdfhS82r2OIqF1nwGR5.jpg",
    first_air_date: "2009-09-22",
    genre_ids:[ 10759, 18, 80],
    id: !homeland || blacklist || ncis,
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
    // console.log(
    //   location.href,
    //   location.pathname
    // )
    document.body.style.overflow = location.pathname === '/' ? 'auto': 'hidden'
    setIsLoadingBackdropImage(true)
    setIsVisibleCardPage(false)

    window.scroll({
      top: scrollTop,
      left: 0,
      behavior: "smooth",
    });
  }

  function scrollToTp() {
    const scrollElem = sectionRef.current
    if (!scrollElem) return

    // scrollElem.scrollTop = 0; 
    scrollElem.scrollTo ({top: 0, left: 0, behavior: 'smooth'}); 
  }


  useEffect(() => {
    const scrollElem = sectionRef.current
    if (!scrollElem) return

    const handleScroll = () => {
      setShowScrollToTopBtn(scrollElem.scrollTop > 300)
    }

    scrollElem.addEventListener('scroll', handleScroll)
    return () => scrollElem.removeEventListener('scroll', handleScroll)

  }, [sectionRef.current])

  // console.log(card.id)


  // useEffect(() => {
  //   //to be turned off later
  //   if ('seasons' in details) {
  //     setSelectedSeason(details.seasons[1])
  //   }
  // }, [details])

  useEffect(() => {
    //to be turned off later
    if (!(card.backdrop_path)) {
      setCard(myCard)
      setIsVisibleCardPage(true)
    }
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
    if (!isVisibleCardPage || !card.id) return

    async function getAndSetData() {
      try {
        const detailsRes: MediaTypeInfoType['details'] = 
        await axios(`
        ${links.INFOS.details.beforeStr}${card.id}${links.INFOS.details.afterStr}
        `, TMDBOptions).then(res => res.data)

        if ('seasons' in detailsRes) {
          const filteredSeasons = detailsRes.seasons.filter(
            season => !season.name.includes('Specials')
          )
          
          detailsRes.seasons = filteredSeasons
          setOptions(filteredSeasons)
          setSelectedSeason(filteredSeasons[0])
        }
        
        setDetails(detailsRes)

      } catch(err: any) {
        console.log(err)
      }

    }
    getAndSetData()
  }, [
    card.id, links.INFOS.details.beforeStr, links.INFOS.details.afterStr, setDetails, isVisibleCardPage
  ])
  
  useEffect(() => {
    if (!isVisibleCardPage || !card.id) return

    async function getAndSetData() {
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
    if (!isVisibleCardPage || !card.id) return

    async function getAndSetData() {
      try {
        const keywordsRes: MediaTypeInfoType['keywords'] = 
        await axios(`
        ${links.INFOS.keywords.beforeStr}${card.id}${links.INFOS.keywords.afterStr}
        `, TMDBOptions).then(res => res.data)
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
    if (!isVisibleCardPage || !card.id) return

    async function getAndSetData() {
      try {
        const contentRatingsRes: 
        MediaTypeInfoType['contentRatings'] = 
        await axios(`
        ${links.INFOS.contentRatings.beforeStr}${card.id}${links.INFOS.contentRatings.afterStr}
        `, TMDBOptions).then(res => res.data)
        setContentRatings(contentRatingsRes)

      } catch(err: any) {
        console.log(err)
      }

    // console.log(datailsRes)
      // setCard(res)
    }
    getAndSetData()
  }, [
    card.id, links.INFOS.contentRatings.beforeStr, links.INFOS.contentRatings.afterStr, setContentRatings, isVisibleCardPage
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
    if (!isVisibleCardPage || !card.id) return

    (async () => {
      const res = await getTrailers(links.TRAILERS, card.id)
      setTrailers(res)
    })()
  }, [links, card.id, isVisibleCardPage])


  // getAllImages
  useEffect(() => {
    async function getImages() {
      if(!isVisibleCardPage || !card?.id) return

      try {
        const data: typeof images = await axios(`${
          links.INFOS.images.beforeStr}${card.id}${links.INFOS.images.afterStr}`,
          TMDBOptions
        ).then (res => res.data)
        setImages(data)
        setTitleImageImages(data)

      } catch (error) {
        console.log('error is: ', error)
      }
    }  
    getImages()

  }, [
    isVisibleCardPage, card.id, 
    links.INFOS.images.beforeStr, links.INFOS.images.afterStr
  ])


  
// for small screen
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: 1020px)`)//lg
    
    function my() {
      if (mediaQuery.matches) {
        setForBigScreen(false)
      } else {
        setForBigScreen(true)
      }
    }
    my()

    mediaQuery.addEventListener('change', my)
    return () => mediaQuery.addEventListener('change', my)
  }, [])


  const alteredBg = ((bg = 'rgb(3 3 3 / 1)') => {
    return bg.split('/')[0].replace(/ /g, ',').replace(/rgb/g, 'rgba') + '0.2)';
  })(backdropImageColor)

  // return null

  return (
    <section 
      key={card.id}
      ref={sectionRef}
      className={`bg-[#222] absolute w-full h-screen top-0 z-20 ${isVisibleCardPage ? 'left-0' : 'left-[-100%]'} overflow-hidden overflow-y-auto mb-4 `}
      >

      <div>
        <div className="pb-[50px] border-b border-white/70 dark:border-gray-500"
          style={{
            background:  alteredBg
          }}
        >
          <div className="w-full flex justify-end gap-2  h-[50px] "> 
            <button 
              className="text-white text-2xl cursor-pointer bg-red-500p p-4"
              onClick={handleCloseCardPageClick}>
              <TfiClose />
            </button>
          </div>

          <div className="max-w-[1546px] mx-auto">
            <div className=" bg-green-900p  relative grid grid-cols-[100%] grid-flow-row md:grid-cols-[65%_35%] [@media_(max-width:1020px)]:flex [@media_(max-width:1020px)]:flex-wrap border-b border-white/70 dark:border-gray-500 overflow-hidden [@media_(max-width:1020px)]:overflow-auto"
            ref={cardPageMainContainerRef}    
            >
              <div 
              className="w-full h-full bg-red-500p absolute top-0 left-0 z-[-1] opacity-30"
              style={{backgroundColor: backdropImageColor}}
              />

              <div className="bg-cyan-600p max-w-[938px] [@media_(max-width:1020px)]:max-w-[100vw]">
                <div className="border-b border-white/70 dark:border-gray-500">
                  <BackdropImageNormal 
                    card={card}
                    isLoadingBackdropImage={isLoadingBackdropImage}
                    setIsLoadingBackdropImage={setIsLoadingBackdropImage}
                    setBackdropImageColor={setBackdropImageColor}
                    setBackdropImageInfo={setBackdropImageInfo}
                  />
                </div>

                <div className="p-4 bg-yellow-500p relative pr-10p [@media_(max-width:1020px)]:pr-4 [@media_(min-width:1021px)]:max-w-[885.3px]"
                  ref={titleImageContainerRef}
                >
                  <div className="flex justify-between gap-4 bg-red-500p my-4">
                    {
                      images && (
                        <TitleImage 
                          card={card} 
                          images={images} 
                          setColorThiefColor={setColorThiefColor} 
                        />
                      )
                    }
                    
                    {
                      links.MEDIATYPE === 'tvshow' && 'seasons' in details && details.seasons?.[0]?.id && (
                        <ShowSelectSeason  />
                      )
                    }
                  </div>

                  <p className="mb-8 italic">{details.tagline}</p>

                  <div className="bg-green-600p">
                    {
                      'keywords' in keywords && keywords.keywords?.[0]  || 'results' in keywords && keywords.results?.[0] ? (
                        <p className="text-2xl mb-3">A {links.MEDIATYPE} about:</p>
                      )
                      : null
                    }
                    <ul className="bg-sky-800p w-full pl-4p flex gap-x-10 overflow-hidden overflow-x-auto [@media_(max-width:1020px)]:overflow-x-hidden [@media_(max-width:1020px)]:overflow-visible [@media_(max-width:1020px)]:flex-wrap">
                      <Keywords keywords={keywords} />
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`bg-blue-700p absolute [@media_(max-width:1020px)]:static z-10 mt-10 md:mt-0 max-w-[635px] [@media_(max-width:1020px)]:max-w-max`}
                style={{
                  // height: `${backdropImageInfo.bounds.height}px`,
                  top: `0`,
                  bottom: `0`,
                  left: `${backdropImageInfo.bounds.width}px`,
                }}
              >
                <div className="bg-orange-700p border-b border-white/70 dark:border-gray-500 [@media_(max-width:1020px)]:border-none overflow-hidden [@media_(max-width:1020px)]:overflow-auto"
                  ref={overviewContainerRef}
                  style={{
                    height: forBigScreen 
                      ? `${backdropImageInfo.bounds.height+1}px` : `max-content`,
                  }}
                >
                  <p className="text-xl hidden [@media_(max-width:1020px)]:block px-4 my-2 pb-1">
                    Overview
                  </p>

                  <p className="bg-blue-500p max-h-[100px] [@media_(min-width:1070px)]:max-h-[115px] [@media_(min-width:1170px)]:max-h-[150px] [@media_(min-width:1400px)]:max-h-[180px] [@media_(max-width:1020px)]:max-h-[300px] overflow-hidden overflow-y-auto [@media_(max-width:1020px)]:w-[70ch]p px-4 [@media_(max-width:1020px)]:mb-6">
                    {card.overview}
                  </p>

                  {/* yellow star and others  */}
                  <p className="flex flex-nowrap gap-x-2 items-center justify-between  xl:my-[10px] my-[8px] [@media_(max-width:1020px)]:my-6 [@media_(min-width:1030px)]:my-2 pt-2 border-t border-white/70 dark:border-gray-500 px-4 ">
                    <span className="flex items-center gap-1">
                      <FaStar color="yellow"/>
                      {
                        card.vote_average && card.vote_average.toFixed(1)
                      }
                    </span>
                      {card.first_air_date?
                        <span>
                            {card?.first_air_date?.split('-')[0]}
                        </span> 
                        : null
                      } 
                    <span>{rating || 'N/A'}</span>
                    <span>
                      {
                        'runtime' in details 
                        ? (
                          calculateRuntime(details?.runtime) 
                        )
                        : (
                          details?.last_episode_to_air?.runtime &&
                            calculateRuntime(details.last_episode_to_air.runtime)
                        )
                      }
                    </span>
                  </p>

                  <div className="relative h-[34px] xl:my-[10px] [@media_(max-width:1020px)]:my-6 leading-[20px] [@media_(max-width:1020px)]:leading-[24px] [@media_(max-width:1020px)]:h-auto">
                    {/* Genres */}
                    <ul className="flex flex-nowrap mx-4 overflow-hidden overflow-x-auto absolute inset-0 [@media_(max-width:1020px)]:static [@media_(max-width:1020px)]:overflow-visible [@media_(max-width:1020px)]:flex-wrap [@media_(max-width:1020px)]:overflow-x-hidden"
                    >
                      {
                        details.genres && details.genres.map((genre, i) => (
                          <li key={i} className="list-disc capitalize mx-2 first:ml-0 whitespace-nowrap [@media_(max-width:1020px)]:whitespace-normal [@media_(max-width:1020px)]:my-1 first:list-none">
                            {genre.name}
                          </li>
                        ))
                      }
                    </ul>
                  </div>

                  <p className="xl:my-[10px] my-[8px] [@media_(max-width:1020px)]:my-6 px-4">
                    <span>Status:</span>
                    <span className="ml-4">{details.status}</span>
                  </p>

                  {
                    'last_air_date' in details && (
                      <p className="xl:my-[10px] my-[8px] [@media_(max-width:1020px)]:my-6 px-4">
                        <span>Last aired date:</span>
                        <span className="ml-4">{details.last_air_date}</span> 
                      </p>
                    )
                  }

                  {/* PosterAndOthers */}
                  {
                    'id' in card && (
                      <div className="bg-black max-h-[150px] overflow-hidden absolute [@media_(max-width:1020px)]:static [@media_(max-width:1020px)]:my-6 [@media_(min-width:1020px)]:max-h-[120px] [@media_(min-width:1280px)]:max-h-[150px] w-full max-w-[635px] [@media_(max-width:1020px)]:max-w-full [@media_(max-width:1020px)]:max-h-max"
                        ref={posterAndOthersContainerRef}
                        style={{
                          top: `${
                            backdropImageInfo.bounds.height - 
                            (posterAndOthersContainerRef.current?.getBoundingClientRect().height || 0)
                          }px`
                        }}
                      >
                        { images && (
                          <PosterAndOthers 
                            card={card}
                            links={links}
                            trailers={trailers}
                            details={details}
                            imagesToSet={images}
                            colorThiefColor={colorThiefColor}
                          />
                        )

                        }
                      </div>
                    )
                  }

                </div>
                
                {/* trailer */}
                <div className="mt-8p md:my-0p [@media_(max-width:1020px)]:mx-4 bg-red-500p "
                  style={forBigScreen? {
                    height:  `${
                      (titleImageContainerRef.current?.getBoundingClientRect().height)
                    }px` ,
                    paddingTop: 32+'px'
                  }: {height: 'max-content'}}
                >
                  <Trailer trailers={trailers} />
                </div>
                
                
              </div>


            </div>
          </div>
        </div>

        {/* Starring */}
        <div className=" my-10 bg-red-200p pr-10p [@media_(max-width:1020px)]:pr-4 [@media_(max-width:1020px)]:mx-4 max-w-[1546px] mx-auto">
            {
              credits.cast?.[0] &&
                <p 
                  className="mb-4 text-center text-xl">
                  Starring
                </p>
            }
            <div className="flex justify-center">
                <ul className="my-2 grid grid-flow-col gap-4 justify-start overflow-x-auto ">
                  {
                    credits.cast && 
                    <Starring  
                      stars={
                        getFirstXItems(credits.cast)
                      }
                    />  
                  }
              </ul>
            </div>
          </div>


        <div className="my-10 max-w-[1546px] mx-auto">
          <StarDirectorWriterCreatorBar 
            credits={credits} details={details}
          />

          <SpokenLanguages details={details} />
          
          {
            credits.cast?.[0] &&
            <p className=" mx-4 text-xl text-center">Cast</p>
          }
          {
            credits.cast && (
              <div className="grid justify-center">
                <Cast cast={credits.cast}/>  
              </div>
            )
          }

          <Recommendations id={card.id} />
          <Similar id={card.id} />
              
          
          {/* <Iframes trailers={trailers}/> */}
        </div>

        <footer className="bg-slate-950 min-h-[200px] py-10 px-4 max-w-[1546px] mx-auto">
          {
            details.production_companies && (
              <Companies 
                results={details.production_companies} 
                companyOrNetwork="company"
                hasTitle
              />
            )
          }

          <Reviews cardID={card.id} />

          {
            'networks' in details && (
              <Companies 
                results={details.networks} 
                companyOrNetwork="network"
                hasTitle
              />
            )
          }

          <WatchProviders cardId={card.id} />

          <LatestMoviesOrTvShows />

          <div className="bg-red-500/20 grid">
            <span>share</span>
            <span>popularity</span>
            <span>budget</span>
            <span>revenue</span>
            <span>beleongs to collection</span>
            {/* <span>networks</span> */}
            <span>type</span>
            {/* <span>vote average 7.6 stars I already used</span> */}
            <span>vote count</span>
            <span>homepage</span>
          </div>
        </footer>
        
        
      </div>
      

      {/* Scroll To Top */}
      {
        showScrollToTopBtn && (
          <button 
            className="text-white dark:text-white fixed bottom-4 right-4 p-2 bg-rose-600 rounded-full"
            onClick={scrollToTp}
          >
            <span className="flex items-center">
              <HiMiniArrowLongUp  size={20} className="animate-bounce"/>
            </span>
          </button>
        )
      }

    </section>
  )
}



/*  

staring
 moviie.credits.cast
Director
 moviie.credits.crew
"known_for_department": "Directing"
Writers
 moviie.credits.crew
"known_for_department": "Writing"
*/

