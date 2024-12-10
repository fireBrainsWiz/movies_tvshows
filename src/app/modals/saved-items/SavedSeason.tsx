'use client'

import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store"
import { TfiClose } from "react-icons/tfi";
import { ImagePath, ResultType } from "@/app/lib/types";
import Image from "next/image";
import TitleImage from "../card/components/TitleImage";
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";
import { IoStar } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { BsShare } from "react-icons/bs";
import useSavedStorePersist from "@/app/(__pages__)/stores/saved-store/saved-store-persist";
import { SaveOrRemoveFromSavedStore } from "@/app/(__pages__)/components/save/SaveOrRemoveFromSavedStore";
import ShowSelectSeason from "../card/components/seasons/ShowSelectSeason";
import { SeasonDetails, SeasonType } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import axios from "axios";
import { TVshowsDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { CommonTypes, MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { More } from "./More";
import getTailwindColorUsingNumber from "@/app/client/helpers/getTailwindColorsUsingNumber";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
import useAllImagesAndVideosStore, { Videos } from "@/app/(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";
import ThreeImages from "../card/components/ThreeImages";


export default function SavedSeason({
  seasonDetails, forSmallScreen
}: {
  seasonDetails: SeasonDetails & {show_id: number}
  forSmallScreen: boolean
}) {

  const seasonToSave: SeasonType & {show_id: number} = {
    air_date: seasonDetails.air_date,
    episode_count: seasonDetails.episodes.length,
    id: seasonDetails.id,
    name: seasonDetails.name,
    overview: seasonDetails.overview,
    poster_path: seasonDetails.poster_path,
    season_number: seasonDetails.season_number,
    vote_average: seasonDetails.vote_average,
    show_id: seasonDetails.show_id
  }

  const imageRef  = useRef<HTMLImageElement | null>(null)

  // const {titleImageImages} = useAllImagesAndVideosStore()
  
  const [tvShow, setTVShow] = useState<TVshowsDetails | null>(null)
  const [images, setImages] = useState({} as CommonTypes['Images'])
  // const [imageColor, setImageColor] = useState('')
  const [seasonImages, setSeasonImages] = useState<Images | null>(null)
  const [videos, setVideos] = useState<Videos | null>(null)
  const [colorThiefColor, setColorThiefColor] = useState<number[][]>()

  

  // useImagePixel({
  //   backdrop_path: seasonDetails.poster_path || '/no-image-1.webp', 
  //   imageRef, 
  //   setColor: setImageColor
  // })


  useEffect(() => {
    (async () => {
      try {
        if (!seasonDetails.show_id) return
        const data: TVshowsDetails = 
        await axios(`
          https://api.themoviedb.org/3/tv/${seasonDetails.show_id}?language=en-US`, TMDBOptions
        ).then(res => res.data)
        setTVShow(data)
      } catch(error) {
        console.log(error)
      }
    })()

  }, [seasonDetails.show_id])

  
  useEffect(() => {
    async function getImages() {
      if (!seasonDetails.show_id) return
      try {
        const data: typeof images = await axios(
          `https://api.themoviedb.org/3/tv/${seasonDetails.show_id}/images`,
          TMDBOptions
        ).then(res => {
          return res.data
        })
        setImages(data)
      } catch (error) {
        console.log(error)
      }
    }  
    getImages()

  }, [seasonDetails.show_id])


  useEffect(() => {
    ;(async ()=>{
      if (!seasonDetails) return
      try {
        const images: Images = await axios(
          `https://api.themoviedb.org/3/tv/${seasonDetails.episodes[0].show_id}/season/${seasonDetails.season_number}/images`,
          TMDBOptions
        ).then(res => res.data)

        const videos: Videos = await axios(
          `https://api.themoviedb.org/3/tv/${seasonDetails.episodes[0].show_id}/season/${seasonDetails.season_number}/videos?language=en-US`,
          TMDBOptions
        ).then(res => res.data)

        setVideos(videos)
        setSeasonImages(images)

      } catch (error) {
        console.log(error)
      }
    })()

  }, [seasonDetails.show_id])

  // console.log({tvShow, images})
  // console.log({showVisitShowBtn})

  // const imageRef = useRef<HTMLImageElement | null>(null)

  // console.log(seasonDetails)

  // const {images, details} = useContext(MoviesOrTVshowsInfoContext)!
  // const {card} = useContext(CardBeingViewedContext)

  // console.log({colorThiefColor, id: seasonDetails.id})


  // const seasonToSave = selectedSeason && card?.id 
  //   ? {...selectedSeason, show_id: card.id} 
  //   : null
  // ; 


  
  const tvCard: ResultType | null = useMemo(() => {
    return tvShow? {
      id: tvShow.id,
      title: tvShow.name,
      name: tvShow.name,
      overview: tvShow.overview,
      first_air_date: tvShow?.first_air_date || '',
      poster_path: tvShow.poster_path,
      vote_average: tvShow.vote_average,
      vote_count: tvShow.vote_count,
      backdrop_path: tvShow?.backdrop_path || '/no-image-1.webp',
      genre_ids: tvShow.genres.map(genre => genre.id),
      original_language: tvShow.original_language,
      original_name: tvShow.original_name,
      popularity: tvShow.popularity,
      adult: tvShow.adult,
    } : null
  }, [ tvShow ])


  return (
    <div 
      // key={seasonDetails.id}
      className={`bg-stone-700 my-10 `}>
      {
        forSmallScreen 
        ? (
            <div className="bg-black min-h-[300px] flex [@media(max-width:600px)]:flex-wrap-reverse justify-between relative overflow-hidden dark:border  border-white/70 dark:border-gray-500 [@media(max-width:600px)]:rounded-md">
                <div className="p-2 bg-amber-500/50p grid [@media(max-width:600px)]:gap-y-2 items-center  text-white">

                  <div className=" w-[90%] flex gap-6 items-center max-[400px]:flex-wrap max-[400px]:justify-center max-[400px]:py-2 max-[400px]:mx-auto max-[400px]:mb-3 bg-yellow-300p">
                    {
                      tvCard && images && (
                        <TitleImage 
                          card={tvCard} 
                          images={images} 
                          setColorThiefColor={setColorThiefColor}
                        />
                      )
                    }

                    <div className="bg-blue-400p mx-autop">
                      {
                        seasonImages && videos && (
                          <ThreeImages 
                            imagesToSet={{
                              id: seasonImages.id,
                              backdrops: seasonImages.posters,
                              posters: [],
                              logos: []
                            }} 
                            trailers={videos.results}
                            colorThiefColor={colorThiefColor}
                            disableScaling
                          />
                        )
                      }
                    </div>
                  </div>


                  <p>First aired on {seasonDetails.air_date}</p>
                  <p className="relative my-6 [@media(max-width:380px)]:mb-20 bg-green-500p">
                    {seasonDetails.episodes.length} Episodes
                    <span 
                      className={`absolute -top-[78%] left-[10px] bg-green-600p  min-w-[300px] translate-x-1/2 [@media(max-width:800px)]:min-w-[0px] [@media(max-width:800px)]:w-[200px] [@media(max-width:380px)]:top-[115%] [@media(max-width:380px)]:left-1/2  [@media(max-width:380px)]:-translate-x-1/2`}
                      onClick={(e) => {}}
                    >
                      <More 
                        show_id={seasonDetails.show_id} 
                        fromSaved={true}
                        bgColor={
                          colorThiefColor
                          ? `rgb(${colorThiefColor[0][0]}, ${colorThiefColor[0][1]}, ${colorThiefColor[0][2]})`

                          :getTailwindColorUsingNumber(seasonDetails.show_id)
                        }
                      />
                    </span>
                  </p>
                  <div className="flex items-center justify-between bg-red-500/30p max-[500px]:flex-wrap gap-10">
                    <span className="flex items-center gap-1">
                      <IoStar color="gold"/> {seasonDetails.vote_average.toFixed(1)}
                    </span>
                    <span className="text-2xl font-bold truncate">
                      {seasonDetails.name.slice(0, 9)}
                      </span>
                    <span className="max-[500px]:w-1/2">
                      {
                        seasonDetails && (
                          <SaveOrRemoveFromSavedStore 
                            item={seasonToSave} 
                            whatToAlter='season'
                          />
                        )
                      }
                    </span>
                    <span><BsShare size={25} color='deepskyblue'/></span>
                  </div>

                </div>
                <div className="bg-red-500p flex justify-end [@media(max-width:600px)]:w-full [@media(max-width:600px)]:justify-center items-center">
                  <div className="inlene-block bg-amber-500p p-2p relative">
                    <Image 
                      src={ImagePath? ImagePath + seasonDetails.poster_path : '/no-image-2.webp'}
                      alt="poster"
                      width={220}
                      height={220}
                      className="object-cover min-w-[200px]"
                    />

                    <div className="h-full w-full absolute bottom-0 top-0">
                      <Image 
                        src={'/orange-rect-2.png'}
                        alt="poster"
                        width={220}
                        height={220}
                        className="h-full object-cover"
                      />
                    </div>

            
                  </div>
                </div>
            </div>
          )
        : (
            <div className="bg-black min-h-[300px] grid grid-cols-2 relative overflow-hidden dark:border  border-white/70 dark:border-gray-500">
                <div className="p-2 pl-4 lg:pl-12 bg-green-500/50p grid items-center justify-between  text-white ">
                  <div className="w-[90%] flex gap-6 items-center bg-yellow-300p">
                    {
                      tvCard && images && (
                        <TitleImage 
                          card={tvCard} 
                          images={images} 
                          setColorThiefColor={setColorThiefColor}
                        />
                      )
                    }

                    <div className="bg-blue-400p">
                      {
                        seasonImages && videos && (
                          <ThreeImages 
                            imagesToSet={{
                              id: seasonImages.id,
                              backdrops: [],
                              posters: seasonImages.posters,
                              logos: []
                            }} 
                            trailers={videos.results}
                            colorThiefColor={colorThiefColor}
                            disableScaling
                          />
                        )
                      }
                    </div>
                  </div>

                  <p>First aired on {seasonDetails.air_date}</p>
                  <p className="relative">
                    {seasonDetails.episodes.length} Episodes

                    <span 
                      className={`absolute -top-[78%] -left-[20px] bg-green-600p min-w-[300px] translate-x-1/2`}
                    >
                      <More 
                        show_id={seasonDetails.show_id} 
                        fromSaved={true}
                        bgColor={
                          colorThiefColor
                          ? `rgb(${colorThiefColor[0][0]}, ${colorThiefColor[0][1]}, ${colorThiefColor[0][2]})`

                          :getTailwindColorUsingNumber(seasonDetails.show_id)
                        }
                      />
                    </span>
                  </p>
                  <div className={`flex items-center gap-[50px] bg-green-500/30p `}>
                    <span className="flex items-center gap-1">
                      <IoStar color="gold"/> {seasonDetails.vote_average.toFixed(1)}
                    </span>
                    <span className="text-2xl font-bold truncate">
                      {seasonDetails.name.slice(0, 9)}
                    </span>
                    <span>
                    {
                      seasonDetails && (
                        <SaveOrRemoveFromSavedStore 
                          item={seasonToSave} 
                          whatToAlter='season'
                        />
                      )
                    }
                    </span>
                    <span ><BsShare size={25} color='deepskyblue'/></span>
                  </div>

                </div>
                
                <div className="flex justify-end items-center ">
                  <div className="grid grid-flow-col flex-nowrap relative">
                    <Image 
                      src={
                        seasonDetails?.poster_path
                        ? ImagePath + seasonDetails.poster_path : '/no-image-2.webp'
                      }
                      alt="poster"
                      width={220}
                      height={220}
                      className="object-cover "
                    />
                    <Image 
                      src={
                        seasonDetails?.poster_path
                        ? ImagePath + seasonDetails.poster_path : '/no-image-2.webp'
                      }
                      alt="poster"
                      width={220}
                      height={220}
                      className="object-cover "
                    />

                    <div className="h-full w-full absolute bottom-0 top-0">
                      <Image 
                        src={'/cover-rect-2-imgs-11.png'}
                        alt="poster"
                        width={220}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>

            
                  </div>
                </div>
            </div>
          )
      }

      
    </div>
  )
}






/*
 useEffect(() => {
    const container = containerRef.current
    const titleImageWrapper = titleImageWrapperRef.current
    if (!container || !titleImageWrapper) return

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".title-image-wrapper-ref")
      
      if (target === titleImageWrapper) {
        e.stopPropagation()
        setShowVisitShowBtn(prev => !prev)
        return
      }
      setShowVisitShowBtn(false)
    }

    container.addEventListener('click', handleClick)
    titleImageWrapper.addEventListener('click', handleClick)
    
    return () => {
      container.removeEventListener('click', handleClick)
      titleImageWrapper.removeEventListener('click', handleClick)
    }

  }, [containerRef.current, titleImageWrapperRef.current])
*/



export type Images = {
  id: number,
  posters: CommonTypes['Person']['images']['profiles']
}