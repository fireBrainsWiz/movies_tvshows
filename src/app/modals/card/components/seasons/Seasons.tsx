'use client'

import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store";
import { TfiClose } from "react-icons/tfi";
import { ImagePath } from "@/app/lib/types";
import Image from "next/image";
import TitleImage from "../TitleImage";
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";
import { useContext, useEffect, useRef, useState } from "react";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";
import { IoStar } from "react-icons/io5";
import { BsShare } from "react-icons/bs";
import ShowSelectSeason from "./ShowSelectSeason";
import Episodes from "./Episodes";
import { SaveOrRemoveFromSavedStore } from "@/app/(__pages__)/components/save/SaveOrRemoveFromSavedStore";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import useAllImagesAndVideosStore, { Videos } from "@/app/(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes";
import ThreeImages from "../ThreeImages";
import { HiMiniArrowLongUp } from "react-icons/hi2";



export default function Seasons() {

  const imageRef = useRef<HTMLImageElement | null>(null)

  // const {addToSavedSeasons, removeFromSavedSeasons} = useSavedStorePersist()
  const {titleImageImages} = useAllImagesAndVideosStore()

  const {
    isVisibleSeasons, setIsVisibleSeasons, selectedSeason,
    seasonDetails
  } = useSeasonsStore()

  const { details} = useContext(MoviesOrTVshowsInfoContext)!
  const {card} = useContext(CardBeingViewedContext)

  const [forSmallScreen, setForSmallScreen] = useState(false)
  const [seasonImages, setSeasonImages] = useState<Images | null>(null)
  const [videos, setVideos] = useState<Videos | null>(null)
  const [colorThiefColor, setColorThiefColor] = useState<number[][]>()

  const scrollElemRef = useRef<HTMLDivElement | null>(null)
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false)


  function handleCloseAllImagesClick() {
    setIsVisibleSeasons(false)
  }

  function scrollToTp() {
    const scrollElem = scrollElemRef.current
    if (!scrollElem) return

    // scrollElem.scrollTop = 0; 
    scrollElem.scrollTo ({top: 0, left: 0, behavior: 'smooth'}); 
  }



  const seasonToSave = selectedSeason && card?.id 
    ? {...selectedSeason, show_id: card.id} 
    : null
  ; 

  //media query
  useEffect(() => {
    let mediaQuery = window.matchMedia(`(min-width: 874px)`)//md
    
    function my() {
      if (mediaQuery.matches) {
        setForSmallScreen(false)
      } else {
        setForSmallScreen(true)
      }
    }
    my()

    mediaQuery.addEventListener('change', my)
    return () => mediaQuery.addEventListener('change', my)
  }, [])


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

  }, [seasonDetails])


  useEffect(() => {
    const scrollElem = scrollElemRef.current
    if (!scrollElem) return

    const handleScroll = () => {
      setShowScrollToTopBtn(scrollElem.scrollTop > 300)
    }

    scrollElem.addEventListener('scroll', handleScroll)
    return () => scrollElem.removeEventListener('scroll', handleScroll)

  }, [scrollElemRef.current])


  return (
    <section ref={scrollElemRef}
      className={`bg-stone-700 absolute w-full h-screen top-0 z-20 ${isVisibleSeasons ? 'left-0' : 'left-[-100%]'} overflow-y-auto mb-4 pb-[50px]`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseAllImagesClick}>
          <TfiClose title="close button"/>
        </button>
      </div>


      {
        selectedSeason && (
          <div className="px-4" >
        {
            forSmallScreen 
            ? (
                <div className="bg-black min-h-[300px] flex [@media(max-width:600px)]:flex-wrap-reverse justify-between">
                    <div className="p-2 bg-amber-500/50p grid [@media(max-width:600px)]:gap-y-2 items-center  text-white ">
                      <div className="bg-red-500/30p w-[50%]">
                        {
                          titleImageImages && (
                            <TitleImage card={card} images={titleImageImages} />
                          )
                        }
                      </div>

                      <div className="grid grid-flow-col items-center gap-10 bg-red-500p">
                        <div className="bg-green-400p gridp items-centerp">
                          <p className="py-4">First aired on {selectedSeason.air_date}</p>
                          <p className="py-4">{selectedSeason.episode_count} Episodes</p>
                        </div>
                        <div className="bg-blue-400p">
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

                      <div className="flex items-center justify-between max-[500px]:flex-wrap gap-10">
                        <span className="flex items-center gap-1">
                          <IoStar color="gold"/> {selectedSeason.vote_average.toFixed(1)}
                        </span>
                        <span className="text-2xl font-bold truncate">
                          {selectedSeason.name.slice(0, 9)}
                          </span>
                        <span className="max-[500px]:w-1/2">
                          {
                            seasonToSave && (
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
                          ref={imageRef}
                          src={
                            selectedSeason?.poster_path
                            ? ImagePath + selectedSeason.poster_path : '/no-image-2.webp'
                          }
                          alt="poster"
                          width={220}
                          height={220}
                          className="object-cover"
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
                <div className="bg-black min-h-[300px] grid grid-cols-2 ">
                    <div className="p-2 pl-4 lg:pl-12 bg-green-500/50p grid items-center justify-between  text-white ">
                      <div className="bg-red-500/30p w-[70%]">
                      {
                        titleImageImages && (
                          <TitleImage card={card} images={titleImageImages} />
                        )
                      }
                      </div>

                      <div className="grid grid-flow-col items-center gap-10 bg-red-500p pb-6">
                        <div className="bg-green-400p gridp items-centerp">
                          <p className="py-4">First aired on {selectedSeason.air_date}</p>
                          <p className="py-4">{selectedSeason.episode_count} Episodes</p>
                        </div>
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

                      <div className={`flex items-center gap-[50px] bg-green-500/30p `}>
                        <span className="flex items-center gap-1">
                          <IoStar color="gold"/> {selectedSeason.vote_average.toFixed(1)}
                        </span>
                        <span className="text-2xl font-bold truncate">
                          {selectedSeason.name.slice(0, 9)}
                          </span>
                        <span>
                        {
                          seasonToSave && (
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
                    
                    <div className="flex justify-end items-center ">
                      <div className="grid grid-flow-col flex-nowrap relative">
                        <Image 
                          ref={imageRef}
                          src={
                            selectedSeason?.poster_path
                            ? ImagePath + selectedSeason.poster_path : '/no-image-2.webp'
                          }
                          alt="poster"
                          width={220}
                          height={220}
                          className="object-cover "
                        />
                        <Image 
                          ref={imageRef}
                          src={
                            selectedSeason?.poster_path 
                            ? ImagePath + selectedSeason.poster_path : '/no-image-2.webp'
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


            {
              'seasons' in details && details.seasons?.[0]?.id && (
                <div className="bg-stone-700 flex justify-end p-2 border-t border-r mt-2">
                  <ShowSelectSeason  />
                </div>
              )
            }

            <div>
              <p className="my-4 font-bold max-w-[600px] max-h-[300px] overflow-hidden overflow-y-auto">
                {details.overview}
              </p>
            </div> 

            <Episodes forSmallScreen={forSmallScreen}/>

          </div>
        )
        }

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


export type Images = {
  id: number,
  posters: CommonTypes['Person']['images']['profiles']
}
