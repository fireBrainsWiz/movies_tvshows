import { SeasonDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows"
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import Image from "next/image"
import { IoStar } from "react-icons/io5";
import { BsShare } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { calculateRuntime } from "../../lib/utils";
import lightOrDark from "@/app/client/helpers/lightOrDark";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
import getColor from "@/app/client/helpers/getColor";
import getTailwindColorUsingNumber from "@/app/client/helpers/getTailwindColorsUsingNumber";
import { ShowEpisodeCast } from "./ShowEpisodeCast";
import { ShowEpisodeCrew } from "./ShowEpisodeCrew";
import { SaveOrRemoveFromSavedStore } from "@/app/(__pages__)/components/save/SaveOrRemoveFromSavedStore";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { TrailerType } from "@/app/lib/types";
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes";
import useAllImagesAndVideosStore, { Images, Videos } from "@/app/(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";
import ThreeImages from "../ThreeImages";
import { steal } from "../../lib/colorThief";
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";



export default function Episode({
  episode, 
  forSmallScreen
}: {
  episode: SeasonDetails['episodes'][number]
  forSmallScreen: boolean
}) {
  // const {images, setImages} = useContext(MoviesOrTVshowsInfoContext)!

  const {
    setIsVisibleAllImages, 
    setIsVisibleAllVideos
  } = useAllImagesAndVideosStore()

  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageColor, setImageColor] = useState('')
  const [episodeImages, setEpisodeImages] = useState<Images | null>(null)
  const [videos, setVideos] = useState<Videos | null>(null)
  const [colorThiefColor, setColorThiefColor] = useState<number[][]>()

  // console.log({episode})

  useEffect(() => {
    ;(async ()=>{
      try {
        const images: Images = await axios(
          `https://api.themoviedb.org/3/tv/${episode.show_id}/season/${episode.season_number}/episode/${episode.episode_number}/images`,
          TMDBOptions
        ).then(res => res.data)

        const videos: Videos = await axios(
          `https://api.themoviedb.org/3/tv/${episode.show_id}/season/${episode.season_number}/episode/${episode.episode_number}/videos?language=en-US`,
          TMDBOptions
        ).then(res => res.data)

        setVideos(videos)
        setEpisodeImages(images)

      } catch (error) {
        console.log(error)
      }

    })()

  }, [episode])

   //getAllImages
  // const setImagesToAllImages = useCallback(() => {
  //   if (!episodeImages) return

  //   const imgs = {
  //     id: episodeImages.id,
  //     backdrops: episodeImages.stills,
  //     posters: [],
  //     logos: []
  //   }

  //   setImages(imgs)

  // }, [episodeImages])


  const bg = getTailwindColorUsingNumber(
    episode.show_id+episode.season_number+episode.episode_number
  ).split(' ')

  return (
      !forSmallScreen? (
        <div className={`border border-white/70 dark:border-gray-500 my-20 rounded-2xl overflow-hidden p-2 grid grid-cols-[10fr_2fr] bg-red-500/30p max-h-[400px] relative`}>
          <div className={`absolute inset-0 -z-10 ${bg[0]}p  bg-gray-500 opacity-50`} 
          ></div>
          <div className="bg-orange-600p flex gap-2p ">
          <div className="border-r border-white/70 dark:border-gray-500 [@media(max-width:1020px)]:min-w-[250px] min-w-[400px] rounded-l-2xl bg-black/80 flex justify-center items-center pr-1"
            >
              <Image 
                ref={imageRef}
                src={episode.still_path? ImagePath + episode.still_path : '/no-image-2.webp'}
                alt="episode image"
                width={400} 
                height={400}
                placeholder="blur"
                blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
                onLoad={ e => {
                  if (e.target) {
                    setColorThiefColor(steal(e.target))
                  }
                }}
                className="w-full max-w-[400px] h-auto object-contain"
              />
            </div>

            <div className="bg-teal-800p h-full pl-8 w-ful grid gap-4">
              <p className=" bg-pink-600p flex items-center gap-4">
                <span className="text-2xl font-bold underline truncate mr-1 bg-red-500p  [@media(min-width:1130px)]:w-[200px]p w-[215px]">
                  {episode.name}
                </span>
                <ShowEpisodeCast episode={episode} />
                <ShowEpisodeCrew episode={episode} />
              </p>
              <div className="grid grid-cols-2 overflow-x-hidden py-3 bg-blue-500p">
                <div>
                  <p className="flex items-center gap-4 py-2">
                    <span><IoStar color="gold" size={25}/></span>
                    <span>{episode.vote_average.toFixed(1)}</span>
                  </p>
                  <p className="flex items-center gap-4 py-2">
                    <span><IoIosStats size={25} color='lime'/></span>
                    <span>{episode.vote_count}</span>
                  </p>
                  <p className="flex items-center gap-4 py-2">
                    <span><IoTimeOutline size={25} color='deepskyblue'/></span>
                    <span>{calculateRuntime(episode.runtime)}</span>
                  </p>
                </div>
                <div>
                  {
                    episodeImages && videos && (
                      <ThreeImages 
                        imagesToSet={{
                          id: episodeImages.id,
                          backdrops: episodeImages.stills,
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
              <p className=" font-medium max-w-[500px] max-h-[125px] overflow-y-auto  overflow-hidden">
                {episode.overview}
              </p>
            </div>
          </div>
          <div className="bg-green-500/30p h-full w-full pr-2 grid gap-4">
            <p className="flex items-end gap-4 justify-end  h-min pt-2">
            <span className="italic">Episode</span>
            <span className="text-3xl font-bold">{episode.episode_number}</span>
            </p>
            <div className="flex justify-end h-min">
              <SaveOrRemoveFromSavedStore 
                item={episode} 
                whatToAlter='episode'
              />
            </div>
            <p className="flex justify-end"><BsShare size={25} color='deepskyblue'/></p>
            <p className="text-right">{episode.air_date}</p>
            <p className="text-right">
              {
                episode.episode_type.split('_').join(' ')
              }
            </p>
          </div>

        </div>

      ) : (
        
        <div className={`bg-orange-600p grid gap-2 mx-auto border dark:border-white  rounded-2xl overflow-hidden my-10 p-2 py-6 max-w-[500px] $${bg[0]}p bg-gray-500`}>
          <Image 
            src={episode.still_path? ImagePath + episode.still_path : '/no-image-2.webp'}
            alt="episode image"
            width={400} 
            height={400}
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            onLoad={ e => {
              if (e.target) {
                setColorThiefColor(steal(e.target))
              }
            }}
            className="w-full max-w-[400px] h-auto object-cover mx-auto rounded-md border  dark:border-white"
          />

          <div className="bg-teal-800p h-full p-2">
            <div className="bg-red-800p grid items-center grid-flow-col my-6 border-b  dark:border-white pb-1">
              <p className="text-2xl font-bold max-h-[70px] overflow-hidden overflow-y-auto">{episode.name}</p>
              <p className="flex items-end gap-4 justify-end bg-red-400p">
                <span className="italic text-xs pb-1 -mr-3">Episode</span>
                <span className="text-3xl font-bold">{episode.episode_number}</span>
              </p>
            </div>
            <div className="my-4 pb-4">
              <div className="flex items-center justify-center gap-10 bg-lime-300p mb-6">
                <p className="flex items-center gap-1">
                  <span><IoStar color="gold" size={25}/></span>
                  <span>{episode.vote_average.toFixed(1)}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span><IoIosStats size={25} color='lime'/></span>
                  <span>{episode.vote_count}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span><IoTimeOutline size={25} color='deepskyblue'/></span>
                  <span>{calculateRuntime(episode.runtime)}</span>
                </p>
              </div>
              <div className="max-w-max mx-auto">
                {
                  episodeImages && videos && (
                    <ThreeImages 
                      imagesToSet={{
                        id: episodeImages.id,
                        backdrops: episodeImages.stills,
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

            <p className="font-medium max-w-[500px] max-h-[200px] overflow-auto bg-lime-600p mx-auto my-6">
              {episode.overview}
            </p>
            <p className="flex items-center justify-between my-6">
              <ShowEpisodeCast episode={episode} />
              <ShowEpisodeCrew episode={episode} />
            </p>
            <p className="flex items-center justify-between my-6">
              <span>{episode.episode_type.split('_').join(' ')}</span>
              <span>{episode.air_date}</span>
            </p>
            <div className="grid items-center justify-between grid-flow-col mt-6">
              <SaveOrRemoveFromSavedStore 
                item={episode} 
                whatToAlter='episode'
              />
              <button><BsShare size={25} color='deepskyblue'/></button>
            </div>
          </div>
        </div>
      )
    
  )
}


