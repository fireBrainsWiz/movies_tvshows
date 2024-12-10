
import { useEffect, useRef, useState, useCallback } from "react";
import ItemsSlide from './ItemsSlide';
import axios from 'axios';
import { TMDBOptions } from '@/app/client/helpers/TMDB_API';
import Slider from "react-slick";
import { LinksType } from "./Search";
import { ResultType } from "@/app/lib/types";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io"
import { Modal } from "./components/people/modal/Modal";
import ToViewSVG from "./components/people/modal/ToViewSVG";
import { ToViewCoordsAndInfo, CardData} from "./components/people/PopularPeopleCards";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { PopularPeopleList } from "@/app/(__pages__)/popular-people/layout";
import { CollectionPartsModal } from "./components/collections/CollectionPartsModal";

let timerId: ReturnType<typeof setTimeout>;

export default function ItemsSlides({
  links, title, searchTerm, itemsContainerParentRef
}: {
  links: LinksType[0],
  title: string,
  searchTerm: string
  itemsContainerParentRef: React.RefObject<HTMLDivElement | null>
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

  const [currentSlide, setCurrentSlide] = useState(0)

  const [isActiveToViewSVG, setIsActiveToViewSVG] = useState(false)

  const [cardData, setCardData] = 
  useState<CardData>({
    ...{} as PopularPeopleList['results'][number],
    ...{} as MediaTypeInfoType['personDetails'],
    imageColor: '',
    dominantColor: ''
  })

  const [toViewCoordsAndInfo, setToViewCoordsAndInfo] = 
  useState<ToViewCoordsAndInfo>({
    innerHeight,
    scrollY: itemsContainerParentRef?.current?.scrollTop || 0,
    scrollHeight: itemsContainerParentRef?.current?.scrollHeight || 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    i: 0,
    isActiveToViewSVG
  })

  const [isOpenCollectionParts, setIsOpenCollectionParts] = useState(false);
  const [visibleAreaBoundingRect, setVisibleAreaBoundingRect] = useState<VisibleAreaBoundingRect>({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });

  const [clickedCollectionId, setClickedCollectionId] = useState<number | null>(null);

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

// check if next slide is available
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

  // check if last slide
  useEffect(() => {
    if ( noMorePages && (
      sliderRef.current?.props?.children as 
      React.ReactNode[]
      )?.length <= 1
    ) setIsLastSlide(true)
    
  }, [sliderRef, noMorePages])

  //collection parts
  useEffect(() => {
    function fn () {
        clearTimeout(timerId)
        
        timerId = setTimeout(() => {
          const elem = itemsContainerParentRef.current;
          if (!elem) return;

          const bounds = 
          elem.parentElement?.parentElement?.parentElement?.parentElement?.getBoundingClientRect();

          setVisibleAreaBoundingRect({
              top: elem.getBoundingClientRect()?.top || 0,
              left: bounds?.left || 0,
              width: bounds?.width || 0,
              height: bounds?.height || 0
          });
        }, 300)

    }
    fn()

    addEventListener('resize', fn)
    return () => {
        removeEventListener('resize', fn)
    }

  }, [itemsContainerParentRef])


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
      // console.log('zaa')
      setCurrentSlide(current)
      
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

  // console.log(datas, page, title, noMorePages, canCheckNextSlide)
  // console.log(datas.length)
  // console.log(prevSlide, currentSlide)
  // console.log(visibleAreaBoundingRect)


// return null
  return (
    <div className=" bg-sky-900p ">
      <h2 className="text-3xl font-bold mb-4 text-center ">
        {datas.length> 0? title : 'No results found'}
      </h2>

      <div>
        <Slider  {...settings} ref={sliderRef}>
          {
            datas?.map(({results}, i) => {
              return (
                // (i === currentSlide) ? (
                  <ItemsSlide  
                    key={i}
                    results={results}
                    title={title}
                    page={page}
                    itemsContainerParentRef={itemsContainerParentRef}
                    currentSlide={currentSlide}
                    slideIndex={i}

                    setIsActiveToViewSVG={setIsActiveToViewSVG}
                    setToViewCoordsAndInfo={setToViewCoordsAndInfo}
                    setCardData={setCardData}

                    isOpenCollectionParts={isOpenCollectionParts}
                    setIsOpenCollectionParts={setIsOpenCollectionParts}
                    setClickedCollectionId={setClickedCollectionId}
                  />  
                // ) : <div key={i}></div>
              )
            })
          }
        </Slider>


          {
            title === 'People' && (
              <>
                {
                  isActiveToViewSVG && (
                    <Modal 
                      isActiveToViewSVG={isActiveToViewSVG}
                      setIsActiveToViewSVG={setIsActiveToViewSVG}
                      itemsContainerParentRef={itemsContainerParentRef}
                    />
                  )
                }
          
                <ToViewSVG
                  key={toViewCoordsAndInfo.i} 
                  coordsAndInfo={toViewCoordsAndInfo}
                  isActiveToViewSVG={isActiveToViewSVG}
                  setIsActiveToViewSVG={setIsActiveToViewSVG}
                  cardData={cardData}
                  itemsContainerParentRef={itemsContainerParentRef}
                />
              </>
            )
          }


          {
            title === 'Collections' && (
              <>
                <CollectionPartsModal 
                  isOpenCollectionParts={isOpenCollectionParts}
                  setIsOpenCollectionParts={setIsOpenCollectionParts}
                  itemsContainerParentRef={itemsContainerParentRef}
                  title={title}
                  visibleAreaBoundingRect={visibleAreaBoundingRect}
                  clickedCollectionId={clickedCollectionId}
                />
              </>
            )
          }

      </div>
      {/* <SlideTest 
        page={page}
        title={title}
        itemsContainerParentRef={itemsContainerParentRef}
        datas={datas}
      /> */}

      <div>
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

    </div>
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

export type Data = {
  page: number
  results: ResultType[]
  total_pages: number
  total_results: number
}

export type VisibleAreaBoundingRect  = {
  top: number;
  left: number;
  width: number;
  height: number
}