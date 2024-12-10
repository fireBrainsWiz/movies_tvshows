
import { useEffect, useRef, useState, useCallback } from "react";
import PopularMovieOrTVshowSlide from './PopularMovieOrTVshowSlide';
import axios from 'axios';
import { TMDBOptions } from '@/app/client/helpers/TMDB_API';
import Slider, { Settings as SliderSettings, CustomArrowProps } from "react-slick";
import { _Movies, _TVshows } from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext';
import { PrevArrow as PrevArrowImported, NextArrow as NextArrowImported } from "@/app/(__pages__)/components/PrevAndNextArrows";
// import { PrevArrow as PrevArrowFromBanner, NextArrow as NextArrowFromBanner } from "@/app/(__pages__)/(top_links)/popular/home-page-header-section/MovieBanners";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getNumOfSlidesPerRow } from "../crime-drama-mystery/SlickSlider";

export default function PopularMoviesOrTVshows({
  links
}: {
  links: _TVshows | _Movies
}) {

  const swiperElRef = useRef<Slider>(null);

  const [nOfSlides, setNOfSlides] = useState(4);
  const [noMorePages, setNoMorePages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prevSlide, setPrevSlide] = useState(0)
  const [dir, setDir] = useState<'forward' | 'backward'>('forward')
  const [currentAndNext, setCurrentAndNext] = useState({current: 0,next: 1})
    
  const checkIfNextIsAvailable = useCallback( async (slider: Slider) => {

    if (noMorePages) return false

    try {
      const similar: MediaTypeInfoType['similar'] = await axios(
        `${links.TOPLINKS.POPULAR}${nOfSlides+1}`, 
        TMDBOptions
      ).then(res => res.data)

      if (!similar?.results?.length) {
        setNoMorePages(true)
        return false
      }

      return true

    } catch (error) {
      console.log('error in similar is ', error)
      setNoMorePages(true)
      return  false
    } 
    

    // slider.slickNext()

  }, [nOfSlides, setNoMorePages, noMorePages, prevSlide, links])
  
  
  useEffect(() => {
    swiperElRef?.current?.slickGoTo(0)

    setTimeout(() => {
      setNOfSlides(4)
      setPrevSlide(0)
      setNoMorePages(false)
    }, 100)
  }, [links, swiperElRef.current, setNOfSlides, setNoMorePages, setPrevSlide])


  async function next() {
    const slider = swiperElRef?.current
    if (!slider) return 

    const isNextAvailable = await checkIfNextIsAvailable(slider)
    if (!isNextAvailable && currentAndNext.next + 1 >= nOfSlides) return
    slider.slickNext()
  }

  async function prev() {
    const slider = swiperElRef?.current
    if (slider) {
      slider.slickPrev()
    }
  }



  const settings: SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    className: " bg-neutral-800p ",
    swipeToSlide: !(noMorePages && currentAndNext.next + 1 >= nOfSlides),
    swipe: !(noMorePages && currentAndNext.next + 1 >= nOfSlides),

    beforeChange: async (current: number, next: number) => {
      setPrevSlide(current)
      const slider = swiperElRef?.current
      const dir = next > current ? 'forward' : 'backward'
      setDir(dir)
      setCurrentAndNext({current, next})
      
      if (slider) {
        if (dir === 'forward' && !(await checkIfNextIsAvailable(slider)) ) {
          setNoMorePages(true)
        }
      }
    },

    afterChange: (current: number) => {
      if (!noMorePages && current>prevSlide && current+2 >= nOfSlides) {
        setNOfSlides(nOfSlides + 1)
      }
      setPrevSlide(current)
    },

  };



  return (
    <>
      <hr className="hr"/>  
      <div className="min-h-[800px]p bg-sky-900p my-2">
        <p className="text-2xl font-bold text-white text-center">
          Popular {links.MEDIATYPE === 'movie' ? 'Movies' : 'TV Shows'}
        </p>
        <div className=" flex justify-between px-2">
            <button type="button" 
            disabled={prevSlide === 0}
              onClick={prev}
              className="flex items-center gap-2 border border-amber-400 rounded p-2  m-2 disabled:opacity-30" 
            >
              <span><IoIosArrowBack /></span>
              <span>Prev</span>

            </button>
            <button type="button" 
              disabled={noMorePages && currentAndNext.next + 1 >= nOfSlides}
              onClick={next}
              className=" flex items-center gap-2 border border-green-400 rounded p-2 m-2 disabled:opacity-30" 
            >
              <span>Next</span>
              <span><IoIosArrowForward /></span>
            </button>
        </div>

        <Slider  {...settings} ref={swiperElRef}>
        
          {
            [...Array(nOfSlides)].map((_, i) => {
              return (
                  <PopularMovieOrTVshowSlide 
                    key={i} 
                    page={i+1}
                    links={links}
                  />
                )
            })
          }
        </Slider>

        <div className=" flex justify-between mt-6 px-2">
            <button type="button" 
              disabled={prevSlide === 0}
              onClick={prev}
              className="flex items-center gap-2 border border-amber-400 rounded p-2  m-2 disabled:opacity-30" 
            >
              <span><IoIosArrowBack /></span>
              <span>Prev</span>
            </button>

            <div>{isLoading && 'Loading...'}</div>

            <button type="button" 
              disabled={noMorePages && currentAndNext.next + 1 >= nOfSlides }
              onClick={next}
              className=" flex items-center gap-2 border border-green-400 rounded p-2 m-2 disabled:opacity-30" 
            >
              <span>Next</span>
              <span><IoIosArrowForward /></span>
            </button>
        </div>
      </div>
      <hr className="hr"/>  
    </>
  )
}



export function NextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStyles}}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStyles}}
      onClick={onClick}
    />
  );
}

const customStyles = {
  display: "none", 
}