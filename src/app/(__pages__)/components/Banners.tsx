import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { ImagePath } from "@/app/lib/types";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import useImagePixel from "../hooks/useImagePixel";
import { NowPlayingMovie, AiringTodayTVshow, getBestTVsOrMovies, encodeURLString } from "./BelowTheHeader";
import Slider, { Settings as SliderSettings, CustomArrowProps } from "react-slick";
import MoviesOrTVshowsLinksContext from "../context/MoviesOrTVshowsLinksContext";
import TitleImage from "@/app/modals/card/components/TitleImage";
import { ResultType } from "@/app/lib/types";
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes";
import { SaveOrRemoveFromSavedStore } from "./save/SaveOrRemoveFromSavedStore";
import { _Movies, _TVshows } from "../context/MoviesOrTVshowsLinksContext";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";


let timerId: ReturnType<typeof setTimeout>

export function Banners() {

  const {moviesOrTVshows, links} = useContext(MoviesOrTVshowsLinksContext)

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


  const sliderContainerWrapperRef = useRef<HTMLDivElement>(null)
  const sliderElRef = useRef<Slider>(null);

  const bestTVsOrMovies = nowPlayingMovieOrAiringTodayTVshow? getBestTVsOrMovies(
    nowPlayingMovieOrAiringTodayTVshow,
    {
      begin:0,
      end: 9
    }
  ) : []

  const [bestTVsOrMoviesDetails, setBestTVsOrMoviesDetails] = useState<{ [id: number]: MediaTypeInfoType['details']; } | null>(null);

  const [credits, setCredits] = useState<{ [id: number]: MediaTypeInfoType['credits']; } | null>(null);

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


  useEffect(() => {
    const tempDetails: typeof bestTVsOrMoviesDetails = {};
    const tempCredits: typeof credits = {};

    const getData = async (card: (typeof bestTVsOrMovies)[number]) => {
      const detailsLink = moviesOrTVshows === 'tvshow'
        ? `https://api.themoviedb.org/3/tv/${card.id}?language=en-US`
        : `https://api.themoviedb.org/3/movie/${card.id}?language=en-US`;

      const creditsLink = moviesOrTVshows === 'tvshow'
        ? `https://api.themoviedb.org/3/tv/${card.id}/credits?language=en-US`
        : `https://api.themoviedb.org/3/movie/${card.id}/credits?language=en-US`;

      try {
        const bestTVsOrMoviesDetails: MediaTypeInfoType['details'] = await axios(detailsLink, TMDBOptions).then(res => res.data);

        const credits: MediaTypeInfoType['credits'] = await axios(creditsLink, TMDBOptions).then(res => res.data);

        tempCredits[card.id] = credits;
        tempDetails[card.id] = bestTVsOrMoviesDetails;

      } catch (error) {
        console.log(11);

        console.log(error);
      } finally {

        if (Object.keys(tempDetails).length === Object.keys(bestTVsOrMovies).length && Object.keys(bestTVsOrMovies).length === Object.keys(tempCredits).length) {

          setCredits({ ...tempCredits });
          setBestTVsOrMoviesDetails({ ...tempDetails });
        }
      }
    };

    bestTVsOrMovies.forEach( card => getData(card))

  }, [bestTVsOrMovies?.[0]?.id]);

// on wheel
  useEffect(() => {
    const sliderContainer = sliderContainerWrapperRef.current
    const slider = sliderElRef.current
    const throtle = 100

    if (!slider || !sliderContainer) return 
    
    function onWheel(e: WheelEvent) {
    if (!slider) return 


      e.preventDefault()
      
      if (e.deltaY > 0) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          slider.slickNext()
        }, throtle)

      } else {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          slider.slickPrev()
        }, throtle)
      }
    }

    sliderContainer.addEventListener('wheel', onWheel)
    
    return () => {
      sliderContainer.removeEventListener('wheel', onWheel)
    }
  }, [])

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: " relative",
    prevArrow: <PrevArrow style={{background: 'red'}}/>,
    nextArrow: <NextArrow style={{background: 'red'}}/>,

    // autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  // console.log(bestTVsOrMoviesDetails)
  
  
  return (
    <div className="mb-10" ref={sliderContainerWrapperRef}>
      <Slider {...settings} ref={sliderElRef}>
        {
          bestTVsOrMovies.map((item, i) => (
            bestTVsOrMoviesDetails && (
              <Banner 
                key={i} 
                item={item} 
                itemDetails={bestTVsOrMoviesDetails[item.id]}
                links={links}
                moviesOrTVshows={moviesOrTVshows}
              />
            )
          ))
        }
      </Slider>
    </div>
  )
  
}


