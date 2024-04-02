
import { useEffect, useRef, useState, useCallback } from "react";
import ItemsSlide from './ItemsSlide';
import axios from 'axios';
import { TMDBOptions } from '@/app/client/helpers/TMDB_API';
import Slider from "react-slick";
import { LinksType } from "./Search";
import { ResultType } from "@/app/lib/types";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io"


export default function ItemsSlides({
  links, title, searchTerm
}: {
  links: LinksType[0],
  title: string,
  searchTerm: string
}) {

  const sliderRef  = useRef<Slider | null>(null)

  const [datas, setDatas] = useState<Data[]>([])
  // const [nOfSlides, setNOfSlides] = useState(4);
  const [noMorePages, setNoMorePages] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLoadingNewSlides, setIsLoadingNewSlides] = 
  useState(false);
  // const [prevSlides, setPrevSlides] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0)
  const [canCheckNextSlide, setCanCheckNextSlide] = useState(true)
  const [page, setPage] = useState(1)


/* getData API calls*/
  useEffect(() => {
    ;(async () => {
      try {
        if (noMorePages) return
  
        let newData: Data = await axios(
          `${links.beforeStr}${searchTerm}${links.afterStr}${page}`,
          TMDBOptions
        ).then(res => res.data)
  
        if ('error' in newData) throw new Error('error')

        setDatas(prev => {
          // if (!prev?.[0]?.results) return newData
          if (prev?.[0]?.results?.[0]?.id === newData?.results?.[0]?.id || !newData.results.length) {
            return prev
          }
          
          return [
            ...prev,
            newData
          ]
        })
        
        // setData(prev => {
        //   if (!prev?.results) return newData
        //   if (prev?.results?.[0]?.id === newData?.results?.[0]?.id) {
        //     return prev
        //   }
          
        //   return {
        //     ...prev,
        //     ...newData,
        //     results:  [ ...prev.results, ...newData.results ]
        //   }
        // })
        

      } catch (error) {
        console.log(error)
      } finally {
        // setIsLoadingNewSlides(false)
      }
      
    })()

  }, [
    page, noMorePages, links.beforeStr, links.afterStr, searchTerm
  ])


  useEffect( ()=> {
    if (noMorePages || !canCheckNextSlide) return

    const slides = sliderRef.current?.props?.children as 
    React.ReactNode[]
    if(!slides) return

    // console.log(slides, page, datas)

    const cheIfNextIsAvailable = async () => {
      try {
        let newData: Data = await axios(
          `${links.beforeStr}${searchTerm}${links.afterStr}${page+1}`,
          TMDBOptions
        ).then(res => res.data)
  
        if (
          !newData.results.length || 
          page+1 > newData.total_pages 
        ) {
          setNoMorePages(true)
        }

        if (page < 3 && newData.total_pages > page) {
          setPage(page+1)
        }

      } catch (error) {
        console.log(error)
      }
    }
    cheIfNextIsAvailable()

  }, [noMorePages, links, searchTerm, page, sliderRef, canCheckNextSlide]) 


  useEffect(() => {
    if ( noMorePages && (
      sliderRef.current?.props?.children as 
      React.ReactNode[]
      )?.length <= 1
    ) setIsLastSlide(true)
    
  }, [sliderRef, noMorePages])


  const settings = {
    dots: datas.length < 10,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    className: " bg-blue-500p ",
    
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    
    beforeChange: (current: number, next: number) => {
      setPrevSlide(current)
      setCanCheckNextSlide(false)
    },
    
    afterChange: (current: number) => {
      const slides = sliderRef.current?.props?.children as 
      React.ReactNode[]
      if(!slides) return
      
      if (!noMorePages && current>prevSlide && current+2 >= slides.length) {
        setCanCheckNextSlide(true)
        setPage(prev => prev + 1)
      }

      if (noMorePages && current>= slides.length-1) {
        setIsLastSlide(true)
      } else {
        setIsLastSlide(false)
      }

      if (!current) {
        setIsFirstSlide(true)
      } else {
        setIsFirstSlide(false)
      }
    }
    
  };

  console.log(datas, page, title)
  // console.log(datas.length)
  // console.log(prevSlide)


  return (
    <>
    <div className=" bg-sky-900p min-h-full">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {datas.length> 0? title : 'No results found'}
      </h2>

      <Slider  {...settings} ref={sliderRef}>
        {
          datas?.map(({results}, i) => {
            return (
              <ItemsSlide  
                key={i}
                results={results}
                title={title}
                page={page}
                links={links}
                sliderRef={sliderRef}
              />  
            )
          })
        }
      </Slider>


      {
        datas.length > 0 && (
          <div className=" flex justify-between">
              <button type="button" disabled={isFirstSlide}
                onClick={() => sliderRef.current?.slickPrev()}
                className=" bg-amber-400p rounded p-2 px-4 m-2 disabled:opacity-50" 
              ><IoIosArrowDropleftCircle size={30} color="#fabe36"/>
              </button>
              <button type="button" disabled={isLastSlide}
                onClick={() => {
                  sliderRef.current?.slickNext()
                }}
                className=" bg-green-400p rounded p-2 px-4 m-2 disabled:opacity-50" 
              >
                <IoIosArrowDroprightCircle size={30} color="#4ede83"/>
              </button>
          </div>
        )
      }
    </div>
    </>
  )
}






export function NextArrow({
  className, style, onClick
}: {
  className?: string,
  style?: React.CSSProperties,
  onClick?: () => void
}) {
  return (
    <div
      className={className}
      style={{ ...style, ...customStyles}}
      onClick={onClick}
    />
  );
}

export function PrevArrow({
  className, style, onClick
}: {
  className?: string,
  style?: React.CSSProperties,
  onClick?: () => void
}) {
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

type Data = {
  page: number
  results: ResultType[]
  total_pages: number
  total_results: number
}

