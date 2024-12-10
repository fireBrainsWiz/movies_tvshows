"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useQueryClient } from "@tanstack/react-query"
import BelowTheHeader from "./(__pages__)/components/BelowTheHeader"
import CrimeDramaMystery from "./(__pages__)/(top_links)/popular/crime-drama-mystery/CrimeDramaMystery"
import HomePageHeaderSection from "@/app/(__pages__)/(top_links)/popular/home-page-header-section/HomePageHeaderSection"

import PopularMoviesOrTVshows from "./(__pages__)/(top_links)/popular/most-popular/PopularMoviesOrTVshows"
import MoviesOrTVshowsLinksContext from "./(__pages__)/context/MoviesOrTVshowsLinksContext";
import { useContext } from "react";
import { BsCcCircle } from "react-icons/bs";
import TrendingMoviesOrTVshows from "./(__pages__)/(top_links)/popular/trending/TrendingMoviesOrTVshows";
import TrendingPeople from "./(__pages__)/(top_links)/popular/trending/TrendingPeople";
import useThemeStore from "./(__pages__)/stores/theme-store/theme-store";


export default function Home() {
  const { links } = useContext(MoviesOrTVshowsLinksContext)

  const {theme, setTheme, possibleThemes, getThemeOptions} = useThemeStore()

  return (
    <div className=" bg-[#333232]p bg-whitep overflow-x-hidden relative bg-transparent">
      <HomePageHeaderSection />
      {/* <BelowTheHeader /> */}
      {/* <TrendingMoviesOrTVshows links={links} /> */}
      {/* <PopularMoviesOrTVshows links={links}/>  */}
      {/* <CrimeDramaMystery /> */}
      {/* <TrendingPeople /> */}

      {/* <p className="text-2xl p-6 bg-red-500 cursor-pointer">go</p> */}
      
    </div>
  )
}




