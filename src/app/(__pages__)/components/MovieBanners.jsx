import { useEffect, useRef } from "react";
import MovieBanner from "./MovieBanner";



let timerId 

export default function MovieBanners() {

  const swiperContainerWrapper = useRef(null)
  const swiperElRef = useRef(null);


  useEffect(() => {
    const scw = swiperContainerWrapper?.current
    const throtle = 300
    
    function onWheel(e) {
      e.preventDefault()
      
      if (e.deltaY > 0) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          swiperElRef.current.swiper.slideNext()
        }, throtle)

      } else {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          swiperElRef.current.swiper.slidePrev()
        }, throtle)
      }
    }

    scw.addEventListener('wheel', onWheel)
    
    return () => {
      scw.removeEventListener('wheel', onWheel)
    }
  }, [])

  
  return (
    <div ref={swiperContainerWrapper}
    >
      <swiper-container
        ref={swiperElRef}
        slides-per-view={1}
        speed={1000}
        navigation
        pagination
        loop
        // autoplay
        // autoplay-delay={5000}
        // autoplay-pause-on-mouse-enter={true}
        
        // space-between={10}
      >
        {
          [...Array(25)].map((_, i) => {
            return (
              <MovieBanner key={i} i={i}/>
            )
          })
        }

      </swiper-container>
    </div>
  )
}