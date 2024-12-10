
import Image from "next/image"
import Link from "next/link"
import { MovieRecommendations } from "@/app/lib/MoviesOrTVshowsInfoContextType_movies"
import { TVshowsRecommendations } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows"
import { useContext, useState, useEffect, useRef } from "react"
import MoviesOrTVshowsLinksContext from "../context/MoviesOrTVshowsLinksContext"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { ImagePath } from "@/app/lib/types"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { getFirstXItems } from "@/app/modals/card/lib/utils"
import useImagePixel from "../hooks/useImagePixel"


export default function BelowTheHeader() {

  const {moviesOrTVshows} = useContext(MoviesOrTVshowsLinksContext)
  

  const [nowPlayingMovieOrAiringTodayTVshow, setNowPlayingMovieOrAiringTodayTVshow] = useState<NowPlayingMovie | AiringTodayTVshow | null>(null)
  
  useEffect(() => {
    const getData = async () => {
      try {
        
        const nowPlayingMovieOrAiringTodayTVshow: NowPlayingMovie | AiringTodayTVshow = await axios(`https://api.themoviedb.org/3/${
          moviesOrTVshows === 'tvshow' ?'tv/airing_today' :'movie/now_playing'
        }?language=en-US&page=1`, TMDBOptions).then(res => res.data)

        setNowPlayingMovieOrAiringTodayTVshow(nowPlayingMovieOrAiringTodayTVshow)
        
      } catch (error) {
        console.log(error)
      } 
    }
    getData()
  }, [moviesOrTVshows])

  
  return (
    <div className="bg-neutral-800 my-10 py-2">
        {
          nowPlayingMovieOrAiringTodayTVshow && (
            <>
              <Upper 
                nowPlayingMovieOrAiringTodayTVshow={nowPlayingMovieOrAiringTodayTVshow} 
                moviesOrTVshows={moviesOrTVshows}
              />
              <Lower 
                nowPlayingMovieOrAiringTodayTVshow={nowPlayingMovieOrAiringTodayTVshow}
                moviesOrTVshows={moviesOrTVshows}
              />
            </>
          )
        }
    </div>
  )
}



