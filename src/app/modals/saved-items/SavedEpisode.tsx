import { SeasonDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows"
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import Image from "next/image"
import { IoStar } from "react-icons/io5";
import { BsShare } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import getTailwindColorUsingNumber from "@/app/client/helpers/getTailwindColorsUsingNumber";
import { SaveOrRemoveFromSavedStore } from "@/app/(__pages__)/components/save/SaveOrRemoveFromSavedStore";
import { ShowEpisodeCast } from "../card/components/seasons/ShowEpisodeCast";
import { ShowEpisodeCrew } from "../card/components/seasons/ShowEpisodeCrew";
import { calculateRuntime } from "../card/lib/utils";
import { More } from "./More";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import useAllImagesAndVideosStore, { Images, Videos } from "@/app/(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes";
import { TrailerType } from "@/app/lib/types";
import { useEffect, useState } from "react";
import ThreeImages from "../card/components/ThreeImages";
import { steal } from "../card/lib/colorThief";



export default function SavedEpisode({
  episode, 
  forSmallScreen
}: {
  episode: SeasonDetails['episodes'][number]
  forSmallScreen: boolean
}) {

  // const {setIsVisibleAllImages, setIsVisibleAllVideos} = useAllImagesAndVideosStore()

  const [episodeImages, setEpisodeImages] = useState<Images | null>(null)
  const [videos, setVideos] = useState<Videos | null>(null)
  const [colorThiefColor, setColorThiefColor] = useState<number[][]>()

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

  const bg = getTailwindColorUsingNumber(
    episode.show_id+episode.season_number+episode.episode_number
  ).split(' ')


  return (
      !forSmallScreen? (
        <div className={`border border-white/70 dark:border-gray-500 my-20 rounded-2xl overflow-hidden p-2 grid grid-cols-[10fr_2fr] bg-red-500/30p max-h-[400px] relative`}>
          <div className={`absolute inset-0 -z-10 ${bg[0]} opacity-30 dark:opacity-100 dark:opacity-50p bg-red-900p dark:bg-gray-500`} 
          ></div>
          <div className="bg-orange-600p flex">
            <div className="border-r border-white/70 dark:border-gray-500 [@media(max-width:1020px)]:min-w-[250px]p min-w-[400px]p rounded-l-2xl bg-black/80  pr-1 py-2 overflow-hidden flex items-center flex-wrap max-w-[400px]"
            >
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
                className="w-full max-w-[400px] h-auto  object-contain"
              />
              <div className=" grid grid-cols-[70%_20%] gap-[10%] justify-between bg-red-500p px-2 w-full">
                  <More 
                    show_id={episode.show_id} 
                    bgColor={bg[0]}
                  />

                <p className="bg-green-500p whitespace-nowrap flex items-end  justify-end text-4xl w-[50px]p font-bold">
                  <span className="text-2xl mr-1 font-normal">S</span>
                  <span>{episode.season_number}</span>
                </p>
              </div>
            </div>

            <div className="bg-teal-800p h-full pl-8 w-ful grid gap-4 max-[950px]:gap-2">
              <p className=" bg-pink-600p flex items-center gap-4 max-[950px]:flex-wrap max-[950px]:gap-2">
                <span className="text-2xl font-bold underline truncate mr-1 bg-red-500p  [@media(max-width:1130px)]:w-[200px] max-w-[300px] block [@media(max-width:950px)]:w-[300px]"
                >
                  {episode.name}
                </span>
                <span className="max-[950px]:w-1/2">
                  <ShowEpisodeCast episode={episode} />
                </span>
                <span>
                  <ShowEpisodeCrew episode={episode} />
                </span>
              </p>

              <div className="grid gap-4 max-[950px]:flex max-[950px]:items-center max-[950px]:gap-4">
                <div className="grid grid-cols-2 overflow-x-hidden py-3">
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
              </div>

              <p className="font-medium max-w-[500px] max-[950px]:max-w-[400px] max-h-[125px] overflow-y-auto  overflow-hidden">
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
            <p className="text-right">{episode.episode_type.split('_').join(' ')}</p>
          </div>

        </div>

      ) : (
        
        <div className={`bg-orange-600p grid gap-2 mx-auto border dark:border-white  rounded-2xl overflow-hidden my-10 p-2 py-6  max-w-[500px] ${bg[0]} bg-gray-500`}>
          <div className="border-2 w-maxp mx-auto relative border-gray-500">
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
              className="w-full h-auto max-w-[400px] object-cover mx-auto rounded-md border  dark:border-white min-h-[226px]"
            />
            <p className="text-center absolute bottom-0 right-0 border-2 border-gray-500 bg-stone-600/60 p-1">
              <span className=" mr-1 font-normal">S</span>
              <span className="text-2xl">{episode.season_number}</span>
            </p>
          </div>
          <div className="bg-teal-80 h-full p-2">
            <div className="bg-red-800p grid items-center grid-flow-col my-6 border-b  dark:border-white pb-1">
              <p className="text-2xl font-bold max-h-[70px] overflow-hidden overflow-y-auto">{episode.name}</p>
              <p className="flex items-end gap-4 justify-end bg-red-400p">
                <span className="italic text-xs pb-1 -mr-3">Episode</span>
                <span className="text-3xl font-bold">{episode.episode_number}</span>
              </p>
            </div>
            <More  
              show_id={episode.show_id} 
              bgColor={bg[0]} 
            />
          <div className="bg-teal-800p my-4 pb-4">
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



