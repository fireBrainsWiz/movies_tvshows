'use client'

import Slider from "react-slick";
import { useState, useRef, useEffect, useContext } from "react";
import { PrevArrow, NextArrow } from "../home-page-header-section/MovieBanners";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { Genre, ResultType } from '@/app/lib/types'
import MoviesOrTVshowsLinksContext, { _Movies, _TVshows } from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import Result from "@/app/(__pages__)/components/Result";



type Data = {
  page: number
  results: ResultType[]
  total_pages: number
  total_results: number
}

export default function SlickSlider({
  genre,  title='details', id
}: {
  genre: Genre | null,
  title?: string,
  id?: number
}) {

  const slideRef  = useRef<Slider | null>(null)
  
  const [data, setData] = useState({} as Data)
  const [page, setPage] = useState(1)
  const [prevSlide, setPrevSlide] = useState(0)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [numOfSlidesPerRow, setNumOfSlidesPerRow] = 
  useState<ReturnType<typeof getNumOfSlidesPerRow>>(
    getNumOfSlidesPerRow()
  )
  const [isLoadingNewSlides, setIsLoadingNewSlides] = useState(false)

  const {links} = useContext(MoviesOrTVshowsLinksContext)
  

  useEffect(() => {
    setData({} as Data)
    
  }, [
    links.CRIMEDRAMASCIFI.crime, 
    links.CRIMEDRAMASCIFI.drama, 
    links.CRIMEDRAMASCIFI.mystery
  ])

  // getData API calls
  useEffect(() => {
    (async () => {
      try {
        if (
          isLastSlide || 
          genre !== 'crime' && genre !== 'drama' && genre !== 'mystery' && genre !== null ||
          title !== 'details' && title !== 'credits' && title !== 'contentRatings' && title !== 'keywords' && title !== 'recommendations' && title !== 'similar' && title !== 'personDetails' && title !== 'images'
        ) return

  
        let newData: typeof data = genre
        ? await axios(
          `${links.CRIMEDRAMASCIFI[genre]+page}`, TMDBOptions
        ).then(res => res.data)

        : id 
          ? await axios(
            `${ links.INFOS[title].beforeStr + id + links.INFOS[title].afterStr+page}`, TMDBOptions
          ).then(res => res.data)
          : {} as typeof data
  
        if ('error' in newData) return

        
        setData(prev => {
          if (!prev?.results) return newData
          if (prev?.results?.[0]?.id === newData?.results?.[0]?.id) {
            return prev
          }
          
          return {
            ...prev,
            ...newData,
            results:  [ ...prev.results, ...newData.results ]
          }
        })
        

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingNewSlides(false)

      }
      
    })()

  }, [
    genre, title, id, links.CRIMEDRAMASCIFI, links.INFOS, page, isLastSlide
  ])
  
  // add another page num or not
  useEffect(() => {
    if (isLastSlide) return

    if (numOfSlidesPerRow >= 10 && data?.results?.length <= 30) {
      setPage(2)
    }
    
    if ('total_pages' in data && data.total_pages <= data.page) {
      setIsLastSlide(true)
    }
  }, [data, numOfSlidesPerRow, setPage, setIsLastSlide, isLastSlide])

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
  }, [setNumOfSlidesPerRow])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    
    slidesToShow: data.results?.length < numOfSlidesPerRow 
    ? data.results?.length : numOfSlidesPerRow,
    slidesToScroll: data.results?.length < numOfSlidesPerRow 
    ? data.results?.length : numOfSlidesPerRow,

    className: "slides px-[30px] overflow-hidden bg-neutral-800 ",

    prevArrow: <PrevArrow />,
    nextArrow:  <NextArrow  isLoading={isLoadingNewSlides} />,

    beforeChange: (current: number, next: number) => {
      setPrevSlide(current)

      const slides = slideRef.current?.props?.children as 
      React.ReactNode[]
      if(!slides) return

      if (next>current && next + numOfSlidesPerRow >= slides.length && !isLastSlide) {
        setIsLoadingNewSlides(true)
      }
    },

    afterChange: (current: number) => {
      const slides = slideRef.current?.props?.children as 
      React.ReactNode[]
      if(!slides) return

      if (current>prevSlide && current + numOfSlidesPerRow >= slides.length && !isLastSlide) {
        setPage(prev => prev + 1)
      }
    },

  };


  if (!data?.results?.[0]) return null


  return (
    <div className="my-5">
      { data?.results?.[0] &&
        <p className=" font-bold mb-2 capitalize ml-[30px]">
          {genre || title + `${ links.MEDIATYPE === 'movie' ? ' Movies' : ' TV Shows'}`}
        </p>
      }
      <Slider {...settings} ref={slideRef}>
        {
          data?.results?.map((result, i) => {
            return (
              <Result 
                key={i}
                item={result} 
              />
          )})
        }
      </Slider>
    </div>
  )
}

const _sizes = {
  xs: 420,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xl2: 1536,
  xl3: 1600,
  xl4: 1920,
  xl5: 2560,
}

export function getNumOfSlidesPerRow(sizes = _sizes) {
  return ( 
    typeof window !== 'undefined' && window.innerWidth <= sizes.xs
    ? 2 : innerWidth <= sizes.sm
    ? 4 : innerWidth <= sizes.md
    ? 6 : innerWidth <= sizes.lg
    ? 8 : innerWidth <= sizes.xl2
    ? 10 : innerWidth <= sizes.xl3
    ? 12 : innerWidth <= sizes.xl4
    ? 14 : innerWidth <= sizes.xl5
    ? 16 : 
      18
  )
}