function Upper({
  nowPlayingMovieOrAiringTodayTVshow,
  moviesOrTVshows,
}: {
  nowPlayingMovieOrAiringTodayTVshow: NowPlayingMovie | AiringTodayTVshow
  moviesOrTVshows: 'movie' | 'tvshow'
}) {

const imageRef4 = useRef<HTMLImageElement | null>(null)
const imageRef5 = useRef<HTMLImageElement | null>(null)

const bestTVsOrMovies = getBestTVsOrMovies(
  nowPlayingMovieOrAiringTodayTVshow, {
    begin: 9, 
    end: 15
  }
)

const [bestTVsOrMoviesDetails, setBestTVsOrMoviesDetails] = 
useState<{[id: number]:MediaTypeInfoType['details']} | null>(null)

const [credits, setCredits] =
useState<{[id: number]: MediaTypeInfoType['credits']} | null>(null)

const [backdropImageColor4, setBackdropImageColor4] = useState('')
const [backdropImageColor5, setBackdropImageColor5] = useState('')


useImagePixel({
  backdrop_path: bestTVsOrMovies[4].backdrop_path,
  imageRef: imageRef4,
  setColor: setBackdropImageColor4,
  where: 10
})
useImagePixel({
  backdrop_path: bestTVsOrMovies[5].backdrop_path,
  imageRef: imageRef5,
  setColor: setBackdropImageColor5,
  where: 10
})


useEffect(() => {
  const tempDetails: typeof bestTVsOrMoviesDetails = {}
  const tempCredits: typeof credits = {}

  const getData = async (card: typeof bestTVsOrMovies[number]) => {
    const detailsLink = moviesOrTVshows === 'tvshow' 
    ? `https://api.themoviedb.org/3/tv/${card.id}?language=en-US`
    : `https://api.themoviedb.org/3/movie/${card.id}?language=en-US`

    const creditsLink = moviesOrTVshows === 'tvshow' 
    ? `https://api.themoviedb.org/3/tv/${card.id}/credits?language=en-US`
    : `https://api.themoviedb.org/3/movie/${card.id}/credits?language=en-US`
    
    try {
      const bestTVsOrMoviesDetails:  MediaTypeInfoType['details'] = 
      await axios(detailsLink, TMDBOptions).then(res => res.data)

      const credits: MediaTypeInfoType['credits'] = 
      await axios(creditsLink, TMDBOptions).then(res => res.data)

      tempCredits[card.id] = credits
      tempDetails[card.id] = bestTVsOrMoviesDetails

    } catch (error) {
      console.log(11)

      console.log(error)
    } finally {

      if (Object.keys(tempDetails).length === Object.keys(bestTVsOrMovies).length && Object.keys(bestTVsOrMovies).length === Object.keys(tempCredits).length ) {

        setCredits({...tempCredits})
        setBestTVsOrMoviesDetails({...tempDetails})
      }
    }
  } 

  bestTVsOrMovies.forEach((card, i) => {
    // console.log(card)
    getData(card);

    if (i === 2 || i === 3) {
        // console.log('zaa')
      }
    })

}, [ bestTVsOrMovies?.[0]?.id])


const indexOf2 = bestTVsOrMoviesDetails
? bestTVsOrMoviesDetails[bestTVsOrMovies[2].id] : null

const indexOf3 = bestTVsOrMoviesDetails
? bestTVsOrMoviesDetails[bestTVsOrMovies[3].id] : null


  return (
    <svg width="100%" height="100%" viewBox="0 0 1246 343" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="border-y border-gray-500"
    >

    <foreignObject x="0" y="0" width="100%" height="100%" className="bg-amber-500p">

    <div className=" bg-red-500p grid grid-cols-[40%_40%_20%] gap-1p justify-between min-h-[50vmin]p px-2 w-full">

      <div className="grid grid-cols-2">
        <div className="bg-green-200p relative">
        <Link href={
          encodeURLString(`/card?title=${
          'title' in bestTVsOrMovies[0] && bestTVsOrMovies[0].title ||
          'name' in bestTVsOrMovies[0] && bestTVsOrMovies[0].name || 'unknown'}&id=${bestTVsOrMovies[0].id}`)
          }>
            <Image src={
              bestTVsOrMovies[0].poster_path ? 
              ImagePath + bestTVsOrMovies[0].poster_path : '/header/upper-0.png'
            } 
            alt={'title' in bestTVsOrMovies[0] && bestTVsOrMovies[0].title ||
            'name' in bestTVsOrMovies[0] && bestTVsOrMovies[0].name || 'unknown'}
            width={708} height={1029} 
          />
          </Link>
          {
            !( bestTVsOrMovies[0].poster_path) && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white  text-center w-full">
                {
                  'title' in bestTVsOrMovies[0] && bestTVsOrMovies[0].title ||
                  'name' in bestTVsOrMovies[0] && bestTVsOrMovies[0].name || 'unknown'
                }
            </p>
            )
          }
        </div>
        <div className="bg-green-400p relative">
          <Link href={
            encodeURLString(`/card?title=${
              'title' in bestTVsOrMovies[1] && bestTVsOrMovies[1].title ||
              'name' in bestTVsOrMovies[1] && bestTVsOrMovies[1].name || 'unknown'}&id=${bestTVsOrMovies[1].id}`)
          }>
            <Image src={
              bestTVsOrMovies[1].poster_path ? 
              ImagePath + bestTVsOrMovies[1].poster_path : '/header/upper-0.png'
            } 
            alt={'title' in bestTVsOrMovies[1] && bestTVsOrMovies[1].title ||
            'name' in bestTVsOrMovies[1] && bestTVsOrMovies[1].name || 'unknown'
          }
            width={708} height={1029} 
          />
          </Link>
          {
            !(bestTVsOrMovies[1].poster_path) && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white  text-center w-full">
                {
                  'title' in bestTVsOrMovies[1] && bestTVsOrMovies[1].title ||
                  'name' in bestTVsOrMovies[1] && bestTVsOrMovies[1].name || 'unknown'
                }
            </p>
            )
          }
        </div>
      </div>
      
      <div className="ml-4 bg-red-400p">
        <div className="bg-green-200p overflow-hidden grid grid-cols-[70%_28%] gap-3 h-[42%] mb-4 border-b border-gray-500 pr-[25px] ">
          <div className="bg-rose-500p h-[98%] overflow-hidden">
            <Link href={
                encodeURLString(`/card?title=${
                  'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
                  'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'}&id=${bestTVsOrMovies[2].id}`
                )
              } 
              className="h-full"
            >
              <Image src={
                bestTVsOrMovies[2].backdrop_path ? 
                ImagePath + bestTVsOrMovies[2].backdrop_path : '/header/upper-2.png'
              } 
              alt={'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
                'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'
            } 
              className="w-[100%] h-full "
              width={882} height={496.13} />
            </Link>
          </div>
          <div className="bg-rose-600p ">
            <Link href={
                encodeURLString(`/card?title=${
                  'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
                  'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'}&id=${bestTVsOrMovies[2].id}`
                )
              } 
            >
            <div className="w-full h-fullp bg-green-800p h-[89.8%] ">
              <p className="font-black text-lg truncate">
                {
                  'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
                  'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'
                }
              </p>
              <p className="text-sm mt-[6px] font-bold truncate">
                {
                  indexOf2 && 'seasons' in indexOf2 && indexOf2.seasons[0] && 'Season ' + indexOf2.seasons[indexOf2.seasons.length - 1].season_number
                }
              </p>
              <div className="mt-[6px] bg-red-500p">
                {
                  indexOf2 && credits && ('cast' in credits[indexOf2.id]) && !('cast_id' in credits[indexOf2.id].cast[0]) && ( 
                    <>
                      <p className="text-sm truncate">Starring:</p>
                      {
                        getFirstXItems(credits[indexOf2.id].cast, 3).map((castItem, index) => (
                          <p key={index} className="text-xs pl-4 flex items-center py-1">
                            <Image 
                              src={ImagePath + castItem.profile_path} 
                              alt={castItem.name} 
                              width={50} 
                              height={50} 
                              className="rounded-full w-[20px] h-[20px] object-cover"
                            />
                            <span className="truncate ml-1">
                              {castItem.name}
                            </span>
                          </p>
                        ))
                      }
                    </>
                  )
                }

                {
                  indexOf2 && credits && ('cast' in credits[indexOf2.id]) && ('cast_id' in credits[indexOf2.id].cast[0]) && (
                    <>
                      <p className="text-sm truncate">Starring:</p>
                      {
                        getFirstXItems(credits[indexOf2.id].cast, 3).map((castItem, index) => (
                          <p key={index} className="text-xs pl-4 flex items-center py-1">
                            <Image 
                              src={ImagePath + castItem.profile_path} 
                              alt={castItem.name} 
                              width={50} 
                              height={50} 
                              className="rounded-full w-[20px] h-[20px] object-cover"
                            />
                            <span className="truncate ml-1">
                              {castItem.name}
                            </span>
                          </p>
                        ))
                      }
                    </>
                  )
                }
              </div>

            </div>
          </Link>
          </div>
        </div>

        <div className="bg-green-200p overflow-hidden grid grid-cols-[70%_28%] gap-3 h-[42%] mb-4  pr-[25px]">
          <div className="bg-rose-200p h-[90%]p ">
          <Link href={
            encodeURLString(`/card?title=${
              'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
              'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'}&id=${bestTVsOrMovies[3].id}`)
          }>
            <Image src={
              bestTVsOrMovies[3].backdrop_path ? 
              ImagePath + bestTVsOrMovies[3].backdrop_path : '/header/upper-2.png'
            } 
            alt={'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
              'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'
            }
            className="w-[100%] h-full"
            width={882} height={496.13} />
          </Link>
          </div>
          <div className="w-full h-fullp bg-green-800p h-[89.8%] pr-[25px]">
            <Link
              href={
                encodeURLString(`/card?title=${
                  'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
                  'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'}&id=${bestTVsOrMovies[3].id}`)
              }
            >
              <p className="font-black text-lg truncate">
                {
                  'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
                  'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'
                }
              </p>
              <p className="text-sm mt-[6px] font-bold truncate">
                {
                  indexOf3 && 'seasons' in indexOf3 && indexOf3.seasons[0] && 'Season ' + indexOf3.seasons[indexOf3.seasons.length - 1].season_number
                }
              </p>
              <div className="mt-[6px] bg-red-500p">
                {
                  indexOf3 && credits && ('cast' in credits[indexOf3.id]) && !('cast_id' in credits[indexOf3.id].cast[0]) && (
                    <>
                      <p className="text-sm truncate">Starring:</p>
                      {
                        getFirstXItems(credits[indexOf3.id].cast, 3).map((castItem, index) => (
                          <p key={index} className="text-xs pl-4 flex items-center py-1">
                            <Image 
                              src={ImagePath + castItem.profile_path} 
                              alt={castItem.name} 
                              width={50} 
                              height={50} 
                              className="rounded-full w-[20px] h-[20px] object-cover"
                            />
                            <span className="truncate ml-1">
                              {castItem.name}
                            </span>
                          </p>
                        ))
                      }
                    </>
                  )
                }

                {
                  indexOf3 && credits && ('cast' in credits[indexOf3.id]) && ('cast_id' in credits[indexOf3.id].cast[0]) && (
                    <>
                      <p className="text-sm truncate">Starring:</p>
                      {
                        getFirstXItems(credits[indexOf3.id].cast, 3).map((castItem, index) => (
                          <p key={index} className="text-xs pl-4 flex items-center py-1">
                            <Image 
                              src={ImagePath + castItem.profile_path} 
                              alt={castItem.name} 
                              width={50} 
                              height={50} 
                              className="rounded-full w-[20px] h-[20px] object-cover"
                            />
                            <span className="truncate ml-1">
                              {castItem.name}
                            </span>
                          </p>
                        ))
                      }
                    </>
                  )
                }
              </div>
            </Link>

              

            </div>
        </div>
      </div>

      <div className="grid grid-rows-2 gap-4 bg-blue-500p border-l border-gray-500 pl-[1px]">
        <div className="bg-green-200p h-[87.3%]">
          <Link href={
            encodeURLString(`/card?title=${
              'title' in bestTVsOrMovies[4] && bestTVsOrMovies[4].title ||
              'name' in bestTVsOrMovies[4] && bestTVsOrMovies[4].name || 'unknown'}&id=${bestTVsOrMovies[4].id}`)
          }
            className="grid"
          >
            <Image 
              ref={imageRef4}
              src={
                bestTVsOrMovies[4].backdrop_path ? 
                ImagePath + bestTVsOrMovies[4].backdrop_path : '/header/upper-4.png'
              } 
              alt={
                'title' in bestTVsOrMovies[4] && bestTVsOrMovies[4].title ||  
                'name' in bestTVsOrMovies[4] && bestTVsOrMovies[4].name || 'unknown'
              }
              className="w-full h-full object-contain"
              width={708} height={483} 
            />
          <p className="text-sm relative truncate bg-blue-500p h-[25.6px] text-center overflow-hidden isolate">
            <span className="absolute inset-0 -z-10 bg-red-500p overflow-hidden opacity-10"
              style={{background: backdropImageColor4}}
            >
            </span>
            {
              'title' in bestTVsOrMovies[4] && bestTVsOrMovies[4].title ||  
              'name' in bestTVsOrMovies[4] && bestTVsOrMovies[4].name || 'unknown'
            }
          </p>
          </Link>
        </div>
        <div className="bg-green-600p h-[90.3%] -mt-[9%]">
          <Link 
            href={
            encodeURLString(`/card?title=${
              'title' in bestTVsOrMovies[5] && bestTVsOrMovies[5].title ||
              'name' in bestTVsOrMovies[5] && bestTVsOrMovies[5].name || 'unknown'}&id=${bestTVsOrMovies[5].id}`)
            }
            className="grid"
          >
            <Image 
              ref={imageRef5}
              src={
                bestTVsOrMovies[5].backdrop_path ? 
                ImagePath + bestTVsOrMovies[5].backdrop_path : '/header/upper-4.png'
              } 
            alt={
              'title' in bestTVsOrMovies[5] && bestTVsOrMovies[5].title ||  
              'name' in bestTVsOrMovies[5] && bestTVsOrMovies[5].name || 'unknown'
            }
            className="w-full h-full object-contain"
            width={708} height={483} />
          <p className="text-sm relative truncate h-[25.6px] text-center overflow-hidden isolate">
            <span className="absolute inset-0 -z-10 overflow-hidden opacity-10"
              style={{background: backdropImageColor5}}
            >
            </span>
            {
              'title' in bestTVsOrMovies[5] && bestTVsOrMovies[5].title ||  
              'name' in bestTVsOrMovies[5] && bestTVsOrMovies[5].name || 'unknown'
            }
          </p>
          </Link>
        </div>
      </div>
    </div>

    </foreignObject>
    
    </svg>
    
  )
}