function Banner({
  item,
  itemDetails,
  links,
  moviesOrTVshows
}:{
  item: (ReturnType<typeof getBestTVsOrMovies>)[number]
  itemDetails: MediaTypeInfoType['details']
  links: _Movies | _TVshows
  moviesOrTVshows: 'movie' | 'tvshow'
}) {

  const imageRef = useRef<HTMLImageElement | null>(null);

  const [images, setImages] = useState<CommonTypes['Images'] | null>(null)
  const [isLoadedImage, setIsLoadedImage] = useState(false)


  const card: ResultType = {
    adult: item.adult,
    backdrop_path: item.backdrop_path || '/no-backdrop-image.png',
    genre_ids: item.genre_ids,
    id: item.id,
    original_language: item.original_language,
    original_name: 'original_name' in item && item.original_name || 'original_title' in item && item.original_title || 'name' in item && item.name || 'title' in item && item.title || 'unknown',
    overview: item.overview,
    popularity: item.popularity,
    poster_path: item.poster_path || '/no-image.png',
    title: 'title' in item && item.title || 'name' in item && item.name || 'unknown' ,
    name: 'name' in item && item.name || 'title' in item && item.title || 'unknown',
    vote_average: item.vote_average,
    vote_count: item.vote_count,
    first_air_date: 'first_air_date' in item && item.first_air_date || 'release_date' in item && item.release_date || 'N/A',
  }
  
  const alteredCard = useMemo(() => {
    return {
      ...card,
      show_id: card.id,
      media_type: moviesOrTVshows
    }
  }, [card, moviesOrTVshows]);


  const alteredBg = ((bg = 'rgb(3 3 3 / 1)') => {
    return bg.split('/')[0].replace(/ /g, ',').replace(/rgb/g, 'rgba') + '0.9)';
  })('');


   // getAllImages
  useEffect(() => {
    async function getImages() {
      if( !item?.id) return

      try {
        const data: typeof images = await axios(`${
          links.INFOS.images.beforeStr}${item.id}${links.INFOS.images.afterStr}`,
          TMDBOptions
        ).then (res => res.data)
        setImages(data)

      } catch (error) {
        // console.log('error is: ', error)
      }
    }  
    getImages()

  }, [item.id, links.INFOS.images])
  

  return (
    <svg width="100%" height="100%" viewBox="0 0 990 177.883" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="border-b border-gray-500 overflow-hidden"
    >

      <foreignObject x="0" y="0" width="100%" height="100%" className="bg-amber-500p">
        <div className="bg-amber-800p h-full grid grid-cols-[40%,60%] overflow-hidden relative">
          <div className="bg-red-600p">
            <ImageFade bg={alteredBg} />
            <ImageFade bg={alteredBg} />
            <div className="bg-green-900p absolute left-[10px] bottom-0 top-9 w-[40%] grid grid-rows-[1fr_1fr] items-end pt-6 pb-3 max-h-[140px]p overflow-hidden mix-blend-exclusion">
              <div className="ml-16 overflow-hidden">
                {
                  images && card && (
                    <TitleImage 
                      card={card} 
                      images={images} 
                      className="w-[70%] ml-2 max-h-[60px] h-[70px] bg-red-500p filter saturate-200 brightness-150 "
                    />
                  )
                }
              </div>
              <div className="border border-gray-500 inline-grid grid-flow-col gap-14 items-center justify-start h-max w-[55%] pr-4 rounded-full bg-red-500p ml-[2px]">
                <div onClick={(e) => e.stopPropagation()} className="bg-gray-600/50 m-[2px] rounded-full" >
                  <SaveOrRemoveFromSavedStore 
                    whatToAlter="movie_tvshow" 
                    item={alteredCard} 
                    iconOlnly
                    iconSize={20}
                  />
                </div>
                <Link 
                  href={encodeURLString(`/card?title=${'title' in item && item.title ||
                  'name' in item && item.name || 'unknown'}&id=${item.id}`
                  )}
                  className="grid grid-cols-[70%_15%] gap-[30%] items-center justify-center bg-red-500p relative before:bg-gray-500/20 before:absolute before:top-1/2 before:-translate-y-1/2 before:bottom-0 before:-left-10 before:w-[1px] before:h-[80%] before:content-['']"
                >
                  <span className="whitespace-nowrap">More info</span>
                    <Image
                      src="/long-arrow-right.svg"
                      width={10}
                      height={10}
                      alt="arrow"
                      className="min-w-[20px]"
                      onLoad={() => setIsLoadedImage(true)} 
                    />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-red-500p"
          >
            <Image
              ref={imageRef}
              src={item.backdrop_path ?
                ImagePath + item.backdrop_path : '/header/banner.png'}
              alt={'title' in item && item.title ||
                'name' in item && item.name || 'unknown'}
              className="h-[177.883px]p h-[70%] w-[100%] object-cover "
              width={930} height={495} 
            />
          </div>
        </div>
      </foreignObject>

    </svg>
  );
}

