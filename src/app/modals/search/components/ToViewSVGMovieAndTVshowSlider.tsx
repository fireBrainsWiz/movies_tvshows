'use client'

import { NextArrow, PrevArrow } from "@/app/(__pages__)/components/PrevAndNextArrows";
import Result from "@/app/(__pages__)/components/Result";
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext";
import ToggleShowPersonContext from "@/app/(__pages__)/context/ToggleShowPersonContext";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { ResultType } from '@/app/lib/types';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";



// ! TODO: Person credits to slide


export default function PersonCreditsSlickSlider(
  {id}: {id: number}) {


  // const slideRef  = useRef<Slider | null>(null)

  const {
    isVisiblePerson, personDetails, setIsVisiblePerson
  } = useContext(ToggleShowPersonContext)

  const { setMoviesOrTVshows, moviesOrTVshows } = useContext(MoviesOrTVshowsLinksContext)
  
  const [numOfSlidesPerRow, setNumOfSlidesPerRow] = 
  useState<ReturnType<typeof getNumOfSlidesPerRow>>(
    getNumOfSlidesPerRow()
  )

  const [personMovieCredits, setPersonMovieCredits] = useState({} as MediaTypeInfoType['personMovieCredits'])

  const [personTVshowCredits, setPersonTVshowCredits] = useState({} as MediaTypeInfoType['personTVshowCredits'])



  useEffect(() => {
    if (!id) return

    const personTVshowCreditsLink = {
      beforeStr: 'https://api.themoviedb.org/3/person/',
      afterStr: '/tv_credits'
    }
    const personMovieCreditsLink = {
      beforeStr: 'https://api.themoviedb.org/3/person/',
      afterStr: '/movie_credits'
    }
    
    ;(async () => {
      try {
        const credits: typeof personMovieCredits = await axios(
          `${personMovieCreditsLink.beforeStr}${id}${personMovieCreditsLink.afterStr}`, TMDBOptions
        ).then(res => res.data)
        setPersonMovieCredits(credits)
      } catch (error) {
        console.log(error)
      }
    })()

    ;(async () => {
      try {
        const credits: typeof personTVshowCredits = await axios(
          `${personTVshowCreditsLink.beforeStr}${id}${personTVshowCreditsLink.afterStr}`, TMDBOptions
        ).then(res => res.data)
        setPersonTVshowCredits(credits)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])
  

  //window resize
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>
    function watchWidth() {
      clearTimeout(timerId)

      setTimeout(() => {
        setNumOfSlidesPerRow(getNumOfSlidesPerRow())
      }, 100)
    }
    watchWidth()
    
    window.addEventListener('resize', watchWidth)
    return  () => {
      window.removeEventListener('resize', watchWidth)
    }
  }, [setNumOfSlidesPerRow])


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: numOfSlidesPerRow,
    slidesToScroll: numOfSlidesPerRow,
    className: "slides",

    prevArrow: <PrevArrow />,
    nextArrow:  <NextArrow  isLoading={false}/>,
  };

  // if (!data?.results?.[0]) return null

  return (
    <>
    {
      personTVshowCredits?.cast?.length > 0 && (
        <div className="bg-red-500p my-5  px-7 ">
          { personTVshowCredits?.cast?.length > 0 &&
            <p className=" font-bold mb-2 capitalize">
              TV Show Credits
            </p>
          }
          <Slider {...getSettings({
              numOfSlidesPerRow, credits: personTVshowCredits
          })} >
            {
              personTVshowCredits?.cast.map((cast, i) => {
                const item: ResultType = {
                  adult: cast.adult,
                  backdrop_path: cast.backdrop_path,
                  genre_ids: cast.genre_ids,
                  id: cast.id,
                  origin_country : [''],
                  original_language: cast.original_language,
                  original_name: '',
                  overview: cast.overview,
                  popularity: cast.popularity,
                  poster_path: cast.poster_path,
                  first_air_date: cast.first_air_date,
                  name: cast.name,
                  title: cast.name,
                  vote_average: cast.vote_average,
                  vote_count: cast.vote_count,
                }

                return (
                  <span key={i} 
                  onClick={()=> {
                    setMoviesOrTVshows('tvshow')
                    setIsVisiblePerson(false)
                  }}
                  >
                    <Result 
                      item={item} 
                    />
                  </span>
              )})
            }
          </Slider>
        </div>
      )
    }
    </>
  )
}

const sizes = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xl2: 1536,
  xl3: 1600,
  xl4: 1920,
  xl5: 2560,
}

function getNumOfSlidesPerRow() {
  return ( 
    typeof window !== 'undefined' && 
    window.innerWidth <= sizes.xs
    ? 2 : innerWidth <= sizes.sm
    ? 3 : innerWidth <= sizes.md
    ? 5 : 
      7
  )
}



function getSettings({
  numOfSlidesPerRow, credits
}: {
  numOfSlidesPerRow: ReturnType<typeof getNumOfSlidesPerRow>,
  credits: 
    | MediaTypeInfoType['personMovieCredits'] 
    | MediaTypeInfoType['personTVshowCredits']
}) {

  return {
    dots: false,
    infinite: false,
    speed: 500,

    slidesToShow: credits.cast.length < numOfSlidesPerRow
    ? credits.cast.length : numOfSlidesPerRow,
    slidesToScroll: credits.cast.length < numOfSlidesPerRow
    ? credits.cast.length : numOfSlidesPerRow,

    className: "slides",
    prevArrow: <PrevArrow />,
    nextArrow:  <NextArrow  isLoading={false}/>,
  };
}