function Lower({
  nowPlayingMovieOrAiringTodayTVshow,
  moviesOrTVshows,
}: {
  nowPlayingMovieOrAiringTodayTVshow: NowPlayingMovie | AiringTodayTVshow
  moviesOrTVshows: 'movie' | 'tvshow'
}) {

  const bestTVsOrMovies = getBestTVsOrMovies(
    nowPlayingMovieOrAiringTodayTVshow,
    {
      begin: 15,
      end: 20
    }
  )

  const [bestTVsOrMoviesDetails, setBestTVsOrMoviesDetails] = 
  useState<{[id: number]:MediaTypeInfoType['details']} | null>(null)

  const [credits, setCredits] =
  useState<{[id: number]: MediaTypeInfoType['credits']} | null>(null)


  useEffect(() => {
    const tempDetails: typeof bestTVsOrMoviesDetails = {}
    const tempCredits: typeof credits = {}

    const getData = async (card: typeof bestTVsOrMovies[number]) => {
      const detailsLink = moviesOrTVshows === 'tvshow' 
      ? `https://api.themoviedb.org/3/tv/${card.id}?language=en-US`
      : `https://api.themoviedb.org/3/movie/${card.id}?language=en-US`

      const creditsLink = moviesOrTVshows === 'tvshow' 
      ? `https://api.themoviedb.org/3/tv/${card.id}/credits?language=en-US`
      : `https://api.themoviedb.org/3/movie/${card.id}/credits?language=en-US`
      
      try {
        const bestTVsOrMoviesDetails:  MediaTypeInfoType['details'] = 
        await axios(detailsLink, TMDBOptions).then(res => res.data)

        const credits: MediaTypeInfoType['credits'] = 
        await axios(creditsLink, TMDBOptions).then(res => res.data)

        tempCredits[card.id] = credits
        tempDetails[card.id] = bestTVsOrMoviesDetails

      } catch (error) {
        console.log(error)
      } finally {

        if (Object.keys(tempDetails).length === Object.keys(bestTVsOrMovies).length && Object.keys(bestTVsOrMovies).length === Object.keys(tempCredits).length ) {
          // console.log('done--------------------------------------------')

          setCredits({...tempCredits})
          setBestTVsOrMoviesDetails({...tempDetails})
        }
      }
    } 

    bestTVsOrMovies.forEach((card, i) => getData(card) )

  }, [bestTVsOrMovies?.[0]?.id])


  return (
    <svg width="100%" height="10%" viewBox="0 0 1246 170" fill="blue" xmlns="http://www.w3.org/2000/svg" className="mt-9">

    <foreignObject x="0" y="0" width="100%" height="100%" className="bg-amber-500p">

    <div className=" bg-red-500p grid grid-cols-4 gap-[1px] content-center px-2 w-full h-full overflow-hidden">
      <div className="relative">
        <Link href={
          encodeURLString(`/card?title=${
            'title' in bestTVsOrMovies[0] && bestTVsOrMovies[0].title ||
            'name' in bestTVsOrMovies[0] && bestTVsOrMovies[0].name || 'unknown'}&id=${bestTVsOrMovies[0].id}`
          )
        }>
          <Image 
            src={
              bestTVsOrMovies[0].backdrop_path ? 
              ImagePath + bestTVsOrMovies[0].backdrop_path : '/header/blur-1.png'
            } 
            alt={
              'title' in bestTVsOrMovies[0] && bestTVsOrMovies[0].title ||
              'name' in bestTVsOrMovies[0] && bestTVsOrMovies[0].name || 'unknown'
            } 
            className="rounded-l-md"
            width={930} height={495} 
          />
        </Link>
        <p className="absolute bottom-1 text-xs text-white truncate text-center w-full">
            {
              'title' in bestTVsOrMovies[0] && bestTVsOrMovies[0].title ||
              'name' in bestTVsOrMovies[0] && bestTVsOrMovies[0].name || 'unknown'
            }
        </p>
      </div>
      <div className="relative">
        <Link href={
          encodeURLString(`/card?title=${
            'title' in bestTVsOrMovies[1] && bestTVsOrMovies[1].title ||
            'name' in bestTVsOrMovies[1] && bestTVsOrMovies[1].name || 'unknown'}&id=${bestTVsOrMovies[1].id}`
          )
        }>
          <Image src={
            bestTVsOrMovies[1].backdrop_path ? 
            ImagePath + bestTVsOrMovies[1].backdrop_path : '/header/blur-1.png'
          } 
          alt={
            'title' in bestTVsOrMovies[1] && bestTVsOrMovies[1].title ||
            'name' in bestTVsOrMovies[1] && bestTVsOrMovies[1].name || 'unknown'
          }
          className="w-full h-auto"
          width={930} height={495} />
        </Link>
        <p className="absolute bottom-1 text-xs text-white truncate text-center w-full">
            {
              'title' in bestTVsOrMovies[1] && bestTVsOrMovies[1].title ||
              'name' in bestTVsOrMovies[1] && bestTVsOrMovies[1].name || 'unknown'
            }
        </p>
      </div>
    
      <div className="relative">
        <Link href={
          encodeURLString(`/card?title=${
            'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
            'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'}&id=${bestTVsOrMovies[2].id}`
          )
        }>
          <Image src={
            bestTVsOrMovies[2].backdrop_path ? 
            ImagePath + bestTVsOrMovies[2].backdrop_path : '/header/blur-1.png'
          } 
          alt={
            'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
            'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'
          }
          className="rounded-r-mdp"
          width={930} height={495} />
        </Link>
        <p className="absolute bottom-1 text-xs text-white truncate text-center w-full">
          {
            'title' in bestTVsOrMovies[2] && bestTVsOrMovies[2].title ||
            'name' in bestTVsOrMovies[2] && bestTVsOrMovies[2].name || 'unknown'
          }
        </p>
      </div>
      <div className="relative">
        <Link href={
          encodeURLString(`/card?title=${
            'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
            'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'}&id=${bestTVsOrMovies[3].id}`
          )
        }>
          <Image src={
            bestTVsOrMovies[3].backdrop_path ? 
            ImagePath + bestTVsOrMovies[3].backdrop_path : '/header/blur-1.png'
          } 
          alt={
            'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
            'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'
          }
          className="rounded-r-md max-h-[196.382px] h-auto w-full"
          width={930} height={495} />
        </Link>
        <p className="absolute bottom-1 text-xs text-white truncate text-center w-full">
            {
              'title' in bestTVsOrMovies[3] && bestTVsOrMovies[3].title ||
              'name' in bestTVsOrMovies[3] && bestTVsOrMovies[3].name || 'unknown'
            }
        </p>
      </div>

    </div>

    </foreignObject>
    
    </svg>
    
  )
}

