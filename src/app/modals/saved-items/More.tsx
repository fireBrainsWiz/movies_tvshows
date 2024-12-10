import Image from "next/image";
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext";
import { useContext, useEffect, useState } from "react";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";
// import ThemeContext from "@/app/(__pages__)/context/ThemeContext";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { TVshowsDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { ResultType } from "@/app/lib/types";


export function More({
  show_id, bgColor, fromSaved
}: {
  show_id: number;
  bgColor: string;
  fromSaved?: boolean
}) {

  // const {setIsLoadingBackdropImage} = useContext(ThemeContext)
  const {setMoviesOrTVshows} = useContext(MoviesOrTVshowsLinksContext)
  const {setIsVisibleCardPage, setCard, setScrollTop} = 
  useContext(CardBeingViewedContext)

  const [_tvshowDetails, _setTVshowDetails] = useState({} as TVshowsDetails)
  const [isLoadedImage, setIsLoadedImage] = useState(false)


  function goToShow() {
    const item: ResultType = {
      id: _tvshowDetails.id,
      name: _tvshowDetails.name,
      overview: _tvshowDetails.overview,
      first_air_date: _tvshowDetails.first_air_date || '',
      poster_path: _tvshowDetails.poster_path,
      vote_average: _tvshowDetails.vote_average,
      vote_count: _tvshowDetails.vote_count,
      backdrop_path: _tvshowDetails.backdrop_path || '/no-image-2.webp',
      genre_ids: _tvshowDetails.genres.map(genre => genre.id),
      original_language: _tvshowDetails.original_language,
      original_name: _tvshowDetails.original_name,
      popularity: _tvshowDetails.popularity,
      title: _tvshowDetails.name,
      adult: _tvshowDetails.adult,
      origin_country: _tvshowDetails.origin_country,
    }

    setMoviesOrTVshows('tvshow');
    // setIsLoadingBackdropImage(true)
    setIsVisibleCardPage(true)
    setCard(item)
    setScrollTop(document.documentElement.scrollTop)
  }


  useEffect(() => {
    if (!isLoadedImage) return
    const getDetails = async () => {
      try {
        const detailsRes: TVshowsDetails = await axios(
          `https://api.themoviedb.org/3/tv/${show_id}?language=en-US`, 
          TMDBOptions
        ).then(res => res.data)
        _setTVshowDetails(detailsRes)
      } catch (error) {
        console.log(error);
      }
    }
    getDetails()

  }, [show_id, isLoadedImage])

// console.log(show_id)

  return (
    <span className="flex flex-col items-center justify-center [@media(max-width:500px)]:grid ">
      {
        !fromSaved && (
          <span className="text-xl font-bold truncate w-[80%] lg:hidden text-center mx-auto [@media(max-width:873px)]:hidden">
            {_tvshowDetails.name}
          </span>
        )
      }
      <button className={`flex items-center justify-center  gap-4 bg-red-400/30p border border-white/70 dark:border-gray-500 p-2 rounded-full w-[75%]p w-full mx-auto  min-w-[100px]  $ relative overflow-hidden mt-2 isolate [@media(max-width:500px)]:w-full`}
        onClick={goToShow}>
        <span className={`absolute inset-0 -z-10 ${bgColor} opacity-50`}
          style={{background: bgColor}}
        ></span>
        <span className="hidden [@media(max-width:1024px)]:inline [@media(max-width:873px)]:hidden">Go to show</span>
        <span className="text-xl font-bold truncate [@media(max-width:1024px)]:hidden [@media(max-width:873px)]:inline">
          {_tvshowDetails.name}</span>
        <span>
          <Image
            src="/long-arrow-right.svg"
            width={30}
            height={30}
            alt="arrow"
            className="min-w-[30px]"
            onLoad={() => setIsLoadedImage(true)} 
          />
        </span>
      </button>
    </span>
  );
}



//window.open(`https://www.themoviedb.org/tv/${show_id}`, '_blank')