"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useQueryClient } from "@tanstack/react-query"
import BelowTheHeader from "./(__pages__)/components/BelowTheHeader"
import CrimeDramaMystery from "./(__pages__)/popular/crime-drama-mystery/CrimeDramaMystery"
import HomePageHeaderSection from "./(__pages__)/popular/home-page-header-section/HomePageHeaderSection"

import PopularMoviesOrTVshows from "./(__pages__)/popular/most-popular/PopularMoviesOrTVshows"
import MoviesOrTVshowsLinksContext from "./(__pages__)/context/MoviesOrTVshowsLinksContext";
import { useContext } from "react";


export default function Home() {
  const { moviesOrTVshows, links } = useContext(MoviesOrTVshowsLinksContext)

  return (
    <div className=" bg-[#333232] pb-4p">
      {/* <HomePageHeaderSection /> */}
      {/* <BelowTheHeader /> */}
      {/* <PopularMoviesOrTVshows links={links}/> */}
      {/* <CrimeDramaMystery /> */}
    </div>
  )
}
