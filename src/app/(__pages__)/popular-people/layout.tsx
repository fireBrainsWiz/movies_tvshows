import type { Metadata } from 'next'
import NextAndBackBtns from "./NextAndBackBtns"
import HomePageHeaderSection from '../(top_links)/popular/home-page-header-section/HomePageHeaderSection'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: 'popular or famous actors and actresses',
  description: 'Generated by create next app',
  keywords: ['famous', 'actor', 'actors', 'actress', 'actresses', 'movie star', 'movie cast', 'crew']
}


export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <HomePageHeaderSection />
      <div className='mt-20 '>
        {children}
      </div>
        <NextAndBackBtns />
    </section>
  )
}

export const dynamicParams = false // true | false, 
/*

    true (default): Dynamic segments not included in generateStaticParams are generated on demand.
    false: Dynamic segments not included in generateStaticParams will return a 404.

*/ 


export type PopularPeopleList = {
  page: number
  results: {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    known_for: {
      adult: boolean
      backdrop_path: string
      id: number
      title: string
      original_language: string
      original_title: string
      overview: string
      poster_path: string
      media_type: string
      genre_ids: number[]
      popularity: number
      release_date: string
      video: boolean
      vote_average: number
      vote_count: number
    }[]
  }[]
  total_pages: number
  total_results: number
}

export type Params = {
  page_number: string
}
