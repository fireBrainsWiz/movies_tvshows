
import { useEffect, useRef } from "react";
import MovieBanner from "./MovieBanner";
import Slider from "react-slick";


let timerId 

export default function MovieBanners() {

  const swiperContainerWrapper = useRef(null)
  const swiperElRef = useRef(null);


  useEffect(() => {
    const scw = swiperContainerWrapper.current
    const throtle = 100
    
    function onWheel(e) {
      e.preventDefault()
      
      if (e.deltaY > 0) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          swiperElRef.current.slickNext()
        }, throtle)

      } else {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          swiperElRef.current.slickPrev()
        }, throtle)
      }
    }

    scw.addEventListener('wheel', onWheel)
    
    return () => {
      scw.removeEventListener('wheel', onWheel)
    }
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: " relative",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,

    // autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  
  return (
    <div ref={swiperContainerWrapper}
    >
      <Slider {...settings} ref={swiperElRef}>
        {
          [...Array(25)].map((_, i) => {
            return (
              <MovieBanner key={i} i={i}/>
            )
          })
        }
      </Slider>
    </div>
  )
}






export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStylesPrev}}
      onClick={onClick}
    />
  );
}

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStylesNext}}
      onClick={onClick}
    />
  );
}

const customStylesPrev = {
  display: "block", 
  width: "40px",
  height: "60%",
  paddingLeft: "10px",
  // background: "#ba3838e6",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "0%",
  zIndex: "10",
}

const customStylesNext = {
  display: "block", 
  width: "40px",
  height: "60%",
  paddingLeft: "10px",
  // background: "#ba3838e6",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  right: "0%",
  zIndex: "10",
}