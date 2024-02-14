'use client'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useRef, useEffect, useMemo } from "react";
import SliderSlide from "./SliderSlide";
import getDataFromAxios from "../../hooks/getDataFromAxios";
import {PrevArrow, NextArrow} from "../../components/PrevAndNextArrows";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";


export default function SlickSlider({genre, timerId, links, title='', id=0}) {

  const slideRef  = useRef(null)
  
  const [data, setData] = useState({})
  const [page, setPage] = useState(1)
  const [prevSlide, setPrevSlide] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [isLastSlide, setIsLastSlide] = useState(false)

  const [results, setResults] = useState(
    createMoreSlides(data?.results)
  )

  // reset
  useMemo(() => {
    slideRef.current?.slickGoTo(0)

    if (data?.results) {
      setSpeed(1000)
    }
    
    if (speed === 1000) {
      setTimeout(() => {
        setData({})
        setPage(1)
        setPrevSlide(0)
        setIsLastSlide(false)
        setResults([])
        setSpeed(500)
      }, 300)
    }
    
  }, [links, speed, id])


  // getData API calls
  useEffect(() => {
    (async () => {
      try {
        if (isLastSlide) return
  
        let dataOrError = genre
        // await getDataFromAxios({URL: links2({page})[genre]})
        ? await getDataFromAxios({
          URL: `${links.CRIMEDRAMASCIFI[genre]+page}`
        })
        : await axios(
          `${ links.INFOS[title].beforeStr + id + links.INFOS[title].afterStr+page}`, TMDBOptions
        ).then(res => res.data)
  
        if ('error' in dataOrError) return
        // console.log(dataOrError)
  
        if (dataOrError?.results.length > 20) {
          dataOrError.results = dataOrError.results.slice(0, 20)
        }
    
        setData(dataOrError)
  
        setResults(prev => {
          if (prev?.[0]?.length) {
            if (prev[0][0].id === dataOrError?.results[0]?.id) {
              return prev
            }
            return [...prev, ...createMoreSlides(dataOrError?.results)]
          } else {
            return createMoreSlides(dataOrError?.results)
          }
        })
  
        if (results.length <= 2) {
          setPage(2)
        }
  
        if (dataOrError?.total_pages <= dataOrError?.page) {
          setIsLastSlide(true)
        }

      } catch (error) {
        console.log(error)
      }
    })()

  }, [page, isLastSlide, setResults, setData, links, genre, id])
  

  //window resize
  useEffect(() => {
    async function watchWidth() {
      clearTimeout(timerId)

      const arr = []
      let i = 1
      const recur = (res) => {
        arr[i] = res.splice(0, 20)
        if (res.length) {
          i++
          recur(res)
        }

        const fin = []
        arr.forEach(a => {
          fin.push(...createMoreSlides(a))
        })
        return fin
      }

      timerId = setTimeout(() => {
        const res = [...results].flat()
        setResults([...recur(res)])
      }, 300)
    }
    
    window.addEventListener('resize', watchWidth)
    return  () => {
      window.removeEventListener('resize', watchWidth)
    }
  }, [setResults, results, setData, timerId])



  const settings = {
    dots: false,
    infinite: false,
    speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slides bg-blue-500p ",

    prevArrow: <PrevArrow />,
    nextArrow: !isLastSlide && <NextArrow />,

    beforeChange: (current, next) => {
      setPrevSlide(current)
    },

    afterChange: (current) => {
      if (current>prevSlide && current+2 >= results.length) {
        setPage(page + 1)
      }
    }

  };

  // console.log(title, results)

  return (
    <div className="bg-red-500p my-5  px-7 ">
      { results?.[0] &&
        <h2 className=" font-bold mb-2 capitalize">{genre || title}</h2>
      }
      <Slider {...settings} ref={slideRef} >
        {
          results?.map((result, i) => {
            return (
              <SliderSlide key={i} result={result}/>
          )})
        }
      </Slider>
    </div>
  )
}


const links2 = ({page}) => {
  return {
    crime: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=80`,

    drama: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=18`,

    sci_fi: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=10765`,
  }
}

function createMoreSlides(results = []) {
  let i = 0
  const sizes = {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1280,
    xl2: 1536,
  }

  let n = window.innerWidth <= sizes.md
      ? 5 : innerWidth <= sizes.lg
      ? 4 : innerWidth <= sizes.xl2
      ? 2 : 
        1
      
  const slides = [...Array(n)].map(_ => [])

  results.forEach(res => {
    if (i>n-1) i=0
    slides[i].push(res)
    i++
  });

  return slides
}

