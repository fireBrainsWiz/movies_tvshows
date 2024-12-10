
import { useEffect, useRef } from "react";
import MovieBanner from "./MovieBanner";
import Slider, { Settings as SliderSettings, CustomArrowProps } from "react-slick";


let timerId: ReturnType<typeof setTimeout>

export default function MovieBanners() {

  const swiperContainerWrapperRef = useRef<HTMLDivElement>(null)
  const swiperElRef = useRef<Slider>(null);


  useEffect(() => {
    const sliderContainer = swiperContainerWrapperRef.current
    const slider = swiperElRef.current
    const throtle = 100

    if (!slider || !sliderContainer) return 
    
    function onWheel(e: WheelEvent) {
    if (!slider) return 


      e.preventDefault()
      
      if (e.deltaY > 0) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          slider.slickNext()
        }, throtle)

      } else {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          slider.slickPrev()
        }, throtle)
      }
    }

    sliderContainer.addEventListener('wheel', onWheel)
    
    return () => {
      sliderContainer.removeEventListener('wheel', onWheel)
    }
  }, [])

  const settings: SliderSettings = {
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
    <div ref={swiperContainerWrapperRef}
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






export function PrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStylesPrev}}
      onClick={onClick}
    />
  );
}

export function NextArrow(props: CustomArrowProps & {isLoading?: boolean}) {
  const { className, style, onClick, isLoading } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...customStylesNext}}
      onClick={onClick}
    />
  );
}


const customStylesPrev: React.CSSProperties = {
  // display: "block", 
  width: "30px",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "0%",
  zIndex: "10",
}


const customStylesNext: React.CSSProperties = {
  // display: "block", 
  width: "30px",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  right: "0%",
  zIndex: "10",
}