function ImageFade({bg}: {bg: string}) {
  const color = bg? bg : 'rgba(3, 8, 15, 0.9)'

  return (
    <div>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 906 260"  xmlSpace="preserve"
      className={`bg-amber-500p absolute inset-0 `}
      >

      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0" y1="132" x2="906" y2="132" gradientTransform="matrix(1 0 0 -1 0 262)">
        <stop  offset="0.4806" style={{stopColor: color, stopOpacity: "0.98"}}/>
        <stop  offset="0.5999" style={{stopColor:  color, stopOpacity: "0.195"}}/>
        <stop  offset="0.7449" style={{stopColor:  color, stopOpacity: "0"}}/>
        </linearGradient>
        <path className="st0" d="M0,0h906v260H0V0z"
        fill="url(#SVGID_1_)"
        style={{fill: "url(#SVGID_1_)"}}
      />
      </svg>
    </div>
  )
}



export function PrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      // className={className}
      className={'-translate-y-[60%] cursor-pointer'}
      style={{ ...style, ...prevStyles}}
      onClick={onClick}
    >
      <button className="overflow-hidden border border-gray-500 bg-gray-600/70 cursor-pointer w-[30px] h-[30px] rounded-full flex justify-center items-center">
        <FaChevronLeft />
      </button>
    </div>
  );
}

export function NextArrow(props: CustomArrowProps & {isLoading?: boolean}) {
  const { className, style, onClick, isLoading } = props;
  return (
    <div
      // className={className}
      className={'-translate-y-[60%] cursor-pointer'}
      style={{ ...style, ...nextStyles}}
      onClick={onClick}
    >
      <button className="overflow-hidden border border-gray-500 bg-gray-600/70 cursor-pointer w-[30px] h-[30px] rounded-full flex justify-center items-center">
        <FaChevronRight />
      </button>
    </div>
  );
}


const prevStyles: React.CSSProperties = {
  width: "40px",
  height: "35%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "20px",
  zIndex: "10",
  // background: 'red'
}

const nextStyles: React.CSSProperties = {
  width: "40px",
  height: "35%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  right: "20px",
  zIndex: "10",
  // background: 'red'
}


const customStylesPrev: React.CSSProperties = {
  width: "30px",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "0%",
  zIndex: "10",
}

const customStylesNext: React.CSSProperties = {
  width: "30px",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  right: "0%",
  zIndex: "10",
}