export type NowPlayingMovie = {
  dates: {
    maximum: string,
    minimum: string
  },
  page: number,
  results: Omit<MovieRecommendations['results'][0], 'media_type'>[],
  total_pages: number,
  total_results: number
}

export type AiringTodayTVshow = {
  page: number,
  results: Omit<TVshowsRecommendations["results"][0], 'media_type'>[],
  total_pages: number,
  total_results: number
}

export function getBestTVsOrMovies(
  nowPlayingMovieOrAiringTodayTVshow: NowPlayingMovie | AiringTodayTVshow,
  fromWhereToSlice?: {
    begin: number,
    end: number
  }
) {

  const prepareItems = nowPlayingMovieOrAiringTodayTVshow.results
  .filter(result => (
    result.backdrop_path && result.genre_ids && result.poster_path || 
    result.overview || result.original_language 
  ))
  .sort((a, b) => b.popularity - a.popularity)
  .slice(fromWhereToSlice?.begin || 0, fromWhereToSlice?.end || 6)

  return prepareItems.length === 6 
  ? prepareItems : nowPlayingMovieOrAiringTodayTVshow.results
  .slice(fromWhereToSlice?.begin || 0, fromWhereToSlice?.end || 6)

}

export function encodeURLString(str: string) {
  return encodeURIComponent(str).replace(/%20/g, "+");
}

async function getPersonImage(id: number): Promise<string> {
  let src = ''
  
  try {
    await (async () => {
      if (!id) return

      const {data}: {data: MediaTypeInfoType['personDetails']} = await axios(
        `https://api.themoviedb.org/3/person/${id}?language=en-US`,
        TMDBOptions
      )

      src = data.profile_path
      // console.log({data})
    })()
  } catch(err: any) {
    console.log(err)
  }

  return  src
}


