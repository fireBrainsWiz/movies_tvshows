
import { useEffect, useState } from "react";
import axios from 'axios';
import { TMDBOptions } from '@/app/client/helpers/TMDB_API';
import { _Movies, _TVshows } from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext';
import { ResultType } from "@/app/lib/types";
import Result from "@/app/(__pages__)/components/Result";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import Slider from "react-slick";
import { getNumOfSlidesPerRow } from "../crime-drama-mystery/SlickSlider";
import { PrevArrow, NextArrow } from "../home-page-header-section/MovieBanners";


export default function TrendingMoviesOrTVshows({
  links
}: {
  links: _TVshows | _Movies
}) {

  const [data, setData] = useState<MediaTypeInfoType['similar'] | null>(null)

  const [numOfSlidesPerRow, setNumOfSlidesPerRow] = 
  useState<ReturnType<typeof getNumOfSlidesPerRow>>(
    getNumOfSlidesPerRow()
  )

  //get data
  useEffect(() => {
    const getData = async () => {
      try {
        const trendingMovieOrTvShow: MediaTypeInfoType['similar'] = await axios(`
          ${links.TRENDING}
          `, TMDBOptions
        ).then(res => res.data)
        setData(trendingMovieOrTvShow)
        
      } catch (error) {
        console.log(error)
      } 
    }
    getData()

  }, [links])

  //window resize
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>
    function watchWidth() {
      clearTimeout(timerId)

      setTimeout(() => {
        setNumOfSlidesPerRow(getNumOfSlidesPerRow())
      }, 300)
    }
    watchWidth()
    
    window.addEventListener('resize', watchWidth)
    return  () => {
      window.removeEventListener('resize', watchWidth)
    }
  }, [])


  if (!data?.results?.[0]) return null


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,

    slidesToShow: data.results.length < numOfSlidesPerRow 
    ? data.results?.length : numOfSlidesPerRow,
    slidesToScroll: data.results?.length < numOfSlidesPerRow 
    ? data.results?.length : numOfSlidesPerRow,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    className: "slides px-[30px] overflow-hidden bg-neutral-800",
  };
  

  return (
    <div className="my-12">
      <p className="text-2xl font-bold text-white text-center">
        Trending {links.MEDIATYPE === 'movie' ? 'Movies' : 'TV Shows'}
      </p>

      {/* <div className="grid grid-flow-col gap-6 overflow-x-auto"> */}
      <Slider {...settings}>
        {
          data.results.map((result, i) => {
            let alteredResult: ResultType 

            if ('name' in result) {
              alteredResult = {
                adult: result.adult,
                backdrop_path: result.backdrop_path,
                genre_ids: result.genre_ids,
                id: result.id,
                origin_country: [result.origin_country],
                original_language: result.original_language,
                original_name: result.name,
                overview: result.overview,
                popularity: result.popularity,
                poster_path: result.poster_path,
                first_air_date: result.first_air_date,
                name: result.name,
                title: result.name,
                vote_average: result.vote_average,
                vote_count: result.vote_count,
              }
            } else {
              alteredResult = {
              adult: result.adult,
              backdrop_path: result.backdrop_path,
              genre_ids: result.genre_ids,
              id: result.id,
              original_language: result.original_language,
              original_name: result.title,
              overview: result.overview,
              popularity: result.popularity,
              poster_path: result.poster_path,
              first_air_date: result.release_date,
              title: result.title,
              name: result.title,
              vote_average: result.vote_average,
              vote_count: result.vote_count,
            }
          }

          return (
            <div key={i} className="w-[clamp(100px,200px,200px)]">
              <Result 
                item={alteredResult} 
              />
              
            </div>
          )
        })
      }
    </Slider>
    </div>
  )
}


