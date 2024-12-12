'use client';
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ToViewCoordsAndInfo } from "./PopularPeopleCards";
import Image from "next/image";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { PopularPeopleList } from "../layout";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import { calculateRuntime, getGenderByNumber } from "@/app/modals/card/lib/utils";
import { getSortedPosterPathsOfKnownFors } from "@/app/modals/card/lib/utils";
import { MoreButton } from "./MoreButton";
import Result from "../../components/Result";
import MoviesOrTVshowsLinksContext from "../../context/MoviesOrTVshowsLinksContext";
import CardBeingViewedContext from "../../context/CardBeingViewedContext";
import { ResultType } from "@/app/lib/types";
import isIOS from "@/app/client/helpers/isIOS";


let timerId: ReturnType<typeof setTimeout>,
moveToCenterTimerId: ReturnType<typeof setTimeout>,
timer1: ReturnType<typeof setTimeout>,
timer2: ReturnType<typeof setTimeout>,
timer3: ReturnType<typeof setTimeout>;

export  default function ToViewSVG({
  coordsAndInfo,
  isActiveToViewSVG,
  setIsActiveToViewSVG,
  cardData
}: {
  coordsAndInfo: ToViewCoordsAndInfo
  isActiveToViewSVG: boolean,
  setIsActiveToViewSVG: React.Dispatch<React.SetStateAction<boolean>>,
  cardData: PopularPeopleList['results'][number] & 
  MediaTypeInfoType['personDetails'] & 
  {imageColor: string, dominantColor: string}
}) {

  const svgRef = useRef<SVGSVGElement | null>(null);
  const lastPathRef = useRef<SVGPathElement | null>(null);

  const { setMoviesOrTVshows, moviesOrTVshows } = useContext(MoviesOrTVshowsLinksContext)

  const [moveToCenter, setMoveToCenter] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isEndedAnimationOfLastPath, setIsEndedAnimationOfLastPath] = useState(false);

  // const [hasFailedImage, setHasFailedImage] = useState(false)


  // console.log(moviesOrTVshows)


  useEffect(() => {
    setMoveToCenter(false);
  }, [coordsAndInfo.i]);


  useEffect(() => {
    if (!coordsAndInfo.isActiveToViewSVG) return;
    clearTimeout(moveToCenterTimerId)
    
    moveToCenterTimerId = setTimeout(() => {
      setMoveToCenter(true);
    }, 300);

    return ()=> {
      clearTimeout(moveToCenterTimerId)
    }

  }, [coordsAndInfo]);

// resize
  useEffect(() => {
    function fn() {
      clearTimeout(timerId)

      setTimeout(()=> {
        setInnerWidth(0)
        setInnerWidth(window.innerWidth)
      }, 100)
    }
    fn()

    addEventListener('resize', fn)
    return () => {
      removeEventListener('resize', fn)
      clearTimeout(timerId)
    }
  }, [])


  // paths animation
  useEffect(()=>{
    const svg = svgRef.current;
    if (!svg || !isActiveToViewSVG) {
      setIsEndedAnimationOfLastPath(false)
      return
    };

    const svgPaths =  
      (Array.from(
        svg.querySelectorAll('g[id="Artboard 4 2"] path')
      ) as SVGPathElement[])
      .sort((a, b) => Number(a.id) - Number(b.id))
    ;

    function listenToLastPath(e: any) {
      if (e.elapsedTime <= 1) return 
      // console.log('AAAAAAAAAAAAA', e.elapsedTime)
      setIsEndedAnimationOfLastPath(true)
    };
    
    
    svgPaths.forEach((path, i) => {
      path.style.fillOpacity = `0`;
      path.style.fill = cardData?.dominantColor;
      const {x, y, width, height} = path.getBBox();
      const {x:xx, y:yy, width:ww, height:hh } = 
      path.getBoundingClientRect();
      // console.log(path.getTotalLength())
      // path.style.rx = `${x + 10}px`;//to be uncommented
      // path.pathLength = `${y + 10}px`;
      // console.log({
      //   x, y, width, height,
      //   xx, yy, ww, hh, BB: path.getBoundingClientRect(),
      //   CC: path.getTotalLength(),
      //   D: ''
      // })
  

      const transitionValues = {
        one: `translateX(${-(y**2)}px) translateY(${-(x**2)}px )`,
        two: `translateX(${-(x**2)}px) translateY(${-(y**2)}px )`,
        three: `translateX(${-(x**2)}px) translateY(${-(y**2*Math.random())}px )`,
        four: `translateX(${-(y**2*Math.random())}px) translateY(${-(x**2)}px )`,
        five: `translateX(${-(y**2*Math.random())}px) translateY(${-(x**2*Math.random())}px )`,
        six: `translateX(${(y**2*Math.random())}px) translateY(${-(x**2*Math.random())}px )`,
        seven: `translateX(${-(y**2*Math.random())}px) translateY(${(x**2*Math.random())}px )`,
        eight: `translateX(${
          (window.innerHeight)
        }px) translateY(${
          (window.innerHeight)
        }px )`,
        nine: `translateX(${
          (-window.innerWidth/5)
        }px) translateY(${
          (y-window.innerHeight/5000)
        }px)`,
        ten: `translateX(${
          (x-window.innerWidth/5000)
        }px) translateY(${
          (-window.innerHeight/5)
        }px)`,
        eleven: `translateX(${
          (y-window.innerWidth/5)
        }px) translateY(${
          (-window.innerHeight/5000)
        }px)`,
        twelve: `translateX(${
          (y-(window.innerWidth/Math.random())/5)
        }px) translateY(${
          (-window.innerHeight/5000)
        }px)`,
        thirteen: `translateX(${
          (y-(window.innerWidth/Math.random())/5)
        }px) translateY(${
          (x-(window.innerHeight/Math.random())/5000)
        }px)`,
        fourtheen: `translateX(${
          (y-(window.innerWidth/Math.random())/5)
        }px) translateY(${
          (-Math.sqrt(y**2+x**2)-(window.innerHeight/Math.random())/5000)
        }px)`,
        fifteen: `translateX(${
          (Math.clz32(y**2+x**2))-(y-(window.innerWidth/Math.random())/5)
        }px) translateY(${
          (-Math.sqrt(y**2+x**2)-(window.innerHeight/Math.random())/5000)
        }px)`,
      } 
      
      path.style.transition = `transform 1s`;
      path.style.transform = transitionValues.fifteen;

      // console.log(transitionValues.nine)
    })

    const lastPath = lastPathRef.current 
    lastPath?.addEventListener('transitionend', listenToLastPath)

 
    


    timer1 = setTimeout(() => {
      svgPaths.forEach((path, i) => {
      path.style.transition = `transform 2s`;

        timer2 = setTimeout(() => {
          timer3 = setTimeout(()=> {
            path.style.transform = `translateX(0)`;
          }, 1*100* (Math.random()+1))

          path.style.fillOpacity =  `1`;
        }, i*5 );
      })
    }, 1*500)

    // console.log(svgPaths, svgPaths.length)

    return ()=>{
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)

      lastPath?.removeEventListener(
        'transitionend', listenToLastPath
      )
    }

  }, [isActiveToViewSVG, cardData?.dominantColor, lastPathRef]);

  // console.log(isEndedAnimationOfLastPath)


  const biggerWidth = innerWidth > 640 
    ? coordsAndInfo.width * 8 //1.7 
    : coordsAndInfo.width * 2.1 //1.5
  ;

  const bigerHeight = innerHeight > 500
    ? (coordsAndInfo.height * 3 < innerHeight)? coordsAndInfo.height * 3: innerHeight // 2
    : coordsAndInfo.height * 1.5 // 1.1
  ;

  // if (!cardData) return null
  function handleModalClick() {
    document.body.style.overflow = 'auto';
    setIsActiveToViewSVG(false);
  }

  function handleModalClick2(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    e.stopPropagation();
    // document.body.style.overflow = 'auto';
    // setIsActiveToViewSVG(true);
    // console.log(e.isPropagationStopped())
  }

  // <span className="text-sm italic text-whitep">
  //           {
  //             personDetail?.deathday && 
  //             personDetail?.birthday
  //             ? (
  //               Number(personDetail.deathday.slice(0,4)) -
  //               Number(personDetail.birthday.slice(0,4))
  //             )
  //             : personDetail?.birthday
  //               ? (
  //                 new Date().getFullYear() -
  //                 Number(personDetail.birthday.slice(0,4))
  //               )
  //               : <span className="text-[9px]">N/A</span>
  //           }
  //         </span>

  if (!isActiveToViewSVG) return null


return (
  <div 
    key={innerWidth}
    onClick={handleModalClick}
    className={`to-view-svg  rounded-2xl absolute top-0 transition-[left_top_width_height_scale] ${moveToCenter? 'duration-[200ms]' : 'duration-[500ms]'}  z-[${isActiveToViewSVG? '10' : '-1'}] 
    ${isActiveToViewSVG? 'scale-100' : 'scale-0'} origin-[100%_50%] `}
    style={{
      left: moveToCenter && isActiveToViewSVG
        ? ((innerWidth / 2) - ((biggerWidth) / 2)) + 'px' 
        : coordsAndInfo.x + 'px',

      top: moveToCenter && isActiveToViewSVG
        ? `${coordsAndInfo.scrollY + (coordsAndInfo.innerHeight / 2) - ((bigerHeight) / 2)}px`
        : coordsAndInfo.y + coordsAndInfo.scrollY + 'px',

      width: moveToCenter && isActiveToViewSVG
        ? biggerWidth + 'px'
        : coordsAndInfo.width + 'px',
      height: 
        moveToCenter && isActiveToViewSVG
        ? bigerHeight + 'px' 
        : coordsAndInfo.height + 'px'
    }}
  >
   

    <div className="border-amber-400p border-4p w-full sm:max-w-[65vmin] relative mx-auto "
    >
      <svg 
      width="100%" height="100%" viewBox="0 0 173 246" fill="none" xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        // onClick={handleCardClick} 
        className="cursor-pointerp "
        >
    

        <g onClick={handleModalClick2} 
        >
          <g>
            <rect x="3" y="34" width="166" height="210" fill={'#44444482'} />
            <rect x="3" y="34" width="166" height="209" fill={cardData?.imageColor} fillOpacity={0.5}
            />
          </g>

          <g>
            <foreignObject x="12" y="3" width="66" height="65" >
              <div className={`w-full h-full  rounded-full overflow-hidden flex justify-center `}
                style={{backgroundColor: cardData?.imageColor || ''}}
              >
                <Image 
                  // ref={imageRef}
                  src={
                    cardData?.profile_path
                    ?  ImagePath + cardData?.profile_path
                    : '/no-image.png'
                  }
                  alt={cardData?.name || 'profile image'} 
                  width={100} 
                  height={150} 
                  // priority
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
                  className="max-w-full h-auto object-contain "
                />
              </div>
            </foreignObject>

            <foreignObject  x="81" y="35" width="87" height="37">
              <div className="w-full h-full  px-2 text-[8px] leading-[12px]">
                <p className="text-end my-[2px] bg-red-500p">{cardData?.known_for_department}</p>
                {
                  cardData?.gender &&
                    <p className="text-end text-[6px] px-2 leading-[10px] truncate">{
                      getGenderByNumber(cardData.gender)
                    }</p>
                }
              </div>
            </foreignObject>
            

            <foreignObject  x="3" y="78" width="167" height="165">
              <div className="px-1p h-[45%] grid text-[8px] leading-[12px] bg-blue-500p py-2 pt-0">
                <p className="text-[10px] leading-[14px] pt-0 truncate underline px-1">
                  {cardData?.name}
                </p>
                <div className="grid">
                  {
                    cardData?.birthday && 
                    <p className="truncate w-[95%] grid grid-cols-[70%_auto] justify-between px-1">
                    <span>{cardData.birthday}</span>
                    <span className="italic ">
                        {
                        cardData.deathday && 
                        cardData.birthday
                        ? (
                          Number(cardData.deathday.slice(0,4)) -
                          Number(cardData.birthday.slice(0,4))
                        )
                        : cardData?.birthday
                          ? (
                            new Date().getFullYear() -
                            Number(cardData.birthday.slice(0,4))
                          )
                          : <span className="text-[9px]">N/A</span>
                      }
                    </span>
                  </p>
                  }
                  
                  {
                    cardData?.place_of_birth &&
                    <p className="truncate w-[90%] mb-1 px-1">{cardData.place_of_birth}</p>
                  }
                  <p className="grid justify-endp justify-center bg-red-500p px-2">
                    <MoreButton id={cardData?.id} personName={cardData?.name}/>
                  </p>
                </div>
                {/* <div className="w-full h-full grid grid-cols-1 bg-red-700 mt-10"></div> */}
              </div>
            </foreignObject>
          </g>

          
          <g 
            style={{
              opacity: isEndedAnimationOfLastPath ? 0 : 1
            }}
          id="Artboard 4 2" clipPath="url(#clip0_1193_541)">
          <g id="circle">
          <path id="67" d="M23.0002 11.0016C21.8002 12.0016 20.7002 13.2016 19.7002 14.4016L16.7002 13.5016C17.5002 12.5016 18.4002 11.5016 19.3002 10.6016L23.0002 11.0016Z" fill={cardData?.dominantColor}/>
          <path id="66" d="M25.6999 8.79922C24.6999 9.49922 23.7999 10.1992 22.9999 10.9992L19.3999 10.4992C20.7999 9.09922 22.2999 7.79922 23.8999 6.69922H25.3999L25.6999 8.79922Z" fill={cardData?.dominantColor}/>
          <path id="34" d="M79 45.3008C78.8 46.2008 78.5 47.1008 78.1 48.0008H75C75.3 47.1008 75.7 46.2008 75.9 45.3008H79Z" fill={cardData?.dominantColor}/>
          <path id="31" d="M74.8002 54.6016C74.2002 55.6016 73.5002 56.5016 72.8002 57.4016L70.2002 56.1016C71.2002 54.8016 72.1002 53.5016 72.9002 52.1016C73.0002 52.1016 74.8002 54.6016 74.8002 54.6016Z" fill={cardData?.dominantColor}/>
          <path id="30" d="M72.9001 57.4008C72.4001 58.1008 71.8001 58.8008 71.2001 59.5008L68.6001 58.2008C69.2001 57.5008 69.8001 56.9008 70.4001 56.2008C70.3001 56.1008 72.9001 57.4008 72.9001 57.4008Z" fill={cardData?.dominantColor}/>
          <path id="29" d="M71.2 59.5004C70.3 60.5004 69.3 61.5004 68.3 62.3004L67 59.7004C67.5 59.2004 68.1 58.7004 68.6 58.2004C68.5 58.1004 71.1 59.5004 71.2 59.5004Z" fill={cardData?.dominantColor}/>
          <path id="28" d="M68.3002 62.2992C67.5002 62.9992 66.8002 63.5992 66.0002 64.1992L64.2002 61.9992C65.2002 61.2992 66.1002 60.4992 67.0002 59.6992L68.3002 62.2992Z" fill={cardData?.dominantColor}/>
          <path id="27" d="M65.9 64.2C65.1 64.9 64.2 65.4 63.2 66L60.5 64.3C61.7 63.6 62.9 62.8 64 62C64.2 62 65.9 64.2 65.9 64.2Z" fill={cardData?.dominantColor}/>
          <path id="26" d="M63.3 66.0008C62.5 66.5008 61.7 67.0008 60.8 67.4008L59 65.1008C59.5 64.8008 60.1 64.6008 60.6 64.3008C60.7 64.3008 63.3 66.0008 63.3 66.0008Z" fill={cardData?.dominantColor}/>
          <path id="25" d="M60.8002 67.4016C58.9002 68.4016 56.8002 69.2016 54.7002 69.8016L56.2002 66.3016C57.2002 65.9016 58.1002 65.5016 59.0002 65.1016C59.1002 65.1016 60.8002 67.4016 60.8002 67.4016Z" fill={cardData?.dominantColor}/>
          <path id="24" d="M56.3001 66.3984L54.8001 69.8984C54.7001 69.8984 54.7001 69.8984 54.6001 69.9984L51.1001 67.9984C52.8001 67.4984 54.6001 66.9984 56.3001 66.3984Z" fill={cardData?.dominantColor}/>
          <path id="23" d="M54.5001 69.8984C53.1001 70.2984 51.6001 70.6984 50.1001 70.8984V68.0984C50.4001 67.9984 50.7001 67.9984 51.0001 67.8984L54.5001 69.8984Z" fill={cardData?.dominantColor}/>
          <path id="22" d="M50.1001 70.9002C49.0001 71.1002 47.8001 71.2002 46.7001 71.3002L46.1001 68.5002C47.4001 68.4002 48.8001 68.3002 50.1001 68.1002C50.1001 68.0002 50.1001 70.9002 50.1001 70.9002Z" fill={cardData?.dominantColor}/>
          <path id="21" d="M46.6998 71.2C45.9998 71.3 45.2998 71.3 44.5998 71.3C44.1998 71.3 43.6998 71.3 43.2998 71.3L43.4998 68.5C43.8998 68.5 44.2998 68.5 44.5998 68.5C45.0998 68.5 45.5998 68.5 46.0998 68.5L46.6998 71.2Z" fill={cardData?.dominantColor}/>
          <path id="20" d="M43.4998 68.5008L43.2998 71.3008C41.8998 71.3008 40.5998 71.1008 39.2998 70.9008L41.3998 68.3008C42.0998 68.4008 42.7998 68.5008 43.4998 68.5008Z" fill={cardData?.dominantColor}/>
          <path id="19" d="M41.4002 68.3008L39.3002 70.9008C38.5002 70.8008 37.8002 70.7008 37.0002 70.5008L35.7002 67.3008C37.5002 67.8008 39.5002 68.2008 41.4002 68.3008Z" fill={cardData?.dominantColor}/>
          <path id="18" d="M36.9999 70.5008C35.0999 70.1008 33.1999 69.5008 31.3999 68.8008L33.9999 66.8008C34.5999 67.0008 35.0999 67.2008 35.6999 67.3008L36.9999 70.5008Z" fill={cardData?.dominantColor}/>
          <path id="17" d="M33.9999 66.7992L31.3999 68.7992C30.4999 68.4992 29.6999 68.0992 28.8999 67.6992L29.0999 64.6992C30.5999 65.3992 32.2999 66.1992 33.9999 66.7992Z" fill={cardData?.dominantColor}/>
          <path id="16" d="M29.1001 64.5984L28.9001 67.5984C28.0001 67.0984 27.0001 66.5984 26.1001 66.0984L27.0001 63.3984C27.7001 63.7984 28.4001 64.1984 29.1001 64.5984Z" fill={cardData?.dominantColor}/>
          <path id="15" d="M27.0001 63.3984L26.1001 66.0984C25.3001 65.5984 24.4001 64.9984 23.6001 64.3984L24.9001 61.8984C25.6001 62.4984 26.3001 62.9984 27.0001 63.3984Z" fill={cardData?.dominantColor}/>
          <path id="14" d="M24.8999 61.9992L23.5999 64.4992C22.4999 63.6992 21.3999 62.7992 20.3999 61.7992L22.7999 60.1992C23.4999 60.7992 24.1999 61.3992 24.8999 61.9992Z" fill={cardData?.dominantColor}/>
          <path id="13" d="M22.8001 60.1992L20.4001 61.7992C19.8001 61.1992 19.2001 60.5992 18.6001 59.9992L20.8001 58.1992C21.4001 58.8992 22.1001 59.5992 22.8001 60.1992Z" fill={cardData?.dominantColor}/>
          <path id="12" d="M20.7999 58.1984L18.5999 59.9984C17.7999 59.1984 17.0999 58.2984 16.3999 57.2984L18.8999 55.8984C19.3999 56.7984 20.0999 57.4984 20.7999 58.1984Z" fill={cardData?.dominantColor}/>
          <path id="11" d="M18.8002 56.0016L16.3002 57.4016C15.9002 56.9016 15.5002 56.4016 15.2002 55.9016L16.1002 54.1016H17.4002C17.9002 54.7016 18.3002 55.4016 18.8002 56.0016Z" fill={cardData?.dominantColor}/>
          <path id="9" d="M17.4001 54.1H16.1001L16.6001 53C16.9001 53.3 17.2001 53.7 17.4001 54.1Z" fill={cardData?.dominantColor}/>
          <path id="10" d="M16.1 53.9984L15.2 55.7984C14.8 55.1984 14.4 54.5984 14 53.8984L16.1 53.9984Z" fill={cardData?.dominantColor}/>
          <path id="8" d="M16.7001 52.9016L16.1001 54.0016H14.1001C13.7001 53.4016 13.4001 52.8016 13.1001 52.1016L14.5001 49.7016L14.9001 49.6016C15.4001 50.8016 16.0001 51.9016 16.7001 52.9016Z" fill={cardData?.dominantColor}/>
          <path id="7" d="M14.4001 49.6992L13.0001 52.0992C12.7001 51.4992 12.4001 50.8992 12.1001 50.1992L14.4001 49.6992Z" fill={cardData?.dominantColor}/>
          <path id="6" d="M14.7001 49.2L14.4001 49.7L12.1001 50.2C11.7001 49.4 11.4001 48.5 11.1001 47.6L13.2001 45C13.6001 46.5 14.1001 47.9 14.7001 49.2Z" fill={cardData?.dominantColor}/>
          <path id="5" d="M13.0998 44.9984L10.9998 47.5984C10.4998 46.2984 10.0998 44.8984 9.7998 43.3984L12.3998 42.3984C12.6998 43.3984 12.8998 44.1984 13.0998 44.9984Z" fill={cardData?.dominantColor}/>
          <path id="4" d="M12.5002 42.5008L9.9002 43.5008C9.7002 42.4008 9.5002 41.3008 9.3002 40.2008C9.3002 40.0008 9.2002 39.8008 9.2002 39.6008L10.6002 38.8008L12.2002 40.6008C12.2002 41.2008 12.4002 41.9008 12.5002 42.5008Z" fill={cardData?.dominantColor}/>
          <path id="3" d="M12.2001 40.6016L10.6001 38.8016L11.8001 38.1016C12.1001 38.8016 12.1001 39.7016 12.1001 40.2016C12.1001 40.3016 12.1001 40.5016 12.2001 40.6016Z" fill={cardData?.dominantColor}/>
          <path id="1" d="M11.7999 38.1011L10.5999 38.8011L9.3999 37.4011C9.4999 37.2011 9.7999 37.1011 9.9999 37.0011C10.9999 36.8011 11.4999 37.3011 11.7999 38.1011Z" fill={cardData?.dominantColor}/>
          <path id="2" d="M10.6 38.8008L9.2 39.6008C9 38.8008 8.9 37.9008 9.4 37.3008L10.6 38.8008Z" fill={cardData?.dominantColor}/>
          <path id="6.5" d="M14.9 49.5992L14.5 49.6992L14.8 49.1992C14.8 49.3992 14.8 49.4992 14.9 49.5992Z" fill={cardData?.dominantColor}/>
          <path id="32" d="M76.4 51.9016C75.9 52.8016 75.4 53.7016 74.9 54.6016L73 52.1016C73.4 51.4016 73.7 50.8016 74.1 50.1016L76.4 51.9016Z" fill={cardData?.dominantColor}/>
          <path id="68" d="M19.6999 14.2984C18.6999 15.3984 17.7999 16.5984 17.0999 17.8984L16.3999 13.8984C16.4999 13.6984 16.5999 13.5984 16.7999 13.3984C16.6999 13.3984 19.6999 14.2984 19.6999 14.2984Z" fill={cardData?.dominantColor}/>
          <path id="69" d="M16.9998 17.8984C16.3998 18.7984 15.8998 19.6984 15.3998 20.5984L13.2998 18.3984C14.1998 16.7984 15.1998 15.2984 16.1998 13.8984C16.3998 13.8984 16.9998 17.8984 16.9998 17.8984Z" fill={cardData?.dominantColor}/>
          <path id="70" d="M15.4998 20.6008C14.9998 21.6008 14.5998 22.5008 14.0998 23.5008L11.7998 21.5008C12.2998 20.4008 12.7998 19.4008 13.3998 18.3008L15.4998 20.6008Z" fill={cardData?.dominantColor}/>
          <path id="71" d="M14.1 23.5C13.6 24.7 13.2 25.9 12.9 27.1L11.2 26.4L11 23.8C11.3 23 11.6 22.3 11.9 21.5L14.1 23.5Z" fill={cardData?.dominantColor}/>
          <path id="72" d="M11.1998 26.4008L10.2998 26.0008C10.4998 25.2008 10.6998 24.5008 10.9998 23.8008L11.1998 26.4008Z" fill={cardData?.dominantColor}/>
          <path id="73" d="M11.7998 32.0984L9.2998 30.1984C9.4998 28.6984 9.7998 27.2984 10.1998 25.8984L11.0998 26.2984C11.1998 26.3984 11.7998 32.0984 11.7998 32.0984Z" fill={cardData?.dominantColor}/>
          <path id="74" d="M12.8998 27.0984C12.4998 28.6984 12.0998 30.3984 11.9998 32.1984L11.8998 32.0984L11.2998 26.3984L12.8998 27.0984Z" fill={cardData?.dominantColor}/>
          <path id="75" d="M11.9 32.3008L9 34.0008C9.1 32.8008 9.2 31.5008 9.4 30.3008L11.9 32.2008C11.8 32.1008 11.9 32.3008 11.9 32.3008Z" fill={cardData?.dominantColor}/>
          <path id="77" d="M11.9998 32.1992C11.9998 32.3992 11.8998 32.4992 11.8998 32.6992L11.7998 32.1992C11.8998 32.2992 11.9998 32.1992 11.9998 32.1992Z" fill={cardData?.dominantColor}/>
          <path id="65" d="M25.3999 6.69922H23.8999C24.3999 6.39922 24.7999 5.99922 25.2999 5.69922L25.3999 6.69922Z" fill={cardData?.dominantColor}/>
          <path id="64" d="M29.1999 6.69922C27.9999 7.29922 26.7999 7.99922 25.6999 8.79922L25.3999 6.69922H29.1999Z" fill={cardData?.dominantColor}/>
          <path id="63" d="M31.4998 5.50156C30.6998 5.80156 29.8998 6.20156 29.1998 6.60156H25.3998L25.2998 5.60156C26.6998 4.70156 28.1998 3.80156 29.7998 3.10156L31.4998 5.50156Z" fill={cardData?.dominantColor}/>
          <path id="62" d="M39.1002 3.30123C36.4002 3.80123 33.9002 4.50123 31.5002 5.60123L29.7002 3.30123C30.6002 2.90123 31.5002 2.50123 32.4002 2.20123C32.4002 2.10123 39.1002 3.30123 39.1002 3.30123Z" fill={cardData?.dominantColor}/>
          <path id="37" d="M80.2998 35.6C80.2998 36.7 80.1998 37.7 80.1998 38.8L77.2998 38.2C77.3998 37.4 77.3998 36.5 77.3998 35.6V35.5L80.2998 35.6Z" fill={cardData?.dominantColor}/>
          <path id="39" d="M80.2 33.3L78.5 31L79.9 30.5C80.1 31.4 80.2 32.3 80.2 33.3Z" fill={cardData?.dominantColor}/>
          <path id="40" d="M78.5 31.0008L77.1 31.5008C77 30.4008 76.8 29.3008 76.5 28.3008L78.5 31.0008Z" fill={cardData?.dominantColor}/>
          <path id="41" d="M79.8998 30.5008L78.4998 31.0008L76.4998 28.3008C76.3998 28.0008 76.3998 27.8008 76.2998 27.5008L78.8998 25.8008C79.3998 27.3008 79.6998 28.9008 79.8998 30.5008Z" fill={cardData?.dominantColor}/>
          <path id="42" d="M78.8998 25.7984L76.2998 27.4984C75.8998 25.9984 75.3998 24.4984 74.7998 23.0984L77.8998 22.8984C78.2998 23.7984 78.5998 24.7984 78.8998 25.7984Z" fill={cardData?.dominantColor}/>
          <path id="43" d="M77.8998 22.8016L74.7998 23.0016C74.3998 22.0016 73.8998 20.9016 73.2998 19.9016L76.1998 19.1016C76.8998 20.4016 77.4998 21.6016 77.8998 22.8016Z" fill={cardData?.dominantColor}/>
          <path id="44" d="M76.3001 19.2008L73.4001 20.0008C72.8001 19.0008 72.2001 18.0008 71.6001 17.1008L75.0001 16.8008C75.4001 17.6008 75.9001 18.4008 76.3001 19.2008Z" fill={cardData?.dominantColor}/>
          <path id="46" d="M72 12.7016L69.2 14.1016C69 13.8016 68.7 13.6016 68.5 13.3016L70 10.6016C70.7 11.3016 71.3 12.0016 72 12.7016Z" fill={cardData?.dominantColor}/>
          <path id="47" d="M70.0001 10.5992L68.5001 13.2992C67.4001 12.1992 66.3001 11.0992 65.1001 10.1992L67.9001 8.69922C68.7001 9.29922 69.4001 9.89922 70.0001 10.5992Z" fill={cardData?.dominantColor}/>
          <path id="48" d="M67.9 8.60156L65.1 10.1016C64.3 9.40156 63.4 8.80156 62.5 8.20156L65.4 6.60156C66.3 7.30156 67.1 8.00156 67.9 8.60156Z" fill={cardData?.dominantColor}/>
          <path id="51" d="M63.9999 5.70156L59.8999 6.60156L59.3999 4.20156L61.1999 4.10156C62.1999 4.60156 63.0999 5.10156 63.9999 5.70156Z" fill={cardData?.dominantColor}/>
          <path id="53" d="M61.2002 4.10156L59.4002 4.20156L59.2002 3.10156C59.9002 3.40156 60.5002 3.70156 61.2002 4.10156Z" fill={cardData?.dominantColor}/>
          <path id="55" d="M59.1002 6.30078C57.7002 5.60078 56.2002 5.00078 54.7002 4.50078L58.8002 4.30078L59.1002 6.30078Z" fill={cardData?.dominantColor}/>
          <path id="58" d="M53.3999 1.1L47.5999 3C47.1999 3 46.8999 2.9 46.4999 2.9L43.8999 0C44.0999 0 44.3999 0 44.5999 0C47.5999 0 50.5999 0.4 53.3999 1.1Z" fill={cardData?.dominantColor}/>
          <path id="59" d="M46.5002 2.9C45.9002 2.9 45.2002 2.8 44.6002 2.8C44.3002 2.8 43.9002 2.8 43.6002 2.8L42.2002 0.1C42.7002 0 43.3002 0 43.9002 0L46.5002 2.9Z" fill={cardData?.dominantColor}/>
          <path id="60" d="M43.5998 2.80156C42.6998 2.80156 41.7998 2.90156 40.7998 3.00156L39.7998 0.301563C40.5998 0.201563 41.3998 0.101562 42.0998 0.101562L43.5998 2.80156Z" fill={cardData?.dominantColor}/>
          <path id="61" d="M40.7999 3.00078C40.1999 3.10078 39.5999 3.10078 39.0999 3.20078L32.3999 2.10078C34.7999 1.20078 37.1999 0.600781 39.7999 0.300781L40.7999 3.00078Z" fill={cardData?.dominantColor}/>
          <path id="50" d="M59.9998 6.70156C59.8998 6.70156 59.8998 6.60156 59.7998 6.60156H59.9998V6.70156Z" fill={cardData?.dominantColor}/>
          <path id="36" d="M80.1999 38.7992C80.0999 39.8992 79.9999 40.9992 79.7999 41.9992L76.8999 41.6992C77.0999 40.4992 77.2999 39.3992 77.3999 38.1992L80.1999 38.7992Z" fill={cardData?.dominantColor}/>
          <path id="35" d="M79.6999 42.0016C79.4999 43.1016 79.2999 44.2016 78.8999 45.2016H75.8999C76.2999 44.0016 76.5999 42.8016 76.7999 41.6016L79.6999 42.0016Z" fill={cardData?.dominantColor}/>
          <path id="78" d="M11.9 32.8008C11.8 33.3008 11.8 33.9008 11.8 34.4008H9C9 34.2008 9 34.1008 9 33.9008L11.8 32.3008C11.9 32.3008 11.9 32.8008 11.9 32.8008Z" fill={cardData?.dominantColor}/>
          <path id="76" d="M11.9999 32.2016L11.8999 32.3016V32.1016L11.9999 32.2016Z" fill={cardData?.dominantColor}/>
          <path id="49" d="M65.3999 6.69922L62.4999 8.29922C61.6999 7.69922 60.7999 7.19922 59.8999 6.69922V6.59922L63.9999 5.69922C64.4999 5.99922 64.9999 6.29922 65.3999 6.69922Z" fill={cardData?.dominantColor}/>
          <path id="54" d="M59.4002 4.19844H58.9002L58.7002 2.89844C58.9002 2.89844 59.0002 2.99844 59.2002 3.09844L59.4002 4.19844Z" fill={cardData?.dominantColor}/>
          <path id="56" d="M58.8998 4.19844L54.7998 4.39844C53.9998 4.09844 53.1998 3.89844 52.2998 3.69844L57.4998 2.39844C57.8998 2.59844 58.2998 2.69844 58.6998 2.89844L58.8998 4.19844Z" fill={cardData?.dominantColor}/>
          <path id="52" d="M59.9999 6.59922H59.7999C59.5999 6.49922 59.3999 6.39922 59.0999 6.29922L58.8999 4.19922H59.3999L59.9999 6.59922Z" fill={cardData?.dominantColor}/>
          <path id="45" d="M74.9002 16.7992L71.5002 17.0992C70.8002 16.0992 70.0002 15.0992 69.2002 14.0992L72.0002 12.6992C73.0002 13.9992 74.0002 15.3992 74.9002 16.7992Z" fill={cardData?.dominantColor}/>
          <path id="57" d="M57.5001 2.4L52.3001 3.7C50.8001 3.3 49.2001 3 47.6001 2.9L53.3001 1C54.8001 1.4 56.2001 1.9 57.5001 2.4Z" fill={cardData?.dominantColor}/>
          <path id="38" d="M80.3001 35.6L77.4001 35.5C77.4001 34.2 77.3001 32.8 77.1001 31.5L78.5001 31L80.2001 33.3C80.3001 34 80.3001 34.8 80.3001 35.6Z" fill={cardData?.dominantColor}/>
          <path id="33" d="M78.1 47.8984C77.6 49.2984 77 50.5984 76.3 51.8984L74 50.0984C74.3 49.3984 74.7 48.6984 75 47.9984C75 47.8984 78.1 47.8984 78.1 47.8984Z" fill={cardData?.dominantColor}/>
          </g>
          <g id="u-shaped">
          <path 
          id="80" d="M9.0001 34.4H8.4001C8.0001 34.4 7.5001 34.5 7.1001 34.6L7.3001 32.5L9.0001 34.4Z" fill={cardData?.dominantColor}/>
          <path id="81" d="M7.4001 31.6016L7.3001 32.4016L6.6001 31.6016C6.9001 31.7016 7.1001 31.6016 7.4001 31.6016Z" fill={cardData?.dominantColor}/>
          <path id="82" d="M7.3001 32.5008L7.1001 34.6008C6.2001 34.8008 5.5001 35.3008 4.9001 35.9008L3.1001 33.4008C4.1001 32.6008 5.3001 32.0008 6.7001 31.8008L7.3001 32.5008Z" fill={cardData?.dominantColor}/>
          <path id="83" d="M4.9 35.8008C4.1 36.6008 3.6 37.6008 3.4 38.8008L2 34.3008C2.3 33.9008 2.7 33.6008 3.1 33.3008L4.9 35.8008Z" fill={cardData?.dominantColor}/>
          <path id="84" d="M3.4 38.9008V39.0008L0 40.0008V39.6008C0 37.6008 0.8 35.7008 2 34.3008L3.4 38.9008Z" fill={cardData?.dominantColor}/>
          <path id="85" d="M3.4 39C3.4 39.1 3.4 39.3 3.4 39.4V42L0 41.3V40L3.4 39Z" fill={cardData?.dominantColor}/>
          <path id="86" d="M3.4 42.0008V43.8008L1.5 44.6008L0 43.1008V41.3008L3.4 42.0008Z" fill={cardData?.dominantColor}/>
          <path id="87" d="M3.4 43.8008V46.5008L1.5 44.6008L3.4 43.8008Z" fill={cardData?.dominantColor}/>
          <path id="88" d="M1.5 44.6016L0 45.3016V43.1016L1.5 44.6016Z" fill={cardData?.dominantColor}/>
          <path id="89" d="M3.4 46.5016V47.3016L0 49.5016V45.3016L1.5 44.6016L3.4 46.5016Z" fill={cardData?.dominantColor}/>
          <path id="90" d="M3.4 47.3008V50.3008L0 50.7008V49.5008L3.4 47.3008Z" fill={cardData?.dominantColor}/>
          <path id="91" d="M3.4 50.3008V52.1008L0 52.2008V50.7008L3.4 50.3008Z" fill={cardData?.dominantColor}/>
          <path id="92" d="M3.4 52.1016V54.4016L0 55.2016V52.2016L3.4 52.1016Z" fill={cardData?.dominantColor}/>
          <path id="93" d="M3.4 54.3984V59.0984H3.3L0 57.2984V55.1984L3.4 54.3984Z" fill={cardData?.dominantColor}/>
          <path id="94" d="M3.3 59.1008L1.2 60.6008L0 59.8008V57.3008L3.3 59.1008Z" fill={cardData?.dominantColor}/>
          <path id="95" d="M3.4002 59.1016V62.0016L1.2002 60.6016L3.3002 59.1016H3.4002Z" fill={cardData?.dominantColor}/>
          <path id="97" d="M1.2 60.6008L0 61.4008V59.8008L1.2 60.6008Z" fill={cardData?.dominantColor}/>
          <path id="98" d="M3.4 62.0016V63.7016L0 63.3016V61.4016L1.2 60.6016L3.4 62.0016Z" fill={cardData?.dominantColor}/>
          <path id="99" d="M3.4 63.7008V65.9008L0 64.7008V63.3008L3.4 63.7008Z" fill={cardData?.dominantColor}/>
          <path id="100" d="M3.4 65.8992V67.1992L0 69.0992V64.6992L3.4 65.8992Z" fill={cardData?.dominantColor}/>
          <path id="101" d="M3.4 67.1992V72.6992L0 71.2992V69.0992L3.4 67.1992Z" fill={cardData?.dominantColor}/>
          <path id="102" d="M3.4 72.7008V74.4008L0 74.0008V71.3008L3.4 72.7008Z" fill={cardData?.dominantColor}/>
          <path id="103" d="M3.4 74.4V74.9L0 75.5V74L3.4 74.4Z" fill={cardData?.dominantColor}/>
          <path id="104" d="M3.4 74.8984V77.2984L0 76.3984V75.4984L3.4 74.8984Z" fill={cardData?.dominantColor}/>
          <path id="105" d="M3.4 77.2984V78.8984H0V76.3984L3.4 77.2984Z" fill={cardData?.dominantColor}/>
          <path id="106" d="M3.4 78.8984V80.7984L0 81.0984V78.8984H3.4Z" fill={cardData?.dominantColor}/>
          <path id="107" d="M3.4 80.8008V84.7008L0 82.9008V81.1008L3.4 80.8008Z" fill={cardData?.dominantColor}/>
          <path id="108" d="M3.4 84.6984V85.8984L0 86.9984V82.8984L3.4 84.6984Z" fill={cardData?.dominantColor}/>
          <path id="109" d="M3.4 85.8984V87.9984L0 88.3984V86.9984L3.4 85.8984Z" fill={cardData?.dominantColor}/>
          <path id="110" d="M3.4 88V90L0 89.5V88.4L3.4 88Z" fill={cardData?.dominantColor}/>
          <path id="111" d="M3.4 90V91.9L0 91.6V89.5L3.4 90Z" fill={cardData?.dominantColor}/>
          <path id="112" d="M3.4 91.9016V94.8016L0 93.6016V91.6016L3.4 91.9016Z" fill={cardData?.dominantColor}/>
          <path id="113" d="M3.4 94.8016V96.3016H0V93.6016L3.4 94.8016Z" fill={cardData?.dominantColor}/>
          <path id="114" d="M3.4 96.3008V98.0008L0 98.2008V96.3008H3.4Z" fill={cardData?.dominantColor}/>
          <path id="115" d="M3.4 98V101.1L0 100.3V98.2L3.4 98Z" fill={cardData?.dominantColor}/>
          <path id="116" d="M3.4 101.101V103.201L0 104.401V100.301L3.4 101.101Z" fill={cardData?.dominantColor}/>
          <path id="117" d="M3.4 103.199V107.699L0 106.299V104.399L3.4 103.199Z" fill={cardData?.dominantColor}/>
          <path id="118" d="M3.4 107.701V110.201L0 111.201V106.301L3.4 107.701Z" fill={cardData?.dominantColor}/>
          <path id="119" d="M3.4 110.199V113.399L0 112.499V111.199L3.4 110.199Z" fill={cardData?.dominantColor}/>
          <path id="120" d="M3.4 113.4V115.4L0 115.3V112.5L3.4 113.4Z" fill={cardData?.dominantColor}/>
          <path id="121" d="M3.4 115.401V117.401L0 117.201V115.301L3.4 115.401Z" fill={cardData?.dominantColor}/>
          <path id="122" d="M3.4 117.399V118.499L0 118.699V117.199L3.4 117.399Z" fill={cardData?.dominantColor}/>
          <path id="123" d="M3.4 118.5V121.3L0 120.4V118.7L3.4 118.5Z" fill={cardData?.dominantColor}/>
          <path id="124" d="M3.4 121.298V123.198L0 122.998V120.398L3.4 121.298Z" fill={cardData?.dominantColor}/>
          <path id="125" d="M3.4 123.2V125.4L0 125V123L3.4 123.2Z" fill={cardData?.dominantColor}/>
          <path id="126" d="M3.4 125.4V127.7L0 127.1V125L3.4 125.4Z" fill={cardData?.dominantColor}/>
          <path id="127" d="M3.4 127.702V129.202L0 130.302V127.102L3.4 127.702Z" fill={cardData?.dominantColor}/>
          <path id="128" d="M3.4 129.199V131.899L1.7 133.099L0 132.099V130.299L3.4 129.199Z" fill={cardData?.dominantColor}/>
          <path id="129" d="M1.7 133.102L0 134.202V132.102L1.7 133.102Z" fill={cardData?.dominantColor}/>
          <path id="130" d="M3.4002 131.898V134.098L1.7002 133.098L3.4002 131.898Z" fill={cardData?.dominantColor}/>
          <path id="131" d="M3.4 134.102V135.202L2.1 136.802L0 135.902V134.202L1.7 133.102L3.4 134.102Z" fill={cardData?.dominantColor}/>
          <path id="132" d="M2.1 136.798L0.7 138.598L0 138.198V135.898L2.1 136.798Z" fill={cardData?.dominantColor}/>
          <path id="133" d="M3.4001 135.199V137.299L2.1001 136.799L3.4001 135.199Z" fill={cardData?.dominantColor}/>
          <path id="134" d="M3.4002 137.301V140.101L0.700195 138.601L2.1002 136.801L3.4002 137.301Z" fill={cardData?.dominantColor}/>
          <path id="135" d="M0.7 138.599L0 139.399V138.199L0.7 138.599Z" fill={cardData?.dominantColor}/>
          <path id="136" d="M3.4 140.102V141.702H0V139.402L0.7 138.602L3.4 140.102Z" fill={cardData?.dominantColor}/>
          <path id="137" d="M3.4 141.699V143.599L2.1 144.599L0 143.599V141.699H3.4Z" fill={cardData?.dominantColor}/>
          <path id="138" d="M2.1 144.602L0 146.202V143.602L2.1 144.602Z" fill={cardData?.dominantColor}/>
          <path id="139" d="M3.4001 143.602V145.102L2.1001 144.602L3.4001 143.602Z" fill={cardData?.dominantColor}/>
          <path id="140" d="M3.4 145.102V146.802L0 148.402V146.202L2.1 144.602L3.4 145.102Z" fill={cardData?.dominantColor}/>
          <path id="141" d="M3.4 146.801V148.901L0 150.201V148.401L3.4 146.801Z" fill={cardData?.dominantColor}/>
          <path id="142" d="M3.4 148.898V151.698L0 152.398V150.198L3.4 148.898Z" fill={cardData?.dominantColor}/>
          <path id="143" d="M3.4 151.699V153.799L1.8 155.599L0 155.099V152.399L3.4 151.699Z" fill={cardData?.dominantColor}/>
          <path id="144" d="M1.8 155.602L0 157.702V155.102L1.8 155.602Z" fill={cardData?.dominantColor}/>
          <path id="145" d="M3.3998 153.801V156.101L1.7998 155.601L3.3998 153.801Z" fill={cardData?.dominantColor}/>
          <path id="146" d="M3.4 156.102V159.502H0V157.702L1.8 155.602L3.4 156.102Z" fill={cardData?.dominantColor}/>
          <path id="147" d="M3.4 159.5V160.4L0 161.2V159.5H3.4Z" fill={cardData?.dominantColor}/>
          <path id="148" d="M3.4 160.398V162.498L0 163.698V161.198L3.4 160.398Z" fill={cardData?.dominantColor}/>
          <path id="149" d="M3.4 162.5V166.3L0 165.6V163.7L3.4 162.5Z" fill={cardData?.dominantColor}/>
          <path id="150" d="M3.4 166.302V167.602L0 168.902V165.602L3.4 166.302Z" fill={cardData?.dominantColor}/>
          <path id="151" d="M3.4 167.602V170.202L0 170.302V168.902L3.4 167.602Z" fill={cardData?.dominantColor}/>
          <path id="152" d="M3.4 170.199V171.499L0 173.199V170.299L3.4 170.199Z" fill={cardData?.dominantColor}/>
          <path id="153" d="M3.4 171.5V175.4L0 174.8V173.2L3.4 171.5Z" fill={cardData?.dominantColor}/>
          <path id="154" d="M3.4 175.401V177.001H0V174.801L3.4 175.401Z" fill={cardData?.dominantColor}/>
          <path id="155" d="M3.4 177V179.6L0 179.3V177H3.4Z" fill={cardData?.dominantColor}/>
          <path id="156" d="M3.4 179.601V181.201L0 181.701V179.301L3.4 179.601Z" fill={cardData?.dominantColor}/>
          <path id="157" d="M3.4 181.199V183.999L0 183.599V181.699L3.4 181.199Z" fill={cardData?.dominantColor}/>
          <path id="158" d="M3.4 184.002V186.202L0 186.402V183.602L3.4 184.002Z" fill={cardData?.dominantColor}/>
          <path id="159" d="M3.4 186.199V187.899L1.7 189.099L0 188.099V186.399L3.4 186.199Z" fill={cardData?.dominantColor}/>
          <path id="160" d="M1.7 189.102L0 190.202V188.102L1.7 189.102Z" fill={cardData?.dominantColor}/>
          <path id="161" d="M3.4002 187.898V190.098L1.7002 189.098L3.4002 187.898Z" fill={cardData?.dominantColor}/>
          <path id="162" d="M3.4 190.102V192.202L0 192.102V190.202L1.7 189.102L3.4 190.102Z" fill={cardData?.dominantColor}/>
          <path id="163" d="M3.4 192.202V194.502L0 193.902V192.102L3.4 192.202Z" fill={cardData?.dominantColor}/>
          <path id="164" d="M3.4 194.498V195.498L0 196.298V193.898L3.4 194.498Z" fill={cardData?.dominantColor}/>
          <path id="165" d="M3.4 195.5V198.2L0 197.4V196.3L3.4 195.5Z" fill={cardData?.dominantColor}/>
          <path id="166" d="M3.4 198.198V199.298L0 200.798V197.398L3.4 198.198Z" fill={cardData?.dominantColor}/>
          <path id="167" d="M3.4 199.301V201.701H0V200.801L3.4 199.301Z" fill={cardData?.dominantColor}/>
          <path id="168" d="M3.4 201.699V203.199L0 204.999V201.699H3.4Z" fill={cardData?.dominantColor}/>
          <path id="169" d="M3.4 203.199V207.599L0 206.299V204.999L3.4 203.199Z" fill={cardData?.dominantColor}/>
          <path id="170" d="M3.4 207.601V208.401L0 210.101V206.301L3.4 207.601Z" fill={cardData?.dominantColor}/>
          <path id="171" d="M3.4 208.398V211.398L0 211.198V210.098L3.4 208.398Z" fill={cardData?.dominantColor}/>
          <path id="172" d="M3.4 211.399V213.099L0 213.199V211.199L3.4 211.399Z" fill={cardData?.dominantColor}/>
          <path id="173" d="M3.4 213.102V215.002L0 214.702V213.202L3.4 213.102Z" fill={cardData?.dominantColor}/>
          <path id="174" d="M3.4 214.999V216.199L0 216.899V214.699L3.4 214.999Z" fill={cardData?.dominantColor}/>
          <path id="175" d="M3.4 216.199V219.399L0 218.899V216.899L3.4 216.199Z" fill={cardData?.dominantColor}/>
          <path id="176" d="M3.4 219.398V221.198L0 221.898V218.898L3.4 219.398Z" fill={cardData?.dominantColor}/>
          <path id="177" d="M3.4 221.199V224.599L0 223.699V221.899L3.4 221.199Z" fill={cardData?.dominantColor}/>
          <path id="178" d="M3.4 224.599V226.599L0 227.099V223.699L3.4 224.599Z" fill={cardData?.dominantColor}/>
          <path id="179" d="M3.4 226.602V229.302L0 228.602V227.102L3.4 226.602Z" fill={cardData?.dominantColor}/>
          <path id="180" d="M3.4 229.302V232.002L0 230.702V228.602L3.4 229.302Z" fill={cardData?.dominantColor}/>
          <path id="181" d="M3.4 231.999V232.999L0 234.499V230.699L3.4 231.999Z" fill={cardData?.dominantColor}/>
          <path id="182" d="M3.4 233V235.7L2.7 236.3L0 235.3V234.5L3.4 233Z" fill={cardData?.dominantColor}/>
          <path id="183" d="M2.7 236.301L0 238.401C0 238.201 0 238.001 0 237.801V235.301L2.7 236.301Z" fill={cardData?.dominantColor}/>
          <path id="184" d="M3.4002 235.699V236.499L2.7002 236.299L3.4002 235.699Z" fill={cardData?.dominantColor}/>
          <path id="185" d="M3.8 239.798L0.2 239.598C0.1 239.198 0.1 238.898 0 238.498L2.7 236.398L3.4 236.698V238.098C3.4 238.598 3.5 239.198 3.8 239.798Z" fill={cardData?.dominantColor}/>
          <path id="186" d="M4.2002 240.6L1.6002 242.5C1.0002 241.6 0.500195 240.6 0.200195 239.5L3.8002 239.7C3.9002 240 4.0002 240.3 4.2002 240.6Z" fill={cardData?.dominantColor}/>
          <path id="187" d="M4.6 241.1L3.4 244.3C2.7 243.8 2 243.2 1.5 242.4L4.1 240.5C4.3 240.8 4.4 241 4.6 241.1Z" fill={cardData?.dominantColor}/>
          <path id="188" d="M5.9 242.202L5.7 245.402C4.9 245.202 4.1 244.802 3.5 244.302L4.7 241.102C4.9 241.602 5.4 242.002 5.9 242.202Z" fill={cardData?.dominantColor}/>
          <path id="189" d="M8.3002 245.799H8.0002C7.2002 245.799 6.4002 245.699 5.7002 245.399L5.9002 242.199C6.4002 242.499 6.9002 242.699 7.5002 242.799L8.3002 245.799Z" fill={cardData?.dominantColor}/>
          <path id="190" d="M10.6 243.901L9.3 245.801H8.3L7.5 242.801C7.8 242.901 8.1 242.901 8.5 242.901H9.3L10.6 243.901Z" fill={cardData?.dominantColor}/>
          <path id="191" d="M11.3002 242.898L10.6002 243.898L9.2002 242.898H11.3002Z" fill={cardData?.dominantColor}/>
          <path id="192" d="M12.2999 245.098L11.6999 245.798H9.3999L10.5999 243.898L12.2999 245.098Z" fill={cardData?.dominantColor}/>
          <path id="193" d="M14.2001 242.898L12.3001 245.098L10.6001 243.898L11.3001 242.898H14.2001Z" fill={cardData?.dominantColor}/>
          <path id="194" d="M13.4002 245.802H11.7002L12.3002 245.102L13.4002 245.802Z" fill={cardData?.dominantColor}/>
          <path id="195" d="M16.5998 245.798H13.3998L12.2998 245.098L14.1998 242.898H15.0998L16.5998 245.798Z" fill={cardData?.dominantColor}/>
          <path id="196" d="M18.8001 245.798H16.6001L15.1001 242.898H17.0001L18.8001 245.798Z" fill={cardData?.dominantColor}/>
          <path id="197" d="M20.9 245.798H18.8L17 242.898H20L20.9 245.798Z" fill={cardData?.dominantColor}/>
          <path id="198" d="M23 245.798H20.9L20 242.898H22.5L23 245.798Z" fill={cardData?.dominantColor}/>
          <path id="199" d="M25 243.998L24.5 245.798H23L22.5 242.898H23.2L25 243.998Z" fill={cardData?.dominantColor}/>
          <path id="200" d="M25.3002 242.898L25.0002 243.998L23.2002 242.898H25.3002Z" fill={cardData?.dominantColor}/>
          <path id="201" d="M28 245.8H24.5L25 244L28 245.8Z" fill={cardData?.dominantColor}/>
          <path id="202" d="M30.1 245.798H28L25 243.998L25.3 242.898H26.4L30.1 245.798Z" fill={cardData?.dominantColor}/>
          <path id="203" d="M30.4999 245.798H30.0999L26.3999 242.898H30.0999L30.4999 245.798Z" fill={cardData?.dominantColor}/>
          <path id="204" d="M34.0001 244.098L31.6001 245.798H30.5001L30.1001 242.898H32.3001L34.0001 244.098Z" fill={cardData?.dominantColor}/>
          <path id="205" d="M36.4001 245.802H31.6001L34.0001 244.102L36.4001 245.802Z" fill={cardData?.dominantColor}/>
          <path id="206" d="M35.7998 242.898L33.9998 244.098L32.2998 242.898H35.7998Z" fill={cardData?.dominantColor}/>
          <path id="207" d="M39.2 242.898L37.7 245.798H36.4L34 244.098L35.8 242.898H39.2Z" fill={cardData?.dominantColor}/>
          <path id="208" d="M40.5002 242.898L40.4002 245.798H37.7002L39.2002 242.898H40.5002Z" fill={cardData?.dominantColor}/>
          <path id="209" d="M43.6999 245.798H40.3999L40.4999 242.898H41.6999L43.6999 245.798Z" fill={cardData?.dominantColor}/>
          <path id="210" d="M45.4002 242.898L45.2002 245.798H43.7002L41.7002 242.898H45.4002Z" fill={cardData?.dominantColor}/>
          <path id="211" d="M49.8002 242.898L47.3002 245.798H45.2002L45.4002 242.898H49.8002Z" fill={cardData?.dominantColor}/>
          <path id="212" d="M51.2998 245.798H47.2998L49.7998 242.898H51.1998L51.2998 245.798Z" fill={cardData?.dominantColor}/>
          <path id="213" d="M53.9002 242.898L53.1002 245.798H51.3002L51.2002 242.898H53.9002Z" fill={cardData?.dominantColor}/>
          <path id="214" d="M56.1001 245.798H53.1001L53.9001 242.898H55.3001L56.1001 245.798Z" fill={cardData?.dominantColor}/>
          <path id="215" d="M58.2998 244.098L57.2998 245.798H56.0998L55.2998 242.898H56.7998L58.2998 244.098Z" fill={cardData?.dominantColor}/>
          <path id="216" d="M60.3998 245.802H57.2998L58.2998 244.102L60.3998 245.802Z" fill={cardData?.dominantColor}/>
          <path id="217" d="M58.9998 242.898L58.2998 244.098L56.7998 242.898H58.9998Z" fill={cardData?.dominantColor}/>
          <path id="218" d="M62.4998 245.798H60.3998L58.2998 244.098L58.9998 242.898H60.9998L62.4998 245.798Z" fill={cardData?.dominantColor}/>
          <path id="219" d="M65.1 242.898L64 245.798H62.5L61 242.898H65.1Z" fill={cardData?.dominantColor}/>
          <path id="220" d="M65.9 242.898L65.8 245.798H64L65.1 242.898H65.9Z" fill={cardData?.dominantColor}/>
          <path id="221" d="M68.8998 242.898L67.2998 245.798H65.7998L65.8998 242.898H68.8998Z" fill={cardData?.dominantColor}/>
          <path id="222" d="M71.0998 245.798H67.2998L68.8998 242.898H70.4998L71.0998 245.798Z" fill={cardData?.dominantColor}/>
          <path id="223" d="M73.8 242.898L72.9 245.798H71.1L70.5 242.898H73.8Z" fill={cardData?.dominantColor}/>
          <path id="224" d="M76.2999 245.798H72.8999L73.7999 242.898H75.5999L76.2999 245.798Z" fill={cardData?.dominantColor}/>
          <path id="225" d="M77.9001 242.898L77.4001 245.798H76.3001L75.6001 242.898H77.9001Z" fill={cardData?.dominantColor}/>
          <path id="226" d="M79.6999 245.798H77.3999L77.8999 242.898H78.8999L79.6999 245.798Z" fill={cardData?.dominantColor}/>
          <path id="227" d="M81.7999 242.898L80.8999 245.798H79.6999L78.8999 242.898H81.7999Z" fill={cardData?.dominantColor}/>
          <path id="228" d="M83.0999 245.798H80.8999L81.7999 242.898H82.8999L83.0999 245.798Z" fill={cardData?.dominantColor}/>
          <path id="229" d="M86.2999 242.898L84.4999 245.798H83.0999L82.8999 242.898H86.2999Z" fill={cardData?.dominantColor}/>
          <path id="230" d="M87.3 242.898L86.7 245.798H84.5L86.3 242.898H87.3Z" fill={cardData?.dominantColor}/>
          <path id="231" d="M88.7002 245.798H86.7002L87.3002 242.898H88.4002L88.7002 245.798Z" fill={cardData?.dominantColor}/>
          <path id="232" d="M91.2999 242.898L90.2999 245.798H88.6999L88.3999 242.898H91.2999Z" fill={cardData?.dominantColor}/>
          <path id="233" d="M93.4998 243.898L92.2998 245.798H90.2998L91.2998 242.898H92.3998L93.4998 243.898Z" fill={cardData?.dominantColor}/>
          <path id="234" d="M95.6998 245.798H92.2998L93.4998 243.898L95.6998 245.798Z" fill={cardData?.dominantColor}/>
          <path id="235" d="M94.1999 242.898L93.4999 243.898L92.3999 242.898H94.1999Z" fill={cardData?.dominantColor}/>
          <path id="236" d="M99.5 242.898L97.6 245.798H95.7L93.5 243.898L94.2 242.898H99.5Z" fill={cardData?.dominantColor}/>
          <path id="237" d="M101.7 242.898L100.2 245.798H97.6001L99.5001 242.898H101.7Z" fill={cardData?.dominantColor}/>
          <path id="238" d="M104.2 245.798H100.2L101.7 242.898H102.8L104.2 245.798Z" fill={cardData?.dominantColor}/>
          <path id="239" d="M106.8 242.898L105.2 245.798H104.2L102.8 242.898H106.8Z" fill={cardData?.dominantColor}/>
          <path id="240" d="M109.4 245.798H105.2L106.8 242.898H108.1L109.4 245.798Z" fill={cardData?.dominantColor}/>
          <path id="241" d="M112.2 242.898L110.7 245.798H109.4L108.1 242.898H112.2Z" fill={cardData?.dominantColor}/>
          <path id="242" d="M114.4 245.798H110.7L112.2 242.898H113.4L114.4 245.798Z" fill={cardData?.dominantColor}/>
          <path id="243" d="M116.4 242.898L115.4 245.798H114.4L113.4 242.898H116.4Z" fill={cardData?.dominantColor}/>
          <path id="244" d="M118.3 245.798H115.4L116.4 242.898H117.4L118.3 245.798Z" fill={cardData?.dominantColor}/>
          <path id="245" d="M120.8 242.898L119.7 245.798H118.3L117.4 242.898H120.8Z" fill={cardData?.dominantColor}/>
          <path id="246" d="M123 245.798H119.7L120.8 242.898H121.8L123 245.798Z" fill={cardData?.dominantColor}/>
          <path id="247" d="M124.8 242.898L123.9 245.798H123L121.8 242.898H124.8Z" fill={cardData?.dominantColor}/>
          <path id="248" d="M125.9 245.798H123.9L124.8 242.898H125.9V245.798Z" fill={cardData?.dominantColor}/>
          <path id="249" d="M128 242.898L127 245.798H125.9V242.898H128Z" fill={cardData?.dominantColor}/>
          <path id="250" d="M130 245.798H127L128 242.898H129.2L130 245.798Z" fill={cardData?.dominantColor}/>
          <path id="251" d="M132.1 242.898L131.3 245.798H130L129.2 242.898H132.1Z" fill={cardData?.dominantColor}/>
          <path id="252" d="M134.4 245.798H131.3L132.1 242.898H133.1L134.4 245.798Z" fill={cardData?.dominantColor}/>
          <path id="253" d="M136.4 242.898L135.9 245.798H134.4L133.1 242.898H136.4Z" fill={cardData?.dominantColor}/>
          <path id="254" d="M138.2 245.798H135.9L136.4 242.898H137.9L138.2 245.798Z" fill={cardData?.dominantColor}/>
          <path id="255" d="M141.2 242.898L139.8 245.798H138.2L137.9 242.898H141.2Z" fill={cardData?.dominantColor}/>
          <path id="256" d="M143.6 245.798H139.8L141.2 242.898H142.6L143.6 245.798Z" fill={cardData?.dominantColor}/>
          <path id="257" d="M145.7 243.698L145.2 245.798H143.6L142.6 242.898H144.4L145.7 243.698Z" fill={cardData?.dominantColor}/>
          <path id="258" d="M148 245.199L147.4 245.799H145.2L145.7 243.699L148 245.199Z" fill={cardData?.dominantColor}/>
          <path id="259" d="M145.9 242.898L145.7 243.698L144.4 242.898H145.9Z" fill={cardData?.dominantColor}/>
          <path id="260" d="M150.2 242.898L148 245.198L145.7 243.698L145.9 242.898H150.2Z" fill={cardData?.dominantColor}/>
          <path id="261" d="M149 245.799H147.4L148 245.199L149 245.799Z" fill={cardData?.dominantColor}/>
          <path id="262" d="M152.1 245.798H149L148 245.198L150.2 242.898H151.1L152.1 245.798Z" fill={cardData?.dominantColor}/>
          <path id="263" d="M153.7 242.898L153.5 245.798H152.1L151.1 242.898H153.7Z" fill={cardData?.dominantColor}/>
          <path id="264" d="M156.2 245.798H153.5L153.7 242.898H154.7L156.2 245.798Z" fill={cardData?.dominantColor}/>
          <path id="265" d="M157.4 242.898V245.798H156.2L154.7 242.898H157.4Z" fill={cardData?.dominantColor}/>
          <path id="266" d="M159.6 245.798H157.4V242.898H158.4L159.6 245.798Z" fill={cardData?.dominantColor}/>
          <path id="267" d="M162.4 244.298L161.3 245.798H159.6L158.4 242.898H160.9L162.4 244.298Z" fill={cardData?.dominantColor}/>
          <path id="268" d="M163.9 245.801H161.3L162.4 244.301L163.9 245.801Z" fill={cardData?.dominantColor}/>
          <path id="269" d="M163.4 242.898L162.4 244.298L160.9 242.898H163.4Z" fill={cardData?.dominantColor}/>
          <path id="270" d="M165.9 242.999L165.3 245.699C164.9 245.799 164.5 245.799 164 245.799L162.4 244.299L163.4 242.899H163.6C164.1 242.899 164.7 242.799 165.1 242.699L165.9 242.999Z" fill={cardData?.dominantColor}/>
          <path id="271" d="M168.6 244.402C167.6 245.102 166.5 245.502 165.3 245.802L165.9 243.102L168.6 244.402Z" fill={cardData?.dominantColor}/>
          <path id="272" d="M166 242.301L165.8 243.001L165.1 242.601C165.4 242.601 165.7 242.401 166 242.301Z" fill={cardData?.dominantColor}/>
          <path id="273" d="M169.7 243.4C169.3 243.8 169 244.1 168.6 244.4L165.9 243.1L166.1 242.4C166.7 242.1 167.3 241.6 167.7 241L169.7 243.4Z" fill={cardData?.dominantColor}/>
          <path id="274" d="M171.4 240.898C171 241.798 170.4 242.698 169.7 243.398L167.6 240.898C167.7 240.798 167.8 240.598 167.9 240.398L171.4 240.898Z" fill={cardData?.dominantColor}/>
          <path id="275" d="M171.7 240.099C171.6 240.399 171.5 240.599 171.4 240.899L168 240.499C168.3 239.899 168.6 239.299 168.6 238.599L169.5 238.199L171.7 240.099Z" fill={cardData?.dominantColor}/>
          <path id="276" d="M172 237.102V237.802C172 238.602 171.9 239.402 171.7 240.102L169.5 238.202L172 237.102Z" fill={cardData?.dominantColor}/>
          <path id="277" d="M169.4 238.1L168.5 238.5C168.5 238.3 168.5 238.1 168.5 237.9V237.5L169.4 238.1Z" fill={cardData?.dominantColor}/>
          <path id="278" d="M172 235.301V237.101L169.4 238.101L168.6 237.401V235.501L172 235.301Z" fill={cardData?.dominantColor}/>
          <path id="279" d="M172 234.198V235.298L168.6 235.498V233.398L172 234.198Z" fill={cardData?.dominantColor}/>
          <path id="280" d="M172 232.899V234.199L168.6 233.399V232.199L172 232.899Z" fill={cardData?.dominantColor}/>
          <path id="281" d="M172 229.898V232.898L168.6 232.198V230.598L172 229.898Z" fill={cardData?.dominantColor}/>
          <path id="282" d="M172 228.701V229.901L168.6 230.601V227.801L172 228.701Z" fill={cardData?.dominantColor}/>
          <path id="283" d="M172 225.801V228.701L168.6 227.801V226.501L172 225.801Z" fill={cardData?.dominantColor}/>
          <path id="284" d="M172 224.502V225.802L168.6 226.502V223.602L172 224.502Z" fill={cardData?.dominantColor}/>
          <path id="285" d="M172 221.898V224.498L168.6 223.598V222.398L172 221.898Z" fill={cardData?.dominantColor}/>
          <path id="286" d="M172 220.502V221.902L168.6 222.402V219.602L172 220.502Z" fill={cardData?.dominantColor}/>
          <path id="287" d="M172 217.602V220.502L168.6 219.602V218.302L172 217.602Z" fill={cardData?.dominantColor}/>
          <path id="288" d="M172 216.601V217.601L168.6 218.301V215.801L172 216.601Z" fill={cardData?.dominantColor}/>
          <path id="289" d="M172 214.5V216.6L168.6 215.8V214.5H172Z" fill={cardData?.dominantColor}/>
          <path id="290" d="M172 213.598V214.498H168.6V211.898L172 213.598Z" fill={cardData?.dominantColor}/>
          <path id="291" d="M172 210.902V213.602L168.6 211.902V209.602L172 210.902Z" fill={cardData?.dominantColor}/>
          <path id="292" d="M172 207.199V210.899L168.6 209.599V208.799L172 207.199Z" fill={cardData?.dominantColor}/>
          <path id="293" d="M172 205.398V207.198L168.6 208.798V205.798L172 205.398Z" fill={cardData?.dominantColor}/>
          <path id="294" d="M172 203.8V205.4L168.6 205.8V203.5L172 203.8Z" fill={cardData?.dominantColor}/>
          <path id="295" d="M172 202.102V203.802L168.6 203.502V202.102H172Z" fill={cardData?.dominantColor}/>
          <path id="296" d="M172 200.9V202.1H168.6V200L172 200.9Z" fill={cardData?.dominantColor}/>
          <path id="297" d="M172 198.301V200.901L168.6 200.001V198.701L172 198.301Z" fill={cardData?.dominantColor}/>
          <path id="298" d="M172 196.301V198.301L168.6 198.701V195.301L172 196.301Z" fill={cardData?.dominantColor}/>
          <path id="299" d="M172 193.301V196.301L168.6 195.301V193.601L172 193.301Z" fill={cardData?.dominantColor}/>
          <path id="300" d="M172 191.901V193.301L168.6 193.601V191.301L172 191.901Z" fill={cardData?.dominantColor}/>
          <path id="301" d="M172 190.501V191.901L168.6 191.301V188.801L172 190.501Z" fill={cardData?.dominantColor}/>
          <path id="302" d="M172 187.8V190.5L168.6 188.8V187.5L172 187.8Z" fill={cardData?.dominantColor}/>
          <path id="303" d="M172 186.398V187.798L168.6 187.498V185.898L172 186.398Z" fill={cardData?.dominantColor}/>
          <path id="304" d="M172 184.502V186.402L168.6 185.902V184.102L172 184.502Z" fill={cardData?.dominantColor}/>
          <path id="305" d="M172 182.199V184.499L168.6 184.099V182.899L170 181.699L172 182.199Z" fill={cardData?.dominantColor}/>
          <path id="306" d="M170 181.701L168.6 182.901V181.301L170 181.701Z" fill={cardData?.dominantColor}/>
          <path id="307" d="M172 179.801V182.201L170 181.701L172 179.801Z" fill={cardData?.dominantColor}/>
          <path id="308" d="M172 178.498V179.798L170 181.698L168.6 181.298V177.398L172 178.498Z" fill={cardData?.dominantColor}/>
          <path id="309" d="M172 174.898V178.498L168.6 177.398V176.198L172 174.898Z" fill={cardData?.dominantColor}/>
          <path id="310" d="M172 172.301V174.901L168.6 176.201V174.801L172 172.301Z" fill={cardData?.dominantColor}/>
          <path id="311" d="M172 169.898V172.298L168.6 174.798V173.398L172 169.898Z" fill={cardData?.dominantColor}/>
          <path id="312" d="M172 168.898V169.898L168.6 173.398V169.898L170.6 168.398L172 168.898Z" fill={cardData?.dominantColor}/>
          <path id="313" d="M172 167.398V168.898L170.6 168.398L172 167.398Z" fill={cardData?.dominantColor}/>
          <path id="314" d="M170.6 168.402L168.6 169.902V167.602L170.6 168.402Z" fill={cardData?.dominantColor}/>
          <path id="315" d="M172 166.1V167.4L170.6 168.4L168.6 167.6V165.5L172 166.1Z" fill={cardData?.dominantColor}/>
          <path id="316" d="M172 165.001V166.101L168.6 165.501V164.301L172 165.001Z" fill={cardData?.dominantColor}/>
          <path id="317" d="M172 163V165L168.6 164.3V163.4L172 163Z" fill={cardData?.dominantColor}/>
          <path id="318" d="M172 161.398V162.998L168.6 163.398V161.498L172 161.398Z" fill={cardData?.dominantColor}/>
          <path id="319" d="M172 160.1V161.4L168.6 161.5V160L172 160.1Z" fill={cardData?.dominantColor}/>
          <path id="320" d="M172 158.7V160.1L168.6 160V158.5L172 158.7Z" fill={cardData?.dominantColor}/>
          <path id="321" d="M172 157.399V158.699L168.6 158.499V156.699L172 157.399Z" fill={cardData?.dominantColor}/>
          <path id="322" d="M172 155.199V157.399L168.6 156.699V155.299L172 155.199Z" fill={cardData?.dominantColor}/>
          <path id="410" d="M169.2 33.5008L167.1 35.7008C167 35.5008 166.8 35.4008 166.6 35.3008L167.4 32.3008C168 32.7008 168.7 33.1008 169.2 33.5008Z" fill={cardData?.dominantColor}/>
          <path id="502" d="M85.6002 32.2L84.9002 33.4L83.2002 32.3C83.3002 31.9 83.7002 31.5 84.2002 31.5H85.1002C85.1002 31.6 85.6002 32.2 85.6002 32.2Z" fill={cardData?.dominantColor}/>
          <path id="503" d="M86.2998 34.4H84.2998L84.8998 33.5L86.2998 34.4Z" fill={cardData?.dominantColor}/>
          <path id="501" d="M86.0001 31.6016L85.6001 32.2016L85.1001 31.6016H86.0001Z" fill={cardData?.dominantColor}/>
          <path id="498" d="M88.7001 32.2016L86.9001 33.9016L85.6001 32.2016L86.0001 31.6016H88.2001L88.7001 32.2016Z" fill={cardData?.dominantColor}/>
          <path id="499" d="M87.2998 34.3984H86.2998L86.8998 33.8984L87.2998 34.3984Z" fill={cardData?.dominantColor}/>
          <path id="496" d="M89.6999 33.3992L88.8999 34.3992H87.2999L86.8999 33.8992L88.6999 32.1992L89.6999 33.3992Z" fill={cardData?.dominantColor}/>
          <path id="497" d="M89.3002 31.6016L88.7002 32.2016L88.2002 31.6016H89.3002Z" fill={cardData?.dominantColor}/>
          <path id="494" d="M90.7002 32.2016L89.7002 33.4016L88.7002 32.2016L89.3002 31.6016H90.0002L90.7002 32.2016Z" fill={cardData?.dominantColor}/>
          <path id="495" d="M90.4999 34.3984H88.8999L89.6999 33.3984L90.4999 34.3984Z" fill={cardData?.dominantColor}/>
          <path id="493" d="M91.3 31.6016L90.7 32.2016L90 31.6016H91.3Z" fill={cardData?.dominantColor}/>
          <path id="491" d="M93.2002 34.3992H91.7002L92.4002 33.6992L93.2002 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="489" d="M95.7999 33.7016L95.2999 34.4016H93.1999L92.3999 33.7016L93.6999 32.6016L95.7999 33.7016Z" fill={cardData?.dominantColor}/>
          <path id="488" d="M94.6998 31.6016L93.6998 32.6016L91.7998 31.6016H94.6998Z" fill={cardData?.dominantColor}/>
          <path id="487" d="M96.9002 32.1016L95.8002 33.7016L93.7002 32.6016L94.7002 31.6016H96.4002L96.9002 32.1016Z" fill={cardData?.dominantColor}/>
          <path id="486" d="M96.9998 34.3992H95.2998L95.7998 33.6992L96.9998 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="485" d="M98.6998 34.0016L98.1998 34.4016H96.9998L95.7998 33.7016L96.8998 32.1016L98.6998 34.0016Z" fill={cardData?.dominantColor}/>
          <path id="484" d="M97.2999 31.6016L96.8999 32.1016L96.3999 31.6016H97.2999Z" fill={cardData?.dominantColor}/>
          <path id="483" d="M100.4 32.6016L98.6999 34.0016L96.8999 32.1016L97.2999 31.6016H99.0999L100.4 32.6016Z" fill={cardData?.dominantColor}/>
          <path id="482" d="M99.1002 34.4H98.2002L98.7002 34L99.1002 34.4Z" fill={cardData?.dominantColor}/>
          <path id="481" d="M101.7 33.5016L101 34.4016H99.1002L98.7002 34.0016L100.4 32.6016L101.7 33.5016Z" fill={cardData?.dominantColor}/>
          <path id="480" d="M101.4 31.7016L100.4 32.6016L99.1001 31.6016H101.3L101.4 31.7016Z" fill={cardData?.dominantColor}/>
          <path id="477" d="M103 34.4H101L101.7 33.5L103 34.4Z" fill={cardData?.dominantColor}/>
          <path id="475" d="M104.4 34.2016L104.2 34.4016H103L101.7 33.5016L102.5 32.6016L104.4 34.2016Z" fill={cardData?.dominantColor}/>
          <path id="476" d="M103.2 31.6016L102.5 32.6016L101.4 31.7016L101.5 31.6016H103.2Z" fill={cardData?.dominantColor}/>
          <path id="479" d="M101.5 31.6016L101.4 31.7016L101.3 31.6016H101.5Z" fill={cardData?.dominantColor}/>
          <path id="474" d="M105.7 32.6016L104.4 34.2016L102.5 32.6016L103.2 31.6016H104.3L105.7 32.6016Z" fill={cardData?.dominantColor}/>
          <path id="473" d="M104.7 34.3992H104.2L104.4 34.1992L104.7 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="472" d="M107.5 33.9016L107 34.4016H104.7L104.4 34.2016L105.7 32.6016L107.5 33.9016Z" fill={cardData?.dominantColor}/>
          <path id="471" d="M106.5 31.6016L105.7 32.6016L104.3 31.6016H106.5Z" fill={cardData?.dominantColor}/>
          <path id="470" d="M108.3 34.3984H107L107.5 33.8984L108.3 34.3984Z" fill={cardData?.dominantColor}/>
          <path id="469" d="M109 32.2016L107.5 33.9016L105.7 32.6016L106.5 31.6016H108.4L109 32.2016Z" fill={cardData?.dominantColor}/>
          <path id="468" d="M109.5 31.6016L109 32.2016L108.4 31.6016H109.5Z" fill={cardData?.dominantColor}/>
          <path id="465" d="M112.6 32.5016L110.7 34.0016L109 32.2016L109.5 31.6016H111.7L112.6 32.5016Z" fill={cardData?.dominantColor}/>
          <path id="466" d="M111.1 34.4H110.1L110.7 34L111.1 34.4Z" fill={cardData?.dominantColor}/>
          <path id="462" d="M114.4 34.4008H113L113.8 33.8008L114.4 34.4008Z" fill={cardData?.dominantColor}/>
          <path id="461" d="M115.7 32.3016L113.8 33.8016L112.6 32.5016L113.7 31.6016H115.2L115.7 32.3016Z" fill={cardData?.dominantColor}/>
          <path id="463" d="M113.7 31.6016L112.6 32.5016L111.7 31.6016H113.7Z" fill={cardData?.dominantColor}/>
          <path id="459" d="M116.5 31.6016L115.7 32.3016L115.2 31.6016H116.5Z" fill={cardData?.dominantColor}/>
          <path id="458" d="M117.5 34.3992H115.9L116.9 33.6992L117.5 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="456" d="M119.9 33.7L119.1 34.4H117.5L116.9 33.7L118.6 32.5L119.9 33.7Z" fill={cardData?.dominantColor}/>
          <path id="455" d="M119.8 31.6016L118.6 32.5016L117.5 31.6016H119.8Z" fill={cardData?.dominantColor}/>
          <path id="454" d="M120.7 34.3992H119.1L119.9 33.6992L120.7 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="453" d="M121.5 32.3016L119.9 33.7016L118.6 32.5016L119.8 31.6016H120.8L121.5 32.3016Z" fill={cardData?.dominantColor}/>
          <path id="452" d="M122.8 33.7008L121.9 34.4008H120.7L119.9 33.7008L121.5 32.3008L122.8 33.7008Z" fill={cardData?.dominantColor}/>
          <path id="451" d="M122.4 31.6016L121.5 32.3016L120.8 31.6016H122.4Z" fill={cardData?.dominantColor}/>
          <path id="450" d="M124.5 32.4016L122.8 33.7016L121.5 32.3016L122.4 31.6016H124L124.5 32.4016Z" fill={cardData?.dominantColor}/>
          <path id="449" d="M123.5 34.3992H121.9L122.8 33.6992L123.5 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="448" d="M125.4 33.7984L124.8 34.3984H123.5L122.8 33.6984L124.5 32.3984L125.4 33.7984Z" fill={cardData?.dominantColor}/>
          <path id="447" d="M125.6 31.6016L124.5 32.4016L124 31.6016H125.6Z" fill={cardData?.dominantColor}/>
          <path id="446" d="M127 32.5016L125.4 33.8016L124.5 32.4016L125.6 31.6016H126.3L127 32.5016Z" fill={cardData?.dominantColor}/>
          <path id="445" d="M125.8 34.4008H124.8L125.4 33.8008L125.8 34.4008Z" fill={cardData?.dominantColor}/>
          <path id="444" d="M128 34L127.5 34.4H125.8L125.4 33.8L127 32.5L128 34Z" fill={cardData?.dominantColor}/>
          <path id="443" d="M128 31.6016L127 32.5016L126.3 31.6016H128Z" fill={cardData?.dominantColor}/>
          <path id="442" d="M129.4 32.8016L128 34.0016L127 32.5016L128 31.6016H129.1L129.4 32.8016Z" fill={cardData?.dominantColor}/>
          <path id="441" d="M128.4 34.4H127.5L128 34L128.4 34.4Z" fill={cardData?.dominantColor}/>
          <path id="440" d="M129.9 34.4008H128.4L128 34.0008L129.4 32.8008L129.9 34.4008Z" fill={cardData?.dominantColor}/>
          <path id="439" d="M130.8 31.6016L129.4 32.8016L129.1 31.6016H130.8Z" fill={cardData?.dominantColor}/>
          <path id="438" d="M132.3 31.6016L131.4 34.4016H129.9L129.4 32.8016L130.8 31.6016H132.3Z" fill={cardData?.dominantColor}/>
          <path id="437" d="M133.5 31.6016L132.7 34.4016H131.4L132.3 31.6016H133.5Z" fill={cardData?.dominantColor}/>
          <path id="436" d="M134.8 34.4016H132.7L133.5 31.6016H134.1L134.8 34.4016Z" fill={cardData?.dominantColor}/>
          <path id="435" d="M136.2 31.6016L135.7 34.4016H134.8L134.1 31.6016H136.2Z" fill={cardData?.dominantColor}/>
          <path id="434" d="M138.2 31.6016L136.9 34.4016H135.7L136.2 31.6016H138.2Z" fill={cardData?.dominantColor}/>
          <path id="433" d="M139.1 34.4016H136.9L138.2 31.6016H139L139.1 34.4016Z" fill={cardData?.dominantColor}/>
          <path id="432" d="M140.7 31.6016L140.2 34.4016H139.1L139 31.6016H140.7Z" fill={cardData?.dominantColor}/>
          <path id="431" d="M141.8 34.4016H140.2L140.7 31.6016H141.7L141.8 34.4016Z" fill={cardData?.dominantColor}/>
          <path id="430" d="M143.2 33.2016L142.5 34.4016H141.8L141.7 31.6016H142.9L143.2 33.2016Z" fill={cardData?.dominantColor}/>
          <path id="429" d="M144.2 31.6016L143.2 33.2016L142.9 31.6016H144.2Z" fill={cardData?.dominantColor}/>
          <path id="428" d="M143.4 34.3992H142.5L143.2 33.1992L143.4 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="427" d="M145.8 34.4016H143.4L143.2 33.2016L144.2 31.6016H145.5L145.8 34.4016Z" fill={cardData?.dominantColor}/>
          <path id="426" d="M148.7 32.8016L147.7 34.4016H145.8L145.5 31.6016H148.1L148.7 32.8016Z" fill={cardData?.dominantColor}/>
          <path id="425" d="M149.5 34.4008H147.7L148.7 32.8008L149.5 34.4008Z" fill={cardData?.dominantColor}/>
          <path id="424" d="M149.5 31.6016L148.7 32.8016L148.1 31.6016H149.5Z" fill={cardData?.dominantColor}/>
          <path id="423" d="M152.8 32.7016L151.5 34.4016H149.5L148.7 32.8016L149.5 31.6016H152.6L152.8 32.7016Z" fill={cardData?.dominantColor}/>
          <path id="422" d="M153.1 34.3992H151.5L152.8 32.6992L153.1 34.3992Z" fill={cardData?.dominantColor}/>
          <path id="421" d="M153.6 31.6016L152.8 32.7016L152.6 31.6016H153.6Z" fill={cardData?.dominantColor}/>
          <path id="420" d="M157.2 34.4016H153.1L152.8 32.7016L153.6 31.6016H155.8L157.2 34.4016Z" fill={cardData?.dominantColor}/>
          <path id="419" d="M159.2 33.1016L158.4 34.4016H157.2L155.8 31.6016H158.6L159.2 33.1016Z" fill={cardData?.dominantColor}/>
          <path id="418" d="M159.7 34.4016H158.4L159.2 33.1016L159.7 34.4016Z" fill={cardData?.dominantColor}/>
          <path id="416" d="M161.7 32.9016L160.4 34.4016H159.7L159.2 33.1016L160.1 31.6016H161.1L161.7 32.9016Z" fill={cardData?.dominantColor}/>
          <path id="417" d="M160.1 31.6016L159.2 33.1016L158.6 31.6016H160.1Z" fill={cardData?.dominantColor}/>
          <path id="415" d="M162.8 31.6016L161.7 32.9016L161.1 31.6016H162.8Z" fill={cardData?.dominantColor}/>
          <path id="414" d="M162.3 34.3984H160.4L161.7 32.8984L162.3 34.3984Z" fill={cardData?.dominantColor}/>
          <path id="413" d="M163.7 31.6016V34.4016H163.6H162.3L161.7 32.9016L162.8 31.6016H163.7Z" fill={cardData?.dominantColor}/>
          <path id="412" d="M166.8 32.1016L164.1 34.4016C164 34.4016 163.8 34.4016 163.7 34.4016V31.6016H164C165 31.6016 166 31.8016 166.8 32.1016Z" fill={cardData?.dominantColor}/>
          <path id="411" d="M167.4 32.3016L166.6 35.3016C165.9 34.8016 165.1 34.5016 164.2 34.4016L166.9 32.1016C167 32.2016 167.2 32.3016 167.4 32.3016Z" fill={cardData?.dominantColor}/>
          <path id="409" d="M171.4 36.7016L167.5 36.3016C167.4 36.1016 167.2 36.0016 167.1 35.8016L169.2 33.6016C170.2 34.4016 171 35.5016 171.4 36.7016Z" fill={cardData?.dominantColor}/>
          <path id="408" d="M171.7 37.5008L168.3 37.7008C168.1 37.2008 167.9 36.7008 167.5 36.3008L171.4 36.7008C171.6 36.9008 171.6 37.2008 171.7 37.5008Z" fill={cardData?.dominantColor}/>
          <path id="407" d="M168.6 39.5984V39.3984C168.6 38.7984 168.5 38.1984 168.3 37.5984L171.7 37.3984C171.8 37.6984 171.9 38.0984 171.9 38.3984C171.9 38.4984 168.6 39.5984 168.6 39.5984Z" fill={cardData?.dominantColor}/>
          <path id="406" d="M172 39.5984V40.9984L168.6 40.5984V39.5984L171.9 38.3984C172 38.7984 172 39.1984 172 39.5984Z" fill={cardData?.dominantColor}/>
          <path id="405" d="M172 41.0016V42.3016L168.6 41.9016V40.6016L172 41.0016Z" fill={cardData?.dominantColor}/>
          <path id="404" d="M172 42.2984V43.4984L168.6 42.9984V41.8984L172 42.2984Z" fill={cardData?.dominantColor}/>
          <path id="403" d="M172 43.5V44.8L168.6 45.1V43L172 43.5Z" fill={cardData?.dominantColor}/>
          <path id="402" d="M172 44.8008V46.4008H168.6V45.1008L172 44.8008Z" fill={cardData?.dominantColor}/>
          <path id="401" d="M172 46.3984V47.8984L168.6 47.9984V46.3984H172Z" fill={cardData?.dominantColor}/>
          <path id="400" d="M172 47.8984V48.9984L169.5 49.9984H168.6V47.9984L172 47.8984Z" fill={cardData?.dominantColor}/>
          <path id="399" d="M169.5 50L168.6 50.4V50H169.5Z" fill={cardData?.dominantColor}/>
          <path id="398" d="M172 49V50.1L169.5 50L172 49Z" fill={cardData?.dominantColor}/>
          <path id="397" d="M172 50.1V51.2L170.4 52.2L168.6 52.4V50.4L169.5 50L172 50.1Z" fill={cardData?.dominantColor}/>
          <path id="396" d="M172 51.1992V52.0992L170.4 52.1992L172 51.1992Z" fill={cardData?.dominantColor}/>
          <path id="395" d="M172 52.1016V54.0016L170.4 54.7016L168.6 54.5016V53.4016L170.4 52.2016L172 52.1016Z" fill={cardData?.dominantColor}/>
          <path id="394" d="M172 54V54.8L170.4 54.7L172 54Z" fill={cardData?.dominantColor}/>
          <path id="393" d="M170.4 54.7L168.6 55.5V54.5L170.4 54.7Z" fill={cardData?.dominantColor}/>
          <path id="392" d="M172 54.7992V56.2992L170.4 57.1992L168.6 57.0992V55.4992L170.4 54.6992L172 54.7992Z" fill={cardData?.dominantColor}/>
          <path id="391" d="M170.4 57.2016L168.6 58.1016V57.1016L170.4 57.2016Z" fill={cardData?.dominantColor}/>
          <path id="390" d="M172 56.3008V57.2008H170.4L172 56.3008Z" fill={cardData?.dominantColor}/>
          <path id="389" d="M172 57.1992V58.7992L170.3 59.5992L168.6 59.3992V58.0992L170.4 57.1992H172Z" fill={cardData?.dominantColor}/>
          <path id="388" d="M172 58.8008V59.8008L170.3 59.6008L172 58.8008Z" fill={cardData?.dominantColor}/>
          <path id="387" d="M170.3 59.5984L168.6 60.3984V59.3984L170.3 59.5984Z" fill={cardData?.dominantColor}/>
          <path id="386" d="M172 59.8016V61.4016L168.6 61.5016V60.4016L170.3 59.6016L172 59.8016Z" fill={cardData?.dominantColor}/>
          <path id="385" d="M172 61.3984V63.7984L168.6 63.1984V61.4984L172 61.3984Z" fill={cardData?.dominantColor}/>
          <path id="384" d="M172 63.7992V65.6992L168.6 64.8992V63.1992L172 63.7992Z" fill={cardData?.dominantColor}/>
          <path id="383" d="M172 65.6984V66.8984H168.6V64.8984L172 65.6984Z" fill={cardData?.dominantColor}/>
          <path id="382" d="M172 66.8984V68.7984L168.6 68.1984V66.8984H172Z" fill={cardData?.dominantColor}/>
          <path id="381" d="M172 68.7992V70.1992L168.6 70.5992V68.1992L172 68.7992Z" fill={cardData?.dominantColor}/>
          <path id="380" d="M172 70.1992V71.5992L168.6 72.1992V70.5992L172 70.1992Z" fill={cardData?.dominantColor}/>
          <path id="379" d="M172 71.6016V74.0016L170.2 74.6016L168.6 73.6016V72.2016L172 71.6016Z" fill={cardData?.dominantColor}/>
          <path id="378" d="M170.2 74.6016L168.6 75.1016V73.6016L170.2 74.6016Z" fill={cardData?.dominantColor}/>
          <path id="377" d="M172 74V75.6L170.2 74.6L172 74Z" fill={cardData?.dominantColor}/>
          <path id="376" d="M172 75.6016V77.1016L168.6 76.6016V75.1016L170.2 74.6016L172 75.6016Z" fill={cardData?.dominantColor}/>
          <path id="375" d="M172 77.1016V78.6016L168.6 78.1016V76.6016L172 77.1016Z" fill={cardData?.dominantColor}/>
          <path id="374" d="M172 78.6016V79.7016L168.6 80.1016V78.1016L172 78.6016Z" fill={cardData?.dominantColor}/>
          <path id="373" d="M172 79.6992V81.1992L168.6 81.4992V80.0992L172 79.6992Z" fill={cardData?.dominantColor}/>
          <path id="372" d="M172 81.1992V83.2992L168.6 82.5992V81.4992L172 81.1992Z" fill={cardData?.dominantColor}/>
          <path id="371" d="M172 83.3016V85.2016L168.6 83.9016V82.6016L172 83.3016Z" fill={cardData?.dominantColor}/>
          <path id="370" d="M172 85.1984V85.9984L170.6 86.5984L168.6 86.3984V83.8984L172 85.1984Z" fill={cardData?.dominantColor}/>
          <path id="369" d="M172 86V86.7L170.6 86.6L172 86Z" fill={cardData?.dominantColor}/>
          <path id="368" d="M170.6 86.5984L168.6 87.3984V86.3984L170.6 86.5984Z" fill={cardData?.dominantColor}/>
          <path id="367" d="M172 86.7016V88.7016H168.6V87.4016L170.6 86.6016L172 86.7016Z" fill={cardData?.dominantColor}/>
          <path id="366" d="M172 88.6992V90.8992L168.6 90.2992V88.6992H172Z" fill={cardData?.dominantColor}/>
          <path id="365" d="M172 90.9008V92.2008L170.9 92.6008L168.6 92.2008V90.3008L172 90.9008Z" fill={cardData?.dominantColor}/>
          <path id="364" d="M172 92.1992V92.7992L170.9 92.5992L172 92.1992Z" fill={cardData?.dominantColor}/>
          <path id="363" d="M170.9 92.5992L168.6 93.4992V92.1992L170.9 92.5992Z" fill={cardData?.dominantColor}/>
          <path id="362" d="M172 92.8016V95.4016H168.6V93.5016L170.9 92.6016L172 92.8016Z" fill={cardData?.dominantColor}/>
          <path id="361" d="M172 95.3984V97.6984L168.6 96.9984V95.3984H172Z" fill={cardData?.dominantColor}/>
          <path id="360" d="M172 97.7V98.7L168.6 98.4V97L172 97.7Z" fill={cardData?.dominantColor}/>
          <path id="359" d="M172 98.6984V101.198L168.6 99.9984V98.3984L172 98.6984Z" fill={cardData?.dominantColor}/>
          <path id="358" d="M172 101.2V102.9L168.6 102.3V100L172 101.2Z" fill={cardData?.dominantColor}/>
          <path id="357" d="M172 102.901V104.601L168.6 103.901V102.301L172 102.901Z" fill={cardData?.dominantColor}/>
          <path id="356" d="M172 104.598V106.798L168.6 105.998V103.898L172 104.598Z" fill={cardData?.dominantColor}/>
          <path id="355" d="M172 106.8V108.2L168.6 108V106L172 106.8Z" fill={cardData?.dominantColor}/>
          <path id="354" d="M172 108.2V110.4L168.6 109.2V108L172 108.2Z" fill={cardData?.dominantColor}/>
          <path id="353" d="M172 110.399V111.199L170.3 111.799L168.6 111.099V109.199L172 110.399Z" fill={cardData?.dominantColor}/>
          <path id="352" d="M170.3 111.802L168.6 112.402V111.102L170.3 111.802Z" fill={cardData?.dominantColor}/>
          <path id="351" d="M172 111.199V112.499L170.3 111.799L172 111.199Z" fill={cardData?.dominantColor}/>
          <path id="350" d="M172 112.501V113.501L168.6 113.201V112.401L170.3 111.801L172 112.501Z" fill={cardData?.dominantColor}/>
          <path id="349" d="M172 113.499V115.299L168.6 114.699V113.199L172 113.499Z" fill={cardData?.dominantColor}/>
          <path id="348" d="M172 115.299V116.599L168.6 116.299V114.699L172 115.299Z" fill={cardData?.dominantColor}/>
          <path id="347" d="M172 116.601V117.801L168.6 118.001V116.301L172 116.601Z" fill={cardData?.dominantColor}/>
          <path id="346" d="M172 117.801V119.101L168.6 119.601V118.001L172 117.801Z" fill={cardData?.dominantColor}/>
          <path id="345" d="M172 119.102V121.202L168.6 120.702V119.602L172 119.102Z" fill={cardData?.dominantColor}/>
          <path id="344" d="M172 121.199V123.499L168.6 122.099V120.699L172 121.199Z" fill={cardData?.dominantColor}/>
          <path id="343" d="M172 123.502V124.402L168.6 124.202V122.102L172 123.502Z" fill={cardData?.dominantColor}/>
          <path id="341" d="M172 126.299V128.299L168.6 127.099V125.199L172 126.299Z" fill={cardData?.dominantColor}/>
          <path id="340" d="M172 128.302V129.902L169.9 131.102L168.6 130.202V127.102L172 128.302Z" fill={cardData?.dominantColor}/>
          <path id="339" d="M172 129.898V132.498L169.9 131.098L172 129.898Z" fill={cardData?.dominantColor}/>
          <path id="338" d="M169.9 131.099L168.6 131.799V130.199L169.9 131.099Z" fill={cardData?.dominantColor}/>
          <path id="337" d="M172 132.502V134.702L168.6 133.702V131.802L169.9 131.102L172 132.502Z" fill={cardData?.dominantColor}/>
          <path id="336" d="M172 134.699V135.999L169.9 136.999L168.6 136.199V133.699L172 134.699Z" fill={cardData?.dominantColor}/>
          <path id="335" d="M172 136V138.1L169.9 137L172 136Z" fill={cardData?.dominantColor}/>
          <path id="334" d="M169.9 136.999L168.6 137.599V136.199L169.9 136.999Z" fill={cardData?.dominantColor}/>
          <path id="333" d="M172 138.1V139.9L168.6 138.9V137.6L169.9 137L172 138.1Z" fill={cardData?.dominantColor}/>
          <path id="332" d="M172 139.898V141.298L168.6 140.398V138.898L172 139.898Z" fill={cardData?.dominantColor}/>
          <path id="331" d="M172 141.298V142.398L168.6 142.798V140.398L172 141.298Z" fill={cardData?.dominantColor}/>
          <path id="330" d="M172 142.398V144.998L168.6 143.998V142.798L172 142.398Z" fill={cardData?.dominantColor}/>
          <path id="329" d="M172 145V146.2L168.6 146V144L172 145Z" fill={cardData?.dominantColor}/>
          <path id="328" d="M172 146.2V147.2L168.6 147.5V146L172 146.2Z" fill={cardData?.dominantColor}/>
          <path id="327" d="M172 147.199V148.999L168.6 148.499V147.499L172 147.199Z" fill={cardData?.dominantColor}/>
          <path id="326" d="M172 149V150.3L168.6 150.4V148.5L172 149Z" fill={cardData?.dominantColor}/>
          <path id="325" d="M172 150.301V152.101L168.6 151.701V150.401L172 150.301Z" fill={cardData?.dominantColor}/>
          <path id="324" d="M172 152.099V154.199L168.6 153.299V151.699L172 152.099Z" fill={cardData?.dominantColor}/>
          <path id="323" d="M172 154.201V155.201L168.6 155.301V153.301L172 154.201Z" fill={cardData?.dominantColor}/>
          <path id="79" d="M9.1998 31.6016C9.0998 32.5016 8.9998 33.4016 8.9998 34.4016L7.2998 32.5016L7.3998 31.7016C7.5998 31.7016 7.7998 31.7016 7.9998 31.7016C7.9998 31.6016 9.1998 31.6016 9.1998 31.6016Z" fill={cardData?.dominantColor}/>
          <path id="342" d="M172 124.399V126.299L168.6 125.199V124.199L172 124.399Z" fill={cardData?.dominantColor}/>
          <path id="396.5" d="M170.4 52.1992L168.6 53.3992V52.3992L170.4 52.1992Z" fill={cardData?.dominantColor}/>
          <path id="457" d="M118.6 32.5016L116.9 33.7016L115.7 32.3016L116.5 31.6016H117.5L118.6 32.5016Z" fill={cardData?.dominantColor}/>
          <path id="464" d="M113.8 33.8L113 34.4H111.1L110.7 34L112.6 32.5L113.8 33.8Z" fill={cardData?.dominantColor}/>
          <path id="460" d="M116.9 33.7008L115.9 34.4008H114.4L113.8 33.8008L115.7 32.3008L116.9 33.7008Z" fill={cardData?.dominantColor}/>
          <path id="467" d="M110.7 33.9992L110.1 34.3992H108.3L107.5 33.8992L109 32.1992L110.7 33.9992Z" fill={cardData?.dominantColor}/>
          <path id="478" d="M102.5 32.5992L101.7 33.4992L100.4 32.5992L101.4 31.6992L102.5 32.5992Z" fill={cardData?.dominantColor}/>
          <path id="490" d="M93.7002 32.6016L92.4002 33.7016L90.7002 32.2016L91.3002 31.6016H91.8002L93.7002 32.6016Z" fill={cardData?.dominantColor}/>
          <path id="492" d="M92.4002 33.6992L91.7002 34.3992H90.5002L89.7002 33.3992L90.7002 32.1992L92.4002 33.6992Z" fill={cardData?.dominantColor}/>
          <path id="500" d="M86.8999 33.8992L86.2999 34.3992L84.8999 33.4992L85.5999 32.1992L86.8999 33.8992Z" fill={cardData?.dominantColor}/>
          <path 
          onAnimationEnd={e => {
            // if (e.elapsedTime <= 1) return 
            // console.log('AAAAAAAAAAAAA', e.elapsedTime)
            // setIsEndedAnimationOfLastPath(true)
          }}
          ref={lastPathRef}
          id="504" d="M84.9002 33.4984L84.3002 34.3984H84.2002C83.7002 34.3984 83.2002 33.8984 83.2002 33.3984V32.5984C83.2002 32.4984 83.2002 32.3984 83.2002 32.3984L84.9002 33.4984Z" fill={cardData?.dominantColor}/>
          </g>
          </g>

          <g>
            
            <path d="M164.4 31.6016H84.5999C84.0999 31.6016 83.5999 32.1016 83.5999 32.6016V33.4016C83.5999 33.9016 84.0999 34.4016 84.5999 34.4016H164C166.8 34.4016 169 36.6016 169 39.4016V237.902C169 240.702 166.8 242.902 164 242.902H8.7999C5.9999 242.902 3.7999 240.702 3.7999 237.902V39.4016C3.7999 36.6016 5.9999 34.4016 8.7999 34.4016H9.3999C9.3999 33.4016 9.4999 32.5016 9.5999 31.6016H8.3999C3.9999 31.6016 0.399902 35.2016 0.399902 39.6016V237.802C0.399902 242.202 3.9999 245.802 8.3999 245.802H164.4C168.8 245.802 172.4 242.202 172.4 237.802V39.6016C172.4 35.2016 168.8 31.6016 164.4 31.6016Z" fill={cardData?.dominantColor}
            fillOpacity={isEndedAnimationOfLastPath? 1 : 0}
            />
            <path d="M44.9999 0C25.6999 0 9.9999 15.3 9.3999 34.4H12.1999C12.8999 16.9 27.2999 2.8 44.9999 2.8C62.6999 2.8 77.7999 17.5 77.7999 35.6C77.7999 53.7 63.1999 68.5 44.9999 68.5C28.3999 68.5 14.6999 56.2 12.4999 40.2C12.3999 39.2 12.3999 36.5 10.3999 37C8.8999 37.4 9.4999 39.2 9.6999 40.2C11.8999 57.7 26.8999 71.3 44.9999 71.3C64.6999 71.3 80.6999 55.3 80.6999 35.6C80.6999 15.9 64.6999 0 44.9999 0Z" fill={cardData?.dominantColor}
            fillOpacity={isEndedAnimationOfLastPath? 1 : 0}
            />
          </g>
          
        </g>
      </svg> 

    
      <div className="absolute -bottom-[10px] left-[10px] right-[10px] w-fullp h-[37%] bg-red-500/30p px-[5px] overflow-hidden mt-[5px]"
        onClick={e => e.stopPropagation()}
      >
        {
        cardData?.known_for &&
        <div className="grid grid-cols-3 gap-1 w-full pt-[5px] px-[10px]p"
        >
          {
            getSortedPosterPathsOfKnownFors(cardData)
            .map((result, i) => {
              const modifiedResult = {
                ...result,
                original_name: result.original_title,
                name: result.title,
                first_air_date: result.release_date
              }

              return (
                <span key={i} 
                  onClick={()=> {
                    setMoviesOrTVshows(
                      result.media_type === 'movie' ? 'movie' : 'tvshow'
                    )
                  }}
                  className="cursor-pointer overflow-hidden"
                  >
                  <Result 
                    item={modifiedResult} 
                    fromToViewSVG={true}
                    media_type={result.media_type === 'movie' ? 'movie' : 'tvshow'}
                  />
                </span>
              )}
            )
          }
        </div>
      }
      </div>
    </div>
  </div>
);
  

  // return (
  //   <div 
  //     key={innerWidth}
  //     onClick={handleModalClick}
  //     className={`to-view-svg bg-green-500p  rounded-2xl absolute top-0 transition-[left_top_width_height_scale] ${moveToCenter? 'duration-[200ms]' : 'duration-[500ms]'}  z-[${isActiveToViewSVG? '10' : '-1'}] 
  //     ${isActiveToViewSVG? 'scale-100' : 'scale-0'} origin-[100%_50%] bg-red-500p`}
  //     style={{
  //       left: moveToCenter && isActiveToViewSVG
  //         ? ((innerWidth / 2) - ((biggerWidth) / 2)) + 'px' 
  //         : coordsAndInfo.x + 'px',

  //       top: moveToCenter && isActiveToViewSVG
  //         ? `${coordsAndInfo.scrollY + (coordsAndInfo.innerHeight / 2) - ((bigerHeight) / 2)}px`
  //         : coordsAndInfo.y + coordsAndInfo.scrollY + 'px',

  //       width: moveToCenter && isActiveToViewSVG
  //         ? biggerWidth + 'px'
  //         : coordsAndInfo.width + 'px',
  //       height: 
  //         moveToCenter && isActiveToViewSVG
  //         ? bigerHeight + 'px' 
  //         : coordsAndInfo.height + 'px'
  //     }}
  //   >
     

  //      <svg 
  //     width="100%" height="100%" viewBox="0 0 173 246" fill="none" xmlns="http://www.w3.org/2000/svg"
  //       ref={svgRef}
  //       // onClick={handleCardClick} 
  //       className="cursor-pointerp bg-emerald-500p"
  //       >
    

  //       <g onClick={handleModalClick2} 
  //       >
  //         <g>
  //           <rect x="3" y="34" width="166" height="210" fill={'#44444482'} />
  //           <rect x="3" y="34" width="166" height="209" fill={cardData?.imageColor} fillOpacity={0.5}/>
  //         </g>

  //         <g>
  //           <foreignObject x="12" y="3" width="66" height="65" >
  //             <div className={`w-full h-full  rounded-full overflow-hidden flex justify-center `}
  //               style={{backgroundColor: cardData?.imageColor || ''}}
  //             >
  //               <Image 
  //                 // ref={imageRef}
  //                 src={
  //                   cardData?.profile_path
  //                   ?  ImagePath + cardData?.profile_path
  //                   : '/no-image.png'
  //                 }
  //                 alt={cardData?.name || 'profile image'} 
  //                 width={100} 
  //                 height={150} 
  //                 // priority
  //                 placeholder="blur"
  //                 blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
  //                 className="max-w-full h-auto object-contain "
  //               />
  //             </div>
  //           </foreignObject>

  //           <foreignObject  x="81" y="35" width="87" height="37">
  //             <div className="w-full h-full bg-[#922D2D]p  text-[8px] leading-[12px]">
  //               <p className="text-center my-[2px] ">{cardData?.known_for_department}</p>
  //               {
  //                 cardData?.gender &&
  //                   <p className="text-center text-[6px] leading-[10px] truncate">{
  //                     getGenderByNumber(cardData.gender)
  //                   }</p>
  //               }
  //             </div>
  //           </foreignObject>
            

  //           <foreignObject  x="3" y="78" width="167" height="165">
  //             <div className="w-full h-full bg-[#6E5E20]p flex flex-wrap text-[8px] leading-[12px] ">
  //               <p className="text-[10px] leading-[14px] p-2 truncate underline">
  //                 {cardData?.name}
  //               </p>
  //               <div className="">
  //                 {
  //                   cardData?.birthday && 
  //                   <p>{cardData.birthday + ','}</p>
  //                 }
                  
  //                 {
  //                   cardData?.place_of_birth &&
  //                   <p>{cardData.place_of_birth}</p>
  //                 }
  //                 <p><MoreButton id={cardData?.id} /></p>
  //               </div>
  //               {
  //                 cardData?.known_for &&
  //                 <div className="grid grid-cols-3 gap-1 bg-red-500p h-fullp w-full self-end pt-[5px] ">
  //                   {
  //                     getSortedPosterPathsOfKnownFors(cardData)
  //                     .map((result, i) => {
  //                       const modifiedResult = {
  //                         ...result,
  //                         original_name: result.original_title,
  //                         name: result.title,
  //                         first_air_date: result.release_date
  //                       }

  //                       return (
  //                         <span key={i} 
  //                           onClick={()=> {
  //                             setMoviesOrTVshows(
  //                               result.media_type === 'movie' ? 'movies' : 'tvshows'
  //                             )
  //                           }}
  //                           >
  //                           <Result 
  //                             item={modifiedResult} 
  //                             fromToViewSVG={true}
  //                           />
  //                         </span>
  //                       )}
  //                     )
  //                   }
  //                 </div>
  //               }
            
  //             </div>
  //           </foreignObject>
  //         </g>

          
  //         <g 
  //           style={{
  //             opacity: isEndedAnimationOfLastPath ? 0 : 1
  //           }}
  //         id="Artboard 4 2" clipPath="url(#clip0_1193_541)">
  //         <g id="circle">
  //         <path id="67" d="M23.0002 11.0016C21.8002 12.0016 20.7002 13.2016 19.7002 14.4016L16.7002 13.5016C17.5002 12.5016 18.4002 11.5016 19.3002 10.6016L23.0002 11.0016Z" fill={cardData?.dominantColor}/>
  //         <path id="66" d="M25.6999 8.79922C24.6999 9.49922 23.7999 10.1992 22.9999 10.9992L19.3999 10.4992C20.7999 9.09922 22.2999 7.79922 23.8999 6.69922H25.3999L25.6999 8.79922Z" fill={cardData?.dominantColor}/>
  //         <path id="34" d="M79 45.3008C78.8 46.2008 78.5 47.1008 78.1 48.0008H75C75.3 47.1008 75.7 46.2008 75.9 45.3008H79Z" fill={cardData?.dominantColor}/>
  //         <path id="31" d="M74.8002 54.6016C74.2002 55.6016 73.5002 56.5016 72.8002 57.4016L70.2002 56.1016C71.2002 54.8016 72.1002 53.5016 72.9002 52.1016C73.0002 52.1016 74.8002 54.6016 74.8002 54.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="30" d="M72.9001 57.4008C72.4001 58.1008 71.8001 58.8008 71.2001 59.5008L68.6001 58.2008C69.2001 57.5008 69.8001 56.9008 70.4001 56.2008C70.3001 56.1008 72.9001 57.4008 72.9001 57.4008Z" fill={cardData?.dominantColor}/>
  //         <path id="29" d="M71.2 59.5004C70.3 60.5004 69.3 61.5004 68.3 62.3004L67 59.7004C67.5 59.2004 68.1 58.7004 68.6 58.2004C68.5 58.1004 71.1 59.5004 71.2 59.5004Z" fill={cardData?.dominantColor}/>
  //         <path id="28" d="M68.3002 62.2992C67.5002 62.9992 66.8002 63.5992 66.0002 64.1992L64.2002 61.9992C65.2002 61.2992 66.1002 60.4992 67.0002 59.6992L68.3002 62.2992Z" fill={cardData?.dominantColor}/>
  //         <path id="27" d="M65.9 64.2C65.1 64.9 64.2 65.4 63.2 66L60.5 64.3C61.7 63.6 62.9 62.8 64 62C64.2 62 65.9 64.2 65.9 64.2Z" fill={cardData?.dominantColor}/>
  //         <path id="26" d="M63.3 66.0008C62.5 66.5008 61.7 67.0008 60.8 67.4008L59 65.1008C59.5 64.8008 60.1 64.6008 60.6 64.3008C60.7 64.3008 63.3 66.0008 63.3 66.0008Z" fill={cardData?.dominantColor}/>
  //         <path id="25" d="M60.8002 67.4016C58.9002 68.4016 56.8002 69.2016 54.7002 69.8016L56.2002 66.3016C57.2002 65.9016 58.1002 65.5016 59.0002 65.1016C59.1002 65.1016 60.8002 67.4016 60.8002 67.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="24" d="M56.3001 66.3984L54.8001 69.8984C54.7001 69.8984 54.7001 69.8984 54.6001 69.9984L51.1001 67.9984C52.8001 67.4984 54.6001 66.9984 56.3001 66.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="23" d="M54.5001 69.8984C53.1001 70.2984 51.6001 70.6984 50.1001 70.8984V68.0984C50.4001 67.9984 50.7001 67.9984 51.0001 67.8984L54.5001 69.8984Z" fill={cardData?.dominantColor}/>
  //         <path id="22" d="M50.1001 70.9002C49.0001 71.1002 47.8001 71.2002 46.7001 71.3002L46.1001 68.5002C47.4001 68.4002 48.8001 68.3002 50.1001 68.1002C50.1001 68.0002 50.1001 70.9002 50.1001 70.9002Z" fill={cardData?.dominantColor}/>
  //         <path id="21" d="M46.6998 71.2C45.9998 71.3 45.2998 71.3 44.5998 71.3C44.1998 71.3 43.6998 71.3 43.2998 71.3L43.4998 68.5C43.8998 68.5 44.2998 68.5 44.5998 68.5C45.0998 68.5 45.5998 68.5 46.0998 68.5L46.6998 71.2Z" fill={cardData?.dominantColor}/>
  //         <path id="20" d="M43.4998 68.5008L43.2998 71.3008C41.8998 71.3008 40.5998 71.1008 39.2998 70.9008L41.3998 68.3008C42.0998 68.4008 42.7998 68.5008 43.4998 68.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="19" d="M41.4002 68.3008L39.3002 70.9008C38.5002 70.8008 37.8002 70.7008 37.0002 70.5008L35.7002 67.3008C37.5002 67.8008 39.5002 68.2008 41.4002 68.3008Z" fill={cardData?.dominantColor}/>
  //         <path id="18" d="M36.9999 70.5008C35.0999 70.1008 33.1999 69.5008 31.3999 68.8008L33.9999 66.8008C34.5999 67.0008 35.0999 67.2008 35.6999 67.3008L36.9999 70.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="17" d="M33.9999 66.7992L31.3999 68.7992C30.4999 68.4992 29.6999 68.0992 28.8999 67.6992L29.0999 64.6992C30.5999 65.3992 32.2999 66.1992 33.9999 66.7992Z" fill={cardData?.dominantColor}/>
  //         <path id="16" d="M29.1001 64.5984L28.9001 67.5984C28.0001 67.0984 27.0001 66.5984 26.1001 66.0984L27.0001 63.3984C27.7001 63.7984 28.4001 64.1984 29.1001 64.5984Z" fill={cardData?.dominantColor}/>
  //         <path id="15" d="M27.0001 63.3984L26.1001 66.0984C25.3001 65.5984 24.4001 64.9984 23.6001 64.3984L24.9001 61.8984C25.6001 62.4984 26.3001 62.9984 27.0001 63.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="14" d="M24.8999 61.9992L23.5999 64.4992C22.4999 63.6992 21.3999 62.7992 20.3999 61.7992L22.7999 60.1992C23.4999 60.7992 24.1999 61.3992 24.8999 61.9992Z" fill={cardData?.dominantColor}/>
  //         <path id="13" d="M22.8001 60.1992L20.4001 61.7992C19.8001 61.1992 19.2001 60.5992 18.6001 59.9992L20.8001 58.1992C21.4001 58.8992 22.1001 59.5992 22.8001 60.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="12" d="M20.7999 58.1984L18.5999 59.9984C17.7999 59.1984 17.0999 58.2984 16.3999 57.2984L18.8999 55.8984C19.3999 56.7984 20.0999 57.4984 20.7999 58.1984Z" fill={cardData?.dominantColor}/>
  //         <path id="11" d="M18.8002 56.0016L16.3002 57.4016C15.9002 56.9016 15.5002 56.4016 15.2002 55.9016L16.1002 54.1016H17.4002C17.9002 54.7016 18.3002 55.4016 18.8002 56.0016Z" fill={cardData?.dominantColor}/>
  //         <path id="9" d="M17.4001 54.1H16.1001L16.6001 53C16.9001 53.3 17.2001 53.7 17.4001 54.1Z" fill={cardData?.dominantColor}/>
  //         <path id="10" d="M16.1 53.9984L15.2 55.7984C14.8 55.1984 14.4 54.5984 14 53.8984L16.1 53.9984Z" fill={cardData?.dominantColor}/>
  //         <path id="8" d="M16.7001 52.9016L16.1001 54.0016H14.1001C13.7001 53.4016 13.4001 52.8016 13.1001 52.1016L14.5001 49.7016L14.9001 49.6016C15.4001 50.8016 16.0001 51.9016 16.7001 52.9016Z" fill={cardData?.dominantColor}/>
  //         <path id="7" d="M14.4001 49.6992L13.0001 52.0992C12.7001 51.4992 12.4001 50.8992 12.1001 50.1992L14.4001 49.6992Z" fill={cardData?.dominantColor}/>
  //         <path id="6" d="M14.7001 49.2L14.4001 49.7L12.1001 50.2C11.7001 49.4 11.4001 48.5 11.1001 47.6L13.2001 45C13.6001 46.5 14.1001 47.9 14.7001 49.2Z" fill={cardData?.dominantColor}/>
  //         <path id="5" d="M13.0998 44.9984L10.9998 47.5984C10.4998 46.2984 10.0998 44.8984 9.7998 43.3984L12.3998 42.3984C12.6998 43.3984 12.8998 44.1984 13.0998 44.9984Z" fill={cardData?.dominantColor}/>
  //         <path id="4" d="M12.5002 42.5008L9.9002 43.5008C9.7002 42.4008 9.5002 41.3008 9.3002 40.2008C9.3002 40.0008 9.2002 39.8008 9.2002 39.6008L10.6002 38.8008L12.2002 40.6008C12.2002 41.2008 12.4002 41.9008 12.5002 42.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="3" d="M12.2001 40.6016L10.6001 38.8016L11.8001 38.1016C12.1001 38.8016 12.1001 39.7016 12.1001 40.2016C12.1001 40.3016 12.1001 40.5016 12.2001 40.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="1" d="M11.7999 38.1011L10.5999 38.8011L9.3999 37.4011C9.4999 37.2011 9.7999 37.1011 9.9999 37.0011C10.9999 36.8011 11.4999 37.3011 11.7999 38.1011Z" fill={cardData?.dominantColor}/>
  //         <path id="2" d="M10.6 38.8008L9.2 39.6008C9 38.8008 8.9 37.9008 9.4 37.3008L10.6 38.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="6.5" d="M14.9 49.5992L14.5 49.6992L14.8 49.1992C14.8 49.3992 14.8 49.4992 14.9 49.5992Z" fill={cardData?.dominantColor}/>
  //         <path id="32" d="M76.4 51.9016C75.9 52.8016 75.4 53.7016 74.9 54.6016L73 52.1016C73.4 51.4016 73.7 50.8016 74.1 50.1016L76.4 51.9016Z" fill={cardData?.dominantColor}/>
  //         <path id="68" d="M19.6999 14.2984C18.6999 15.3984 17.7999 16.5984 17.0999 17.8984L16.3999 13.8984C16.4999 13.6984 16.5999 13.5984 16.7999 13.3984C16.6999 13.3984 19.6999 14.2984 19.6999 14.2984Z" fill={cardData?.dominantColor}/>
  //         <path id="69" d="M16.9998 17.8984C16.3998 18.7984 15.8998 19.6984 15.3998 20.5984L13.2998 18.3984C14.1998 16.7984 15.1998 15.2984 16.1998 13.8984C16.3998 13.8984 16.9998 17.8984 16.9998 17.8984Z" fill={cardData?.dominantColor}/>
  //         <path id="70" d="M15.4998 20.6008C14.9998 21.6008 14.5998 22.5008 14.0998 23.5008L11.7998 21.5008C12.2998 20.4008 12.7998 19.4008 13.3998 18.3008L15.4998 20.6008Z" fill={cardData?.dominantColor}/>
  //         <path id="71" d="M14.1 23.5C13.6 24.7 13.2 25.9 12.9 27.1L11.2 26.4L11 23.8C11.3 23 11.6 22.3 11.9 21.5L14.1 23.5Z" fill={cardData?.dominantColor}/>
  //         <path id="72" d="M11.1998 26.4008L10.2998 26.0008C10.4998 25.2008 10.6998 24.5008 10.9998 23.8008L11.1998 26.4008Z" fill={cardData?.dominantColor}/>
  //         <path id="73" d="M11.7998 32.0984L9.2998 30.1984C9.4998 28.6984 9.7998 27.2984 10.1998 25.8984L11.0998 26.2984C11.1998 26.3984 11.7998 32.0984 11.7998 32.0984Z" fill={cardData?.dominantColor}/>
  //         <path id="74" d="M12.8998 27.0984C12.4998 28.6984 12.0998 30.3984 11.9998 32.1984L11.8998 32.0984L11.2998 26.3984L12.8998 27.0984Z" fill={cardData?.dominantColor}/>
  //         <path id="75" d="M11.9 32.3008L9 34.0008C9.1 32.8008 9.2 31.5008 9.4 30.3008L11.9 32.2008C11.8 32.1008 11.9 32.3008 11.9 32.3008Z" fill={cardData?.dominantColor}/>
  //         <path id="77" d="M11.9998 32.1992C11.9998 32.3992 11.8998 32.4992 11.8998 32.6992L11.7998 32.1992C11.8998 32.2992 11.9998 32.1992 11.9998 32.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="65" d="M25.3999 6.69922H23.8999C24.3999 6.39922 24.7999 5.99922 25.2999 5.69922L25.3999 6.69922Z" fill={cardData?.dominantColor}/>
  //         <path id="64" d="M29.1999 6.69922C27.9999 7.29922 26.7999 7.99922 25.6999 8.79922L25.3999 6.69922H29.1999Z" fill={cardData?.dominantColor}/>
  //         <path id="63" d="M31.4998 5.50156C30.6998 5.80156 29.8998 6.20156 29.1998 6.60156H25.3998L25.2998 5.60156C26.6998 4.70156 28.1998 3.80156 29.7998 3.10156L31.4998 5.50156Z" fill={cardData?.dominantColor}/>
  //         <path id="62" d="M39.1002 3.30123C36.4002 3.80123 33.9002 4.50123 31.5002 5.60123L29.7002 3.30123C30.6002 2.90123 31.5002 2.50123 32.4002 2.20123C32.4002 2.10123 39.1002 3.30123 39.1002 3.30123Z" fill={cardData?.dominantColor}/>
  //         <path id="37" d="M80.2998 35.6C80.2998 36.7 80.1998 37.7 80.1998 38.8L77.2998 38.2C77.3998 37.4 77.3998 36.5 77.3998 35.6V35.5L80.2998 35.6Z" fill={cardData?.dominantColor}/>
  //         <path id="39" d="M80.2 33.3L78.5 31L79.9 30.5C80.1 31.4 80.2 32.3 80.2 33.3Z" fill={cardData?.dominantColor}/>
  //         <path id="40" d="M78.5 31.0008L77.1 31.5008C77 30.4008 76.8 29.3008 76.5 28.3008L78.5 31.0008Z" fill={cardData?.dominantColor}/>
  //         <path id="41" d="M79.8998 30.5008L78.4998 31.0008L76.4998 28.3008C76.3998 28.0008 76.3998 27.8008 76.2998 27.5008L78.8998 25.8008C79.3998 27.3008 79.6998 28.9008 79.8998 30.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="42" d="M78.8998 25.7984L76.2998 27.4984C75.8998 25.9984 75.3998 24.4984 74.7998 23.0984L77.8998 22.8984C78.2998 23.7984 78.5998 24.7984 78.8998 25.7984Z" fill={cardData?.dominantColor}/>
  //         <path id="43" d="M77.8998 22.8016L74.7998 23.0016C74.3998 22.0016 73.8998 20.9016 73.2998 19.9016L76.1998 19.1016C76.8998 20.4016 77.4998 21.6016 77.8998 22.8016Z" fill={cardData?.dominantColor}/>
  //         <path id="44" d="M76.3001 19.2008L73.4001 20.0008C72.8001 19.0008 72.2001 18.0008 71.6001 17.1008L75.0001 16.8008C75.4001 17.6008 75.9001 18.4008 76.3001 19.2008Z" fill={cardData?.dominantColor}/>
  //         <path id="46" d="M72 12.7016L69.2 14.1016C69 13.8016 68.7 13.6016 68.5 13.3016L70 10.6016C70.7 11.3016 71.3 12.0016 72 12.7016Z" fill={cardData?.dominantColor}/>
  //         <path id="47" d="M70.0001 10.5992L68.5001 13.2992C67.4001 12.1992 66.3001 11.0992 65.1001 10.1992L67.9001 8.69922C68.7001 9.29922 69.4001 9.89922 70.0001 10.5992Z" fill={cardData?.dominantColor}/>
  //         <path id="48" d="M67.9 8.60156L65.1 10.1016C64.3 9.40156 63.4 8.80156 62.5 8.20156L65.4 6.60156C66.3 7.30156 67.1 8.00156 67.9 8.60156Z" fill={cardData?.dominantColor}/>
  //         <path id="51" d="M63.9999 5.70156L59.8999 6.60156L59.3999 4.20156L61.1999 4.10156C62.1999 4.60156 63.0999 5.10156 63.9999 5.70156Z" fill={cardData?.dominantColor}/>
  //         <path id="53" d="M61.2002 4.10156L59.4002 4.20156L59.2002 3.10156C59.9002 3.40156 60.5002 3.70156 61.2002 4.10156Z" fill={cardData?.dominantColor}/>
  //         <path id="55" d="M59.1002 6.30078C57.7002 5.60078 56.2002 5.00078 54.7002 4.50078L58.8002 4.30078L59.1002 6.30078Z" fill={cardData?.dominantColor}/>
  //         <path id="58" d="M53.3999 1.1L47.5999 3C47.1999 3 46.8999 2.9 46.4999 2.9L43.8999 0C44.0999 0 44.3999 0 44.5999 0C47.5999 0 50.5999 0.4 53.3999 1.1Z" fill={cardData?.dominantColor}/>
  //         <path id="59" d="M46.5002 2.9C45.9002 2.9 45.2002 2.8 44.6002 2.8C44.3002 2.8 43.9002 2.8 43.6002 2.8L42.2002 0.1C42.7002 0 43.3002 0 43.9002 0L46.5002 2.9Z" fill={cardData?.dominantColor}/>
  //         <path id="60" d="M43.5998 2.80156C42.6998 2.80156 41.7998 2.90156 40.7998 3.00156L39.7998 0.301563C40.5998 0.201563 41.3998 0.101562 42.0998 0.101562L43.5998 2.80156Z" fill={cardData?.dominantColor}/>
  //         <path id="61" d="M40.7999 3.00078C40.1999 3.10078 39.5999 3.10078 39.0999 3.20078L32.3999 2.10078C34.7999 1.20078 37.1999 0.600781 39.7999 0.300781L40.7999 3.00078Z" fill={cardData?.dominantColor}/>
  //         <path id="50" d="M59.9998 6.70156C59.8998 6.70156 59.8998 6.60156 59.7998 6.60156H59.9998V6.70156Z" fill={cardData?.dominantColor}/>
  //         <path id="36" d="M80.1999 38.7992C80.0999 39.8992 79.9999 40.9992 79.7999 41.9992L76.8999 41.6992C77.0999 40.4992 77.2999 39.3992 77.3999 38.1992L80.1999 38.7992Z" fill={cardData?.dominantColor}/>
  //         <path id="35" d="M79.6999 42.0016C79.4999 43.1016 79.2999 44.2016 78.8999 45.2016H75.8999C76.2999 44.0016 76.5999 42.8016 76.7999 41.6016L79.6999 42.0016Z" fill={cardData?.dominantColor}/>
  //         <path id="78" d="M11.9 32.8008C11.8 33.3008 11.8 33.9008 11.8 34.4008H9C9 34.2008 9 34.1008 9 33.9008L11.8 32.3008C11.9 32.3008 11.9 32.8008 11.9 32.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="76" d="M11.9999 32.2016L11.8999 32.3016V32.1016L11.9999 32.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="49" d="M65.3999 6.69922L62.4999 8.29922C61.6999 7.69922 60.7999 7.19922 59.8999 6.69922V6.59922L63.9999 5.69922C64.4999 5.99922 64.9999 6.29922 65.3999 6.69922Z" fill={cardData?.dominantColor}/>
  //         <path id="54" d="M59.4002 4.19844H58.9002L58.7002 2.89844C58.9002 2.89844 59.0002 2.99844 59.2002 3.09844L59.4002 4.19844Z" fill={cardData?.dominantColor}/>
  //         <path id="56" d="M58.8998 4.19844L54.7998 4.39844C53.9998 4.09844 53.1998 3.89844 52.2998 3.69844L57.4998 2.39844C57.8998 2.59844 58.2998 2.69844 58.6998 2.89844L58.8998 4.19844Z" fill={cardData?.dominantColor}/>
  //         <path id="52" d="M59.9999 6.59922H59.7999C59.5999 6.49922 59.3999 6.39922 59.0999 6.29922L58.8999 4.19922H59.3999L59.9999 6.59922Z" fill={cardData?.dominantColor}/>
  //         <path id="45" d="M74.9002 16.7992L71.5002 17.0992C70.8002 16.0992 70.0002 15.0992 69.2002 14.0992L72.0002 12.6992C73.0002 13.9992 74.0002 15.3992 74.9002 16.7992Z" fill={cardData?.dominantColor}/>
  //         <path id="57" d="M57.5001 2.4L52.3001 3.7C50.8001 3.3 49.2001 3 47.6001 2.9L53.3001 1C54.8001 1.4 56.2001 1.9 57.5001 2.4Z" fill={cardData?.dominantColor}/>
  //         <path id="38" d="M80.3001 35.6L77.4001 35.5C77.4001 34.2 77.3001 32.8 77.1001 31.5L78.5001 31L80.2001 33.3C80.3001 34 80.3001 34.8 80.3001 35.6Z" fill={cardData?.dominantColor}/>
  //         <path id="33" d="M78.1 47.8984C77.6 49.2984 77 50.5984 76.3 51.8984L74 50.0984C74.3 49.3984 74.7 48.6984 75 47.9984C75 47.8984 78.1 47.8984 78.1 47.8984Z" fill={cardData?.dominantColor}/>
  //         </g>
  //         <g id="u-shaped">
  //         <path 
  //         id="80" d="M9.0001 34.4H8.4001C8.0001 34.4 7.5001 34.5 7.1001 34.6L7.3001 32.5L9.0001 34.4Z" fill={cardData?.dominantColor}/>
  //         <path id="81" d="M7.4001 31.6016L7.3001 32.4016L6.6001 31.6016C6.9001 31.7016 7.1001 31.6016 7.4001 31.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="82" d="M7.3001 32.5008L7.1001 34.6008C6.2001 34.8008 5.5001 35.3008 4.9001 35.9008L3.1001 33.4008C4.1001 32.6008 5.3001 32.0008 6.7001 31.8008L7.3001 32.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="83" d="M4.9 35.8008C4.1 36.6008 3.6 37.6008 3.4 38.8008L2 34.3008C2.3 33.9008 2.7 33.6008 3.1 33.3008L4.9 35.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="84" d="M3.4 38.9008V39.0008L0 40.0008V39.6008C0 37.6008 0.8 35.7008 2 34.3008L3.4 38.9008Z" fill={cardData?.dominantColor}/>
  //         <path id="85" d="M3.4 39C3.4 39.1 3.4 39.3 3.4 39.4V42L0 41.3V40L3.4 39Z" fill={cardData?.dominantColor}/>
  //         <path id="86" d="M3.4 42.0008V43.8008L1.5 44.6008L0 43.1008V41.3008L3.4 42.0008Z" fill={cardData?.dominantColor}/>
  //         <path id="87" d="M3.4 43.8008V46.5008L1.5 44.6008L3.4 43.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="88" d="M1.5 44.6016L0 45.3016V43.1016L1.5 44.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="89" d="M3.4 46.5016V47.3016L0 49.5016V45.3016L1.5 44.6016L3.4 46.5016Z" fill={cardData?.dominantColor}/>
  //         <path id="90" d="M3.4 47.3008V50.3008L0 50.7008V49.5008L3.4 47.3008Z" fill={cardData?.dominantColor}/>
  //         <path id="91" d="M3.4 50.3008V52.1008L0 52.2008V50.7008L3.4 50.3008Z" fill={cardData?.dominantColor}/>
  //         <path id="92" d="M3.4 52.1016V54.4016L0 55.2016V52.2016L3.4 52.1016Z" fill={cardData?.dominantColor}/>
  //         <path id="93" d="M3.4 54.3984V59.0984H3.3L0 57.2984V55.1984L3.4 54.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="94" d="M3.3 59.1008L1.2 60.6008L0 59.8008V57.3008L3.3 59.1008Z" fill={cardData?.dominantColor}/>
  //         <path id="95" d="M3.4002 59.1016V62.0016L1.2002 60.6016L3.3002 59.1016H3.4002Z" fill={cardData?.dominantColor}/>
  //         <path id="97" d="M1.2 60.6008L0 61.4008V59.8008L1.2 60.6008Z" fill={cardData?.dominantColor}/>
  //         <path id="98" d="M3.4 62.0016V63.7016L0 63.3016V61.4016L1.2 60.6016L3.4 62.0016Z" fill={cardData?.dominantColor}/>
  //         <path id="99" d="M3.4 63.7008V65.9008L0 64.7008V63.3008L3.4 63.7008Z" fill={cardData?.dominantColor}/>
  //         <path id="100" d="M3.4 65.8992V67.1992L0 69.0992V64.6992L3.4 65.8992Z" fill={cardData?.dominantColor}/>
  //         <path id="101" d="M3.4 67.1992V72.6992L0 71.2992V69.0992L3.4 67.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="102" d="M3.4 72.7008V74.4008L0 74.0008V71.3008L3.4 72.7008Z" fill={cardData?.dominantColor}/>
  //         <path id="103" d="M3.4 74.4V74.9L0 75.5V74L3.4 74.4Z" fill={cardData?.dominantColor}/>
  //         <path id="104" d="M3.4 74.8984V77.2984L0 76.3984V75.4984L3.4 74.8984Z" fill={cardData?.dominantColor}/>
  //         <path id="105" d="M3.4 77.2984V78.8984H0V76.3984L3.4 77.2984Z" fill={cardData?.dominantColor}/>
  //         <path id="106" d="M3.4 78.8984V80.7984L0 81.0984V78.8984H3.4Z" fill={cardData?.dominantColor}/>
  //         <path id="107" d="M3.4 80.8008V84.7008L0 82.9008V81.1008L3.4 80.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="108" d="M3.4 84.6984V85.8984L0 86.9984V82.8984L3.4 84.6984Z" fill={cardData?.dominantColor}/>
  //         <path id="109" d="M3.4 85.8984V87.9984L0 88.3984V86.9984L3.4 85.8984Z" fill={cardData?.dominantColor}/>
  //         <path id="110" d="M3.4 88V90L0 89.5V88.4L3.4 88Z" fill={cardData?.dominantColor}/>
  //         <path id="111" d="M3.4 90V91.9L0 91.6V89.5L3.4 90Z" fill={cardData?.dominantColor}/>
  //         <path id="112" d="M3.4 91.9016V94.8016L0 93.6016V91.6016L3.4 91.9016Z" fill={cardData?.dominantColor}/>
  //         <path id="113" d="M3.4 94.8016V96.3016H0V93.6016L3.4 94.8016Z" fill={cardData?.dominantColor}/>
  //         <path id="114" d="M3.4 96.3008V98.0008L0 98.2008V96.3008H3.4Z" fill={cardData?.dominantColor}/>
  //         <path id="115" d="M3.4 98V101.1L0 100.3V98.2L3.4 98Z" fill={cardData?.dominantColor}/>
  //         <path id="116" d="M3.4 101.101V103.201L0 104.401V100.301L3.4 101.101Z" fill={cardData?.dominantColor}/>
  //         <path id="117" d="M3.4 103.199V107.699L0 106.299V104.399L3.4 103.199Z" fill={cardData?.dominantColor}/>
  //         <path id="118" d="M3.4 107.701V110.201L0 111.201V106.301L3.4 107.701Z" fill={cardData?.dominantColor}/>
  //         <path id="119" d="M3.4 110.199V113.399L0 112.499V111.199L3.4 110.199Z" fill={cardData?.dominantColor}/>
  //         <path id="120" d="M3.4 113.4V115.4L0 115.3V112.5L3.4 113.4Z" fill={cardData?.dominantColor}/>
  //         <path id="121" d="M3.4 115.401V117.401L0 117.201V115.301L3.4 115.401Z" fill={cardData?.dominantColor}/>
  //         <path id="122" d="M3.4 117.399V118.499L0 118.699V117.199L3.4 117.399Z" fill={cardData?.dominantColor}/>
  //         <path id="123" d="M3.4 118.5V121.3L0 120.4V118.7L3.4 118.5Z" fill={cardData?.dominantColor}/>
  //         <path id="124" d="M3.4 121.298V123.198L0 122.998V120.398L3.4 121.298Z" fill={cardData?.dominantColor}/>
  //         <path id="125" d="M3.4 123.2V125.4L0 125V123L3.4 123.2Z" fill={cardData?.dominantColor}/>
  //         <path id="126" d="M3.4 125.4V127.7L0 127.1V125L3.4 125.4Z" fill={cardData?.dominantColor}/>
  //         <path id="127" d="M3.4 127.702V129.202L0 130.302V127.102L3.4 127.702Z" fill={cardData?.dominantColor}/>
  //         <path id="128" d="M3.4 129.199V131.899L1.7 133.099L0 132.099V130.299L3.4 129.199Z" fill={cardData?.dominantColor}/>
  //         <path id="129" d="M1.7 133.102L0 134.202V132.102L1.7 133.102Z" fill={cardData?.dominantColor}/>
  //         <path id="130" d="M3.4002 131.898V134.098L1.7002 133.098L3.4002 131.898Z" fill={cardData?.dominantColor}/>
  //         <path id="131" d="M3.4 134.102V135.202L2.1 136.802L0 135.902V134.202L1.7 133.102L3.4 134.102Z" fill={cardData?.dominantColor}/>
  //         <path id="132" d="M2.1 136.798L0.7 138.598L0 138.198V135.898L2.1 136.798Z" fill={cardData?.dominantColor}/>
  //         <path id="133" d="M3.4001 135.199V137.299L2.1001 136.799L3.4001 135.199Z" fill={cardData?.dominantColor}/>
  //         <path id="134" d="M3.4002 137.301V140.101L0.700195 138.601L2.1002 136.801L3.4002 137.301Z" fill={cardData?.dominantColor}/>
  //         <path id="135" d="M0.7 138.599L0 139.399V138.199L0.7 138.599Z" fill={cardData?.dominantColor}/>
  //         <path id="136" d="M3.4 140.102V141.702H0V139.402L0.7 138.602L3.4 140.102Z" fill={cardData?.dominantColor}/>
  //         <path id="137" d="M3.4 141.699V143.599L2.1 144.599L0 143.599V141.699H3.4Z" fill={cardData?.dominantColor}/>
  //         <path id="138" d="M2.1 144.602L0 146.202V143.602L2.1 144.602Z" fill={cardData?.dominantColor}/>
  //         <path id="139" d="M3.4001 143.602V145.102L2.1001 144.602L3.4001 143.602Z" fill={cardData?.dominantColor}/>
  //         <path id="140" d="M3.4 145.102V146.802L0 148.402V146.202L2.1 144.602L3.4 145.102Z" fill={cardData?.dominantColor}/>
  //         <path id="141" d="M3.4 146.801V148.901L0 150.201V148.401L3.4 146.801Z" fill={cardData?.dominantColor}/>
  //         <path id="142" d="M3.4 148.898V151.698L0 152.398V150.198L3.4 148.898Z" fill={cardData?.dominantColor}/>
  //         <path id="143" d="M3.4 151.699V153.799L1.8 155.599L0 155.099V152.399L3.4 151.699Z" fill={cardData?.dominantColor}/>
  //         <path id="144" d="M1.8 155.602L0 157.702V155.102L1.8 155.602Z" fill={cardData?.dominantColor}/>
  //         <path id="145" d="M3.3998 153.801V156.101L1.7998 155.601L3.3998 153.801Z" fill={cardData?.dominantColor}/>
  //         <path id="146" d="M3.4 156.102V159.502H0V157.702L1.8 155.602L3.4 156.102Z" fill={cardData?.dominantColor}/>
  //         <path id="147" d="M3.4 159.5V160.4L0 161.2V159.5H3.4Z" fill={cardData?.dominantColor}/>
  //         <path id="148" d="M3.4 160.398V162.498L0 163.698V161.198L3.4 160.398Z" fill={cardData?.dominantColor}/>
  //         <path id="149" d="M3.4 162.5V166.3L0 165.6V163.7L3.4 162.5Z" fill={cardData?.dominantColor}/>
  //         <path id="150" d="M3.4 166.302V167.602L0 168.902V165.602L3.4 166.302Z" fill={cardData?.dominantColor}/>
  //         <path id="151" d="M3.4 167.602V170.202L0 170.302V168.902L3.4 167.602Z" fill={cardData?.dominantColor}/>
  //         <path id="152" d="M3.4 170.199V171.499L0 173.199V170.299L3.4 170.199Z" fill={cardData?.dominantColor}/>
  //         <path id="153" d="M3.4 171.5V175.4L0 174.8V173.2L3.4 171.5Z" fill={cardData?.dominantColor}/>
  //         <path id="154" d="M3.4 175.401V177.001H0V174.801L3.4 175.401Z" fill={cardData?.dominantColor}/>
  //         <path id="155" d="M3.4 177V179.6L0 179.3V177H3.4Z" fill={cardData?.dominantColor}/>
  //         <path id="156" d="M3.4 179.601V181.201L0 181.701V179.301L3.4 179.601Z" fill={cardData?.dominantColor}/>
  //         <path id="157" d="M3.4 181.199V183.999L0 183.599V181.699L3.4 181.199Z" fill={cardData?.dominantColor}/>
  //         <path id="158" d="M3.4 184.002V186.202L0 186.402V183.602L3.4 184.002Z" fill={cardData?.dominantColor}/>
  //         <path id="159" d="M3.4 186.199V187.899L1.7 189.099L0 188.099V186.399L3.4 186.199Z" fill={cardData?.dominantColor}/>
  //         <path id="160" d="M1.7 189.102L0 190.202V188.102L1.7 189.102Z" fill={cardData?.dominantColor}/>
  //         <path id="161" d="M3.4002 187.898V190.098L1.7002 189.098L3.4002 187.898Z" fill={cardData?.dominantColor}/>
  //         <path id="162" d="M3.4 190.102V192.202L0 192.102V190.202L1.7 189.102L3.4 190.102Z" fill={cardData?.dominantColor}/>
  //         <path id="163" d="M3.4 192.202V194.502L0 193.902V192.102L3.4 192.202Z" fill={cardData?.dominantColor}/>
  //         <path id="164" d="M3.4 194.498V195.498L0 196.298V193.898L3.4 194.498Z" fill={cardData?.dominantColor}/>
  //         <path id="165" d="M3.4 195.5V198.2L0 197.4V196.3L3.4 195.5Z" fill={cardData?.dominantColor}/>
  //         <path id="166" d="M3.4 198.198V199.298L0 200.798V197.398L3.4 198.198Z" fill={cardData?.dominantColor}/>
  //         <path id="167" d="M3.4 199.301V201.701H0V200.801L3.4 199.301Z" fill={cardData?.dominantColor}/>
  //         <path id="168" d="M3.4 201.699V203.199L0 204.999V201.699H3.4Z" fill={cardData?.dominantColor}/>
  //         <path id="169" d="M3.4 203.199V207.599L0 206.299V204.999L3.4 203.199Z" fill={cardData?.dominantColor}/>
  //         <path id="170" d="M3.4 207.601V208.401L0 210.101V206.301L3.4 207.601Z" fill={cardData?.dominantColor}/>
  //         <path id="171" d="M3.4 208.398V211.398L0 211.198V210.098L3.4 208.398Z" fill={cardData?.dominantColor}/>
  //         <path id="172" d="M3.4 211.399V213.099L0 213.199V211.199L3.4 211.399Z" fill={cardData?.dominantColor}/>
  //         <path id="173" d="M3.4 213.102V215.002L0 214.702V213.202L3.4 213.102Z" fill={cardData?.dominantColor}/>
  //         <path id="174" d="M3.4 214.999V216.199L0 216.899V214.699L3.4 214.999Z" fill={cardData?.dominantColor}/>
  //         <path id="175" d="M3.4 216.199V219.399L0 218.899V216.899L3.4 216.199Z" fill={cardData?.dominantColor}/>
  //         <path id="176" d="M3.4 219.398V221.198L0 221.898V218.898L3.4 219.398Z" fill={cardData?.dominantColor}/>
  //         <path id="177" d="M3.4 221.199V224.599L0 223.699V221.899L3.4 221.199Z" fill={cardData?.dominantColor}/>
  //         <path id="178" d="M3.4 224.599V226.599L0 227.099V223.699L3.4 224.599Z" fill={cardData?.dominantColor}/>
  //         <path id="179" d="M3.4 226.602V229.302L0 228.602V227.102L3.4 226.602Z" fill={cardData?.dominantColor}/>
  //         <path id="180" d="M3.4 229.302V232.002L0 230.702V228.602L3.4 229.302Z" fill={cardData?.dominantColor}/>
  //         <path id="181" d="M3.4 231.999V232.999L0 234.499V230.699L3.4 231.999Z" fill={cardData?.dominantColor}/>
  //         <path id="182" d="M3.4 233V235.7L2.7 236.3L0 235.3V234.5L3.4 233Z" fill={cardData?.dominantColor}/>
  //         <path id="183" d="M2.7 236.301L0 238.401C0 238.201 0 238.001 0 237.801V235.301L2.7 236.301Z" fill={cardData?.dominantColor}/>
  //         <path id="184" d="M3.4002 235.699V236.499L2.7002 236.299L3.4002 235.699Z" fill={cardData?.dominantColor}/>
  //         <path id="185" d="M3.8 239.798L0.2 239.598C0.1 239.198 0.1 238.898 0 238.498L2.7 236.398L3.4 236.698V238.098C3.4 238.598 3.5 239.198 3.8 239.798Z" fill={cardData?.dominantColor}/>
  //         <path id="186" d="M4.2002 240.6L1.6002 242.5C1.0002 241.6 0.500195 240.6 0.200195 239.5L3.8002 239.7C3.9002 240 4.0002 240.3 4.2002 240.6Z" fill={cardData?.dominantColor}/>
  //         <path id="187" d="M4.6 241.1L3.4 244.3C2.7 243.8 2 243.2 1.5 242.4L4.1 240.5C4.3 240.8 4.4 241 4.6 241.1Z" fill={cardData?.dominantColor}/>
  //         <path id="188" d="M5.9 242.202L5.7 245.402C4.9 245.202 4.1 244.802 3.5 244.302L4.7 241.102C4.9 241.602 5.4 242.002 5.9 242.202Z" fill={cardData?.dominantColor}/>
  //         <path id="189" d="M8.3002 245.799H8.0002C7.2002 245.799 6.4002 245.699 5.7002 245.399L5.9002 242.199C6.4002 242.499 6.9002 242.699 7.5002 242.799L8.3002 245.799Z" fill={cardData?.dominantColor}/>
  //         <path id="190" d="M10.6 243.901L9.3 245.801H8.3L7.5 242.801C7.8 242.901 8.1 242.901 8.5 242.901H9.3L10.6 243.901Z" fill={cardData?.dominantColor}/>
  //         <path id="191" d="M11.3002 242.898L10.6002 243.898L9.2002 242.898H11.3002Z" fill={cardData?.dominantColor}/>
  //         <path id="192" d="M12.2999 245.098L11.6999 245.798H9.3999L10.5999 243.898L12.2999 245.098Z" fill={cardData?.dominantColor}/>
  //         <path id="193" d="M14.2001 242.898L12.3001 245.098L10.6001 243.898L11.3001 242.898H14.2001Z" fill={cardData?.dominantColor}/>
  //         <path id="194" d="M13.4002 245.802H11.7002L12.3002 245.102L13.4002 245.802Z" fill={cardData?.dominantColor}/>
  //         <path id="195" d="M16.5998 245.798H13.3998L12.2998 245.098L14.1998 242.898H15.0998L16.5998 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="196" d="M18.8001 245.798H16.6001L15.1001 242.898H17.0001L18.8001 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="197" d="M20.9 245.798H18.8L17 242.898H20L20.9 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="198" d="M23 245.798H20.9L20 242.898H22.5L23 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="199" d="M25 243.998L24.5 245.798H23L22.5 242.898H23.2L25 243.998Z" fill={cardData?.dominantColor}/>
  //         <path id="200" d="M25.3002 242.898L25.0002 243.998L23.2002 242.898H25.3002Z" fill={cardData?.dominantColor}/>
  //         <path id="201" d="M28 245.8H24.5L25 244L28 245.8Z" fill={cardData?.dominantColor}/>
  //         <path id="202" d="M30.1 245.798H28L25 243.998L25.3 242.898H26.4L30.1 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="203" d="M30.4999 245.798H30.0999L26.3999 242.898H30.0999L30.4999 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="204" d="M34.0001 244.098L31.6001 245.798H30.5001L30.1001 242.898H32.3001L34.0001 244.098Z" fill={cardData?.dominantColor}/>
  //         <path id="205" d="M36.4001 245.802H31.6001L34.0001 244.102L36.4001 245.802Z" fill={cardData?.dominantColor}/>
  //         <path id="206" d="M35.7998 242.898L33.9998 244.098L32.2998 242.898H35.7998Z" fill={cardData?.dominantColor}/>
  //         <path id="207" d="M39.2 242.898L37.7 245.798H36.4L34 244.098L35.8 242.898H39.2Z" fill={cardData?.dominantColor}/>
  //         <path id="208" d="M40.5002 242.898L40.4002 245.798H37.7002L39.2002 242.898H40.5002Z" fill={cardData?.dominantColor}/>
  //         <path id="209" d="M43.6999 245.798H40.3999L40.4999 242.898H41.6999L43.6999 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="210" d="M45.4002 242.898L45.2002 245.798H43.7002L41.7002 242.898H45.4002Z" fill={cardData?.dominantColor}/>
  //         <path id="211" d="M49.8002 242.898L47.3002 245.798H45.2002L45.4002 242.898H49.8002Z" fill={cardData?.dominantColor}/>
  //         <path id="212" d="M51.2998 245.798H47.2998L49.7998 242.898H51.1998L51.2998 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="213" d="M53.9002 242.898L53.1002 245.798H51.3002L51.2002 242.898H53.9002Z" fill={cardData?.dominantColor}/>
  //         <path id="214" d="M56.1001 245.798H53.1001L53.9001 242.898H55.3001L56.1001 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="215" d="M58.2998 244.098L57.2998 245.798H56.0998L55.2998 242.898H56.7998L58.2998 244.098Z" fill={cardData?.dominantColor}/>
  //         <path id="216" d="M60.3998 245.802H57.2998L58.2998 244.102L60.3998 245.802Z" fill={cardData?.dominantColor}/>
  //         <path id="217" d="M58.9998 242.898L58.2998 244.098L56.7998 242.898H58.9998Z" fill={cardData?.dominantColor}/>
  //         <path id="218" d="M62.4998 245.798H60.3998L58.2998 244.098L58.9998 242.898H60.9998L62.4998 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="219" d="M65.1 242.898L64 245.798H62.5L61 242.898H65.1Z" fill={cardData?.dominantColor}/>
  //         <path id="220" d="M65.9 242.898L65.8 245.798H64L65.1 242.898H65.9Z" fill={cardData?.dominantColor}/>
  //         <path id="221" d="M68.8998 242.898L67.2998 245.798H65.7998L65.8998 242.898H68.8998Z" fill={cardData?.dominantColor}/>
  //         <path id="222" d="M71.0998 245.798H67.2998L68.8998 242.898H70.4998L71.0998 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="223" d="M73.8 242.898L72.9 245.798H71.1L70.5 242.898H73.8Z" fill={cardData?.dominantColor}/>
  //         <path id="224" d="M76.2999 245.798H72.8999L73.7999 242.898H75.5999L76.2999 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="225" d="M77.9001 242.898L77.4001 245.798H76.3001L75.6001 242.898H77.9001Z" fill={cardData?.dominantColor}/>
  //         <path id="226" d="M79.6999 245.798H77.3999L77.8999 242.898H78.8999L79.6999 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="227" d="M81.7999 242.898L80.8999 245.798H79.6999L78.8999 242.898H81.7999Z" fill={cardData?.dominantColor}/>
  //         <path id="228" d="M83.0999 245.798H80.8999L81.7999 242.898H82.8999L83.0999 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="229" d="M86.2999 242.898L84.4999 245.798H83.0999L82.8999 242.898H86.2999Z" fill={cardData?.dominantColor}/>
  //         <path id="230" d="M87.3 242.898L86.7 245.798H84.5L86.3 242.898H87.3Z" fill={cardData?.dominantColor}/>
  //         <path id="231" d="M88.7002 245.798H86.7002L87.3002 242.898H88.4002L88.7002 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="232" d="M91.2999 242.898L90.2999 245.798H88.6999L88.3999 242.898H91.2999Z" fill={cardData?.dominantColor}/>
  //         <path id="233" d="M93.4998 243.898L92.2998 245.798H90.2998L91.2998 242.898H92.3998L93.4998 243.898Z" fill={cardData?.dominantColor}/>
  //         <path id="234" d="M95.6998 245.798H92.2998L93.4998 243.898L95.6998 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="235" d="M94.1999 242.898L93.4999 243.898L92.3999 242.898H94.1999Z" fill={cardData?.dominantColor}/>
  //         <path id="236" d="M99.5 242.898L97.6 245.798H95.7L93.5 243.898L94.2 242.898H99.5Z" fill={cardData?.dominantColor}/>
  //         <path id="237" d="M101.7 242.898L100.2 245.798H97.6001L99.5001 242.898H101.7Z" fill={cardData?.dominantColor}/>
  //         <path id="238" d="M104.2 245.798H100.2L101.7 242.898H102.8L104.2 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="239" d="M106.8 242.898L105.2 245.798H104.2L102.8 242.898H106.8Z" fill={cardData?.dominantColor}/>
  //         <path id="240" d="M109.4 245.798H105.2L106.8 242.898H108.1L109.4 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="241" d="M112.2 242.898L110.7 245.798H109.4L108.1 242.898H112.2Z" fill={cardData?.dominantColor}/>
  //         <path id="242" d="M114.4 245.798H110.7L112.2 242.898H113.4L114.4 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="243" d="M116.4 242.898L115.4 245.798H114.4L113.4 242.898H116.4Z" fill={cardData?.dominantColor}/>
  //         <path id="244" d="M118.3 245.798H115.4L116.4 242.898H117.4L118.3 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="245" d="M120.8 242.898L119.7 245.798H118.3L117.4 242.898H120.8Z" fill={cardData?.dominantColor}/>
  //         <path id="246" d="M123 245.798H119.7L120.8 242.898H121.8L123 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="247" d="M124.8 242.898L123.9 245.798H123L121.8 242.898H124.8Z" fill={cardData?.dominantColor}/>
  //         <path id="248" d="M125.9 245.798H123.9L124.8 242.898H125.9V245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="249" d="M128 242.898L127 245.798H125.9V242.898H128Z" fill={cardData?.dominantColor}/>
  //         <path id="250" d="M130 245.798H127L128 242.898H129.2L130 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="251" d="M132.1 242.898L131.3 245.798H130L129.2 242.898H132.1Z" fill={cardData?.dominantColor}/>
  //         <path id="252" d="M134.4 245.798H131.3L132.1 242.898H133.1L134.4 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="253" d="M136.4 242.898L135.9 245.798H134.4L133.1 242.898H136.4Z" fill={cardData?.dominantColor}/>
  //         <path id="254" d="M138.2 245.798H135.9L136.4 242.898H137.9L138.2 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="255" d="M141.2 242.898L139.8 245.798H138.2L137.9 242.898H141.2Z" fill={cardData?.dominantColor}/>
  //         <path id="256" d="M143.6 245.798H139.8L141.2 242.898H142.6L143.6 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="257" d="M145.7 243.698L145.2 245.798H143.6L142.6 242.898H144.4L145.7 243.698Z" fill={cardData?.dominantColor}/>
  //         <path id="258" d="M148 245.199L147.4 245.799H145.2L145.7 243.699L148 245.199Z" fill={cardData?.dominantColor}/>
  //         <path id="259" d="M145.9 242.898L145.7 243.698L144.4 242.898H145.9Z" fill={cardData?.dominantColor}/>
  //         <path id="260" d="M150.2 242.898L148 245.198L145.7 243.698L145.9 242.898H150.2Z" fill={cardData?.dominantColor}/>
  //         <path id="261" d="M149 245.799H147.4L148 245.199L149 245.799Z" fill={cardData?.dominantColor}/>
  //         <path id="262" d="M152.1 245.798H149L148 245.198L150.2 242.898H151.1L152.1 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="263" d="M153.7 242.898L153.5 245.798H152.1L151.1 242.898H153.7Z" fill={cardData?.dominantColor}/>
  //         <path id="264" d="M156.2 245.798H153.5L153.7 242.898H154.7L156.2 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="265" d="M157.4 242.898V245.798H156.2L154.7 242.898H157.4Z" fill={cardData?.dominantColor}/>
  //         <path id="266" d="M159.6 245.798H157.4V242.898H158.4L159.6 245.798Z" fill={cardData?.dominantColor}/>
  //         <path id="267" d="M162.4 244.298L161.3 245.798H159.6L158.4 242.898H160.9L162.4 244.298Z" fill={cardData?.dominantColor}/>
  //         <path id="268" d="M163.9 245.801H161.3L162.4 244.301L163.9 245.801Z" fill={cardData?.dominantColor}/>
  //         <path id="269" d="M163.4 242.898L162.4 244.298L160.9 242.898H163.4Z" fill={cardData?.dominantColor}/>
  //         <path id="270" d="M165.9 242.999L165.3 245.699C164.9 245.799 164.5 245.799 164 245.799L162.4 244.299L163.4 242.899H163.6C164.1 242.899 164.7 242.799 165.1 242.699L165.9 242.999Z" fill={cardData?.dominantColor}/>
  //         <path id="271" d="M168.6 244.402C167.6 245.102 166.5 245.502 165.3 245.802L165.9 243.102L168.6 244.402Z" fill={cardData?.dominantColor}/>
  //         <path id="272" d="M166 242.301L165.8 243.001L165.1 242.601C165.4 242.601 165.7 242.401 166 242.301Z" fill={cardData?.dominantColor}/>
  //         <path id="273" d="M169.7 243.4C169.3 243.8 169 244.1 168.6 244.4L165.9 243.1L166.1 242.4C166.7 242.1 167.3 241.6 167.7 241L169.7 243.4Z" fill={cardData?.dominantColor}/>
  //         <path id="274" d="M171.4 240.898C171 241.798 170.4 242.698 169.7 243.398L167.6 240.898C167.7 240.798 167.8 240.598 167.9 240.398L171.4 240.898Z" fill={cardData?.dominantColor}/>
  //         <path id="275" d="M171.7 240.099C171.6 240.399 171.5 240.599 171.4 240.899L168 240.499C168.3 239.899 168.6 239.299 168.6 238.599L169.5 238.199L171.7 240.099Z" fill={cardData?.dominantColor}/>
  //         <path id="276" d="M172 237.102V237.802C172 238.602 171.9 239.402 171.7 240.102L169.5 238.202L172 237.102Z" fill={cardData?.dominantColor}/>
  //         <path id="277" d="M169.4 238.1L168.5 238.5C168.5 238.3 168.5 238.1 168.5 237.9V237.5L169.4 238.1Z" fill={cardData?.dominantColor}/>
  //         <path id="278" d="M172 235.301V237.101L169.4 238.101L168.6 237.401V235.501L172 235.301Z" fill={cardData?.dominantColor}/>
  //         <path id="279" d="M172 234.198V235.298L168.6 235.498V233.398L172 234.198Z" fill={cardData?.dominantColor}/>
  //         <path id="280" d="M172 232.899V234.199L168.6 233.399V232.199L172 232.899Z" fill={cardData?.dominantColor}/>
  //         <path id="281" d="M172 229.898V232.898L168.6 232.198V230.598L172 229.898Z" fill={cardData?.dominantColor}/>
  //         <path id="282" d="M172 228.701V229.901L168.6 230.601V227.801L172 228.701Z" fill={cardData?.dominantColor}/>
  //         <path id="283" d="M172 225.801V228.701L168.6 227.801V226.501L172 225.801Z" fill={cardData?.dominantColor}/>
  //         <path id="284" d="M172 224.502V225.802L168.6 226.502V223.602L172 224.502Z" fill={cardData?.dominantColor}/>
  //         <path id="285" d="M172 221.898V224.498L168.6 223.598V222.398L172 221.898Z" fill={cardData?.dominantColor}/>
  //         <path id="286" d="M172 220.502V221.902L168.6 222.402V219.602L172 220.502Z" fill={cardData?.dominantColor}/>
  //         <path id="287" d="M172 217.602V220.502L168.6 219.602V218.302L172 217.602Z" fill={cardData?.dominantColor}/>
  //         <path id="288" d="M172 216.601V217.601L168.6 218.301V215.801L172 216.601Z" fill={cardData?.dominantColor}/>
  //         <path id="289" d="M172 214.5V216.6L168.6 215.8V214.5H172Z" fill={cardData?.dominantColor}/>
  //         <path id="290" d="M172 213.598V214.498H168.6V211.898L172 213.598Z" fill={cardData?.dominantColor}/>
  //         <path id="291" d="M172 210.902V213.602L168.6 211.902V209.602L172 210.902Z" fill={cardData?.dominantColor}/>
  //         <path id="292" d="M172 207.199V210.899L168.6 209.599V208.799L172 207.199Z" fill={cardData?.dominantColor}/>
  //         <path id="293" d="M172 205.398V207.198L168.6 208.798V205.798L172 205.398Z" fill={cardData?.dominantColor}/>
  //         <path id="294" d="M172 203.8V205.4L168.6 205.8V203.5L172 203.8Z" fill={cardData?.dominantColor}/>
  //         <path id="295" d="M172 202.102V203.802L168.6 203.502V202.102H172Z" fill={cardData?.dominantColor}/>
  //         <path id="296" d="M172 200.9V202.1H168.6V200L172 200.9Z" fill={cardData?.dominantColor}/>
  //         <path id="297" d="M172 198.301V200.901L168.6 200.001V198.701L172 198.301Z" fill={cardData?.dominantColor}/>
  //         <path id="298" d="M172 196.301V198.301L168.6 198.701V195.301L172 196.301Z" fill={cardData?.dominantColor}/>
  //         <path id="299" d="M172 193.301V196.301L168.6 195.301V193.601L172 193.301Z" fill={cardData?.dominantColor}/>
  //         <path id="300" d="M172 191.901V193.301L168.6 193.601V191.301L172 191.901Z" fill={cardData?.dominantColor}/>
  //         <path id="301" d="M172 190.501V191.901L168.6 191.301V188.801L172 190.501Z" fill={cardData?.dominantColor}/>
  //         <path id="302" d="M172 187.8V190.5L168.6 188.8V187.5L172 187.8Z" fill={cardData?.dominantColor}/>
  //         <path id="303" d="M172 186.398V187.798L168.6 187.498V185.898L172 186.398Z" fill={cardData?.dominantColor}/>
  //         <path id="304" d="M172 184.502V186.402L168.6 185.902V184.102L172 184.502Z" fill={cardData?.dominantColor}/>
  //         <path id="305" d="M172 182.199V184.499L168.6 184.099V182.899L170 181.699L172 182.199Z" fill={cardData?.dominantColor}/>
  //         <path id="306" d="M170 181.701L168.6 182.901V181.301L170 181.701Z" fill={cardData?.dominantColor}/>
  //         <path id="307" d="M172 179.801V182.201L170 181.701L172 179.801Z" fill={cardData?.dominantColor}/>
  //         <path id="308" d="M172 178.498V179.798L170 181.698L168.6 181.298V177.398L172 178.498Z" fill={cardData?.dominantColor}/>
  //         <path id="309" d="M172 174.898V178.498L168.6 177.398V176.198L172 174.898Z" fill={cardData?.dominantColor}/>
  //         <path id="310" d="M172 172.301V174.901L168.6 176.201V174.801L172 172.301Z" fill={cardData?.dominantColor}/>
  //         <path id="311" d="M172 169.898V172.298L168.6 174.798V173.398L172 169.898Z" fill={cardData?.dominantColor}/>
  //         <path id="312" d="M172 168.898V169.898L168.6 173.398V169.898L170.6 168.398L172 168.898Z" fill={cardData?.dominantColor}/>
  //         <path id="313" d="M172 167.398V168.898L170.6 168.398L172 167.398Z" fill={cardData?.dominantColor}/>
  //         <path id="314" d="M170.6 168.402L168.6 169.902V167.602L170.6 168.402Z" fill={cardData?.dominantColor}/>
  //         <path id="315" d="M172 166.1V167.4L170.6 168.4L168.6 167.6V165.5L172 166.1Z" fill={cardData?.dominantColor}/>
  //         <path id="316" d="M172 165.001V166.101L168.6 165.501V164.301L172 165.001Z" fill={cardData?.dominantColor}/>
  //         <path id="317" d="M172 163V165L168.6 164.3V163.4L172 163Z" fill={cardData?.dominantColor}/>
  //         <path id="318" d="M172 161.398V162.998L168.6 163.398V161.498L172 161.398Z" fill={cardData?.dominantColor}/>
  //         <path id="319" d="M172 160.1V161.4L168.6 161.5V160L172 160.1Z" fill={cardData?.dominantColor}/>
  //         <path id="320" d="M172 158.7V160.1L168.6 160V158.5L172 158.7Z" fill={cardData?.dominantColor}/>
  //         <path id="321" d="M172 157.399V158.699L168.6 158.499V156.699L172 157.399Z" fill={cardData?.dominantColor}/>
  //         <path id="322" d="M172 155.199V157.399L168.6 156.699V155.299L172 155.199Z" fill={cardData?.dominantColor}/>
  //         <path id="410" d="M169.2 33.5008L167.1 35.7008C167 35.5008 166.8 35.4008 166.6 35.3008L167.4 32.3008C168 32.7008 168.7 33.1008 169.2 33.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="502" d="M85.6002 32.2L84.9002 33.4L83.2002 32.3C83.3002 31.9 83.7002 31.5 84.2002 31.5H85.1002C85.1002 31.6 85.6002 32.2 85.6002 32.2Z" fill={cardData?.dominantColor}/>
  //         <path id="503" d="M86.2998 34.4H84.2998L84.8998 33.5L86.2998 34.4Z" fill={cardData?.dominantColor}/>
  //         <path id="501" d="M86.0001 31.6016L85.6001 32.2016L85.1001 31.6016H86.0001Z" fill={cardData?.dominantColor}/>
  //         <path id="498" d="M88.7001 32.2016L86.9001 33.9016L85.6001 32.2016L86.0001 31.6016H88.2001L88.7001 32.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="499" d="M87.2998 34.3984H86.2998L86.8998 33.8984L87.2998 34.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="496" d="M89.6999 33.3992L88.8999 34.3992H87.2999L86.8999 33.8992L88.6999 32.1992L89.6999 33.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="497" d="M89.3002 31.6016L88.7002 32.2016L88.2002 31.6016H89.3002Z" fill={cardData?.dominantColor}/>
  //         <path id="494" d="M90.7002 32.2016L89.7002 33.4016L88.7002 32.2016L89.3002 31.6016H90.0002L90.7002 32.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="495" d="M90.4999 34.3984H88.8999L89.6999 33.3984L90.4999 34.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="493" d="M91.3 31.6016L90.7 32.2016L90 31.6016H91.3Z" fill={cardData?.dominantColor}/>
  //         <path id="491" d="M93.2002 34.3992H91.7002L92.4002 33.6992L93.2002 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="489" d="M95.7999 33.7016L95.2999 34.4016H93.1999L92.3999 33.7016L93.6999 32.6016L95.7999 33.7016Z" fill={cardData?.dominantColor}/>
  //         <path id="488" d="M94.6998 31.6016L93.6998 32.6016L91.7998 31.6016H94.6998Z" fill={cardData?.dominantColor}/>
  //         <path id="487" d="M96.9002 32.1016L95.8002 33.7016L93.7002 32.6016L94.7002 31.6016H96.4002L96.9002 32.1016Z" fill={cardData?.dominantColor}/>
  //         <path id="486" d="M96.9998 34.3992H95.2998L95.7998 33.6992L96.9998 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="485" d="M98.6998 34.0016L98.1998 34.4016H96.9998L95.7998 33.7016L96.8998 32.1016L98.6998 34.0016Z" fill={cardData?.dominantColor}/>
  //         <path id="484" d="M97.2999 31.6016L96.8999 32.1016L96.3999 31.6016H97.2999Z" fill={cardData?.dominantColor}/>
  //         <path id="483" d="M100.4 32.6016L98.6999 34.0016L96.8999 32.1016L97.2999 31.6016H99.0999L100.4 32.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="482" d="M99.1002 34.4H98.2002L98.7002 34L99.1002 34.4Z" fill={cardData?.dominantColor}/>
  //         <path id="481" d="M101.7 33.5016L101 34.4016H99.1002L98.7002 34.0016L100.4 32.6016L101.7 33.5016Z" fill={cardData?.dominantColor}/>
  //         <path id="480" d="M101.4 31.7016L100.4 32.6016L99.1001 31.6016H101.3L101.4 31.7016Z" fill={cardData?.dominantColor}/>
  //         <path id="477" d="M103 34.4H101L101.7 33.5L103 34.4Z" fill={cardData?.dominantColor}/>
  //         <path id="475" d="M104.4 34.2016L104.2 34.4016H103L101.7 33.5016L102.5 32.6016L104.4 34.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="476" d="M103.2 31.6016L102.5 32.6016L101.4 31.7016L101.5 31.6016H103.2Z" fill={cardData?.dominantColor}/>
  //         <path id="479" d="M101.5 31.6016L101.4 31.7016L101.3 31.6016H101.5Z" fill={cardData?.dominantColor}/>
  //         <path id="474" d="M105.7 32.6016L104.4 34.2016L102.5 32.6016L103.2 31.6016H104.3L105.7 32.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="473" d="M104.7 34.3992H104.2L104.4 34.1992L104.7 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="472" d="M107.5 33.9016L107 34.4016H104.7L104.4 34.2016L105.7 32.6016L107.5 33.9016Z" fill={cardData?.dominantColor}/>
  //         <path id="471" d="M106.5 31.6016L105.7 32.6016L104.3 31.6016H106.5Z" fill={cardData?.dominantColor}/>
  //         <path id="470" d="M108.3 34.3984H107L107.5 33.8984L108.3 34.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="469" d="M109 32.2016L107.5 33.9016L105.7 32.6016L106.5 31.6016H108.4L109 32.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="468" d="M109.5 31.6016L109 32.2016L108.4 31.6016H109.5Z" fill={cardData?.dominantColor}/>
  //         <path id="465" d="M112.6 32.5016L110.7 34.0016L109 32.2016L109.5 31.6016H111.7L112.6 32.5016Z" fill={cardData?.dominantColor}/>
  //         <path id="466" d="M111.1 34.4H110.1L110.7 34L111.1 34.4Z" fill={cardData?.dominantColor}/>
  //         <path id="462" d="M114.4 34.4008H113L113.8 33.8008L114.4 34.4008Z" fill={cardData?.dominantColor}/>
  //         <path id="461" d="M115.7 32.3016L113.8 33.8016L112.6 32.5016L113.7 31.6016H115.2L115.7 32.3016Z" fill={cardData?.dominantColor}/>
  //         <path id="463" d="M113.7 31.6016L112.6 32.5016L111.7 31.6016H113.7Z" fill={cardData?.dominantColor}/>
  //         <path id="459" d="M116.5 31.6016L115.7 32.3016L115.2 31.6016H116.5Z" fill={cardData?.dominantColor}/>
  //         <path id="458" d="M117.5 34.3992H115.9L116.9 33.6992L117.5 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="456" d="M119.9 33.7L119.1 34.4H117.5L116.9 33.7L118.6 32.5L119.9 33.7Z" fill={cardData?.dominantColor}/>
  //         <path id="455" d="M119.8 31.6016L118.6 32.5016L117.5 31.6016H119.8Z" fill={cardData?.dominantColor}/>
  //         <path id="454" d="M120.7 34.3992H119.1L119.9 33.6992L120.7 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="453" d="M121.5 32.3016L119.9 33.7016L118.6 32.5016L119.8 31.6016H120.8L121.5 32.3016Z" fill={cardData?.dominantColor}/>
  //         <path id="452" d="M122.8 33.7008L121.9 34.4008H120.7L119.9 33.7008L121.5 32.3008L122.8 33.7008Z" fill={cardData?.dominantColor}/>
  //         <path id="451" d="M122.4 31.6016L121.5 32.3016L120.8 31.6016H122.4Z" fill={cardData?.dominantColor}/>
  //         <path id="450" d="M124.5 32.4016L122.8 33.7016L121.5 32.3016L122.4 31.6016H124L124.5 32.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="449" d="M123.5 34.3992H121.9L122.8 33.6992L123.5 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="448" d="M125.4 33.7984L124.8 34.3984H123.5L122.8 33.6984L124.5 32.3984L125.4 33.7984Z" fill={cardData?.dominantColor}/>
  //         <path id="447" d="M125.6 31.6016L124.5 32.4016L124 31.6016H125.6Z" fill={cardData?.dominantColor}/>
  //         <path id="446" d="M127 32.5016L125.4 33.8016L124.5 32.4016L125.6 31.6016H126.3L127 32.5016Z" fill={cardData?.dominantColor}/>
  //         <path id="445" d="M125.8 34.4008H124.8L125.4 33.8008L125.8 34.4008Z" fill={cardData?.dominantColor}/>
  //         <path id="444" d="M128 34L127.5 34.4H125.8L125.4 33.8L127 32.5L128 34Z" fill={cardData?.dominantColor}/>
  //         <path id="443" d="M128 31.6016L127 32.5016L126.3 31.6016H128Z" fill={cardData?.dominantColor}/>
  //         <path id="442" d="M129.4 32.8016L128 34.0016L127 32.5016L128 31.6016H129.1L129.4 32.8016Z" fill={cardData?.dominantColor}/>
  //         <path id="441" d="M128.4 34.4H127.5L128 34L128.4 34.4Z" fill={cardData?.dominantColor}/>
  //         <path id="440" d="M129.9 34.4008H128.4L128 34.0008L129.4 32.8008L129.9 34.4008Z" fill={cardData?.dominantColor}/>
  //         <path id="439" d="M130.8 31.6016L129.4 32.8016L129.1 31.6016H130.8Z" fill={cardData?.dominantColor}/>
  //         <path id="438" d="M132.3 31.6016L131.4 34.4016H129.9L129.4 32.8016L130.8 31.6016H132.3Z" fill={cardData?.dominantColor}/>
  //         <path id="437" d="M133.5 31.6016L132.7 34.4016H131.4L132.3 31.6016H133.5Z" fill={cardData?.dominantColor}/>
  //         <path id="436" d="M134.8 34.4016H132.7L133.5 31.6016H134.1L134.8 34.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="435" d="M136.2 31.6016L135.7 34.4016H134.8L134.1 31.6016H136.2Z" fill={cardData?.dominantColor}/>
  //         <path id="434" d="M138.2 31.6016L136.9 34.4016H135.7L136.2 31.6016H138.2Z" fill={cardData?.dominantColor}/>
  //         <path id="433" d="M139.1 34.4016H136.9L138.2 31.6016H139L139.1 34.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="432" d="M140.7 31.6016L140.2 34.4016H139.1L139 31.6016H140.7Z" fill={cardData?.dominantColor}/>
  //         <path id="431" d="M141.8 34.4016H140.2L140.7 31.6016H141.7L141.8 34.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="430" d="M143.2 33.2016L142.5 34.4016H141.8L141.7 31.6016H142.9L143.2 33.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="429" d="M144.2 31.6016L143.2 33.2016L142.9 31.6016H144.2Z" fill={cardData?.dominantColor}/>
  //         <path id="428" d="M143.4 34.3992H142.5L143.2 33.1992L143.4 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="427" d="M145.8 34.4016H143.4L143.2 33.2016L144.2 31.6016H145.5L145.8 34.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="426" d="M148.7 32.8016L147.7 34.4016H145.8L145.5 31.6016H148.1L148.7 32.8016Z" fill={cardData?.dominantColor}/>
  //         <path id="425" d="M149.5 34.4008H147.7L148.7 32.8008L149.5 34.4008Z" fill={cardData?.dominantColor}/>
  //         <path id="424" d="M149.5 31.6016L148.7 32.8016L148.1 31.6016H149.5Z" fill={cardData?.dominantColor}/>
  //         <path id="423" d="M152.8 32.7016L151.5 34.4016H149.5L148.7 32.8016L149.5 31.6016H152.6L152.8 32.7016Z" fill={cardData?.dominantColor}/>
  //         <path id="422" d="M153.1 34.3992H151.5L152.8 32.6992L153.1 34.3992Z" fill={cardData?.dominantColor}/>
  //         <path id="421" d="M153.6 31.6016L152.8 32.7016L152.6 31.6016H153.6Z" fill={cardData?.dominantColor}/>
  //         <path id="420" d="M157.2 34.4016H153.1L152.8 32.7016L153.6 31.6016H155.8L157.2 34.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="419" d="M159.2 33.1016L158.4 34.4016H157.2L155.8 31.6016H158.6L159.2 33.1016Z" fill={cardData?.dominantColor}/>
  //         <path id="418" d="M159.7 34.4016H158.4L159.2 33.1016L159.7 34.4016Z" fill={cardData?.dominantColor}/>
  //         <path id="416" d="M161.7 32.9016L160.4 34.4016H159.7L159.2 33.1016L160.1 31.6016H161.1L161.7 32.9016Z" fill={cardData?.dominantColor}/>
  //         <path id="417" d="M160.1 31.6016L159.2 33.1016L158.6 31.6016H160.1Z" fill={cardData?.dominantColor}/>
  //         <path id="415" d="M162.8 31.6016L161.7 32.9016L161.1 31.6016H162.8Z" fill={cardData?.dominantColor}/>
  //         <path id="414" d="M162.3 34.3984H160.4L161.7 32.8984L162.3 34.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="413" d="M163.7 31.6016V34.4016H163.6H162.3L161.7 32.9016L162.8 31.6016H163.7Z" fill={cardData?.dominantColor}/>
  //         <path id="412" d="M166.8 32.1016L164.1 34.4016C164 34.4016 163.8 34.4016 163.7 34.4016V31.6016H164C165 31.6016 166 31.8016 166.8 32.1016Z" fill={cardData?.dominantColor}/>
  //         <path id="411" d="M167.4 32.3016L166.6 35.3016C165.9 34.8016 165.1 34.5016 164.2 34.4016L166.9 32.1016C167 32.2016 167.2 32.3016 167.4 32.3016Z" fill={cardData?.dominantColor}/>
  //         <path id="409" d="M171.4 36.7016L167.5 36.3016C167.4 36.1016 167.2 36.0016 167.1 35.8016L169.2 33.6016C170.2 34.4016 171 35.5016 171.4 36.7016Z" fill={cardData?.dominantColor}/>
  //         <path id="408" d="M171.7 37.5008L168.3 37.7008C168.1 37.2008 167.9 36.7008 167.5 36.3008L171.4 36.7008C171.6 36.9008 171.6 37.2008 171.7 37.5008Z" fill={cardData?.dominantColor}/>
  //         <path id="407" d="M168.6 39.5984V39.3984C168.6 38.7984 168.5 38.1984 168.3 37.5984L171.7 37.3984C171.8 37.6984 171.9 38.0984 171.9 38.3984C171.9 38.4984 168.6 39.5984 168.6 39.5984Z" fill={cardData?.dominantColor}/>
  //         <path id="406" d="M172 39.5984V40.9984L168.6 40.5984V39.5984L171.9 38.3984C172 38.7984 172 39.1984 172 39.5984Z" fill={cardData?.dominantColor}/>
  //         <path id="405" d="M172 41.0016V42.3016L168.6 41.9016V40.6016L172 41.0016Z" fill={cardData?.dominantColor}/>
  //         <path id="404" d="M172 42.2984V43.4984L168.6 42.9984V41.8984L172 42.2984Z" fill={cardData?.dominantColor}/>
  //         <path id="403" d="M172 43.5V44.8L168.6 45.1V43L172 43.5Z" fill={cardData?.dominantColor}/>
  //         <path id="402" d="M172 44.8008V46.4008H168.6V45.1008L172 44.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="401" d="M172 46.3984V47.8984L168.6 47.9984V46.3984H172Z" fill={cardData?.dominantColor}/>
  //         <path id="400" d="M172 47.8984V48.9984L169.5 49.9984H168.6V47.9984L172 47.8984Z" fill={cardData?.dominantColor}/>
  //         <path id="399" d="M169.5 50L168.6 50.4V50H169.5Z" fill={cardData?.dominantColor}/>
  //         <path id="398" d="M172 49V50.1L169.5 50L172 49Z" fill={cardData?.dominantColor}/>
  //         <path id="397" d="M172 50.1V51.2L170.4 52.2L168.6 52.4V50.4L169.5 50L172 50.1Z" fill={cardData?.dominantColor}/>
  //         <path id="396" d="M172 51.1992V52.0992L170.4 52.1992L172 51.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="395" d="M172 52.1016V54.0016L170.4 54.7016L168.6 54.5016V53.4016L170.4 52.2016L172 52.1016Z" fill={cardData?.dominantColor}/>
  //         <path id="394" d="M172 54V54.8L170.4 54.7L172 54Z" fill={cardData?.dominantColor}/>
  //         <path id="393" d="M170.4 54.7L168.6 55.5V54.5L170.4 54.7Z" fill={cardData?.dominantColor}/>
  //         <path id="392" d="M172 54.7992V56.2992L170.4 57.1992L168.6 57.0992V55.4992L170.4 54.6992L172 54.7992Z" fill={cardData?.dominantColor}/>
  //         <path id="391" d="M170.4 57.2016L168.6 58.1016V57.1016L170.4 57.2016Z" fill={cardData?.dominantColor}/>
  //         <path id="390" d="M172 56.3008V57.2008H170.4L172 56.3008Z" fill={cardData?.dominantColor}/>
  //         <path id="389" d="M172 57.1992V58.7992L170.3 59.5992L168.6 59.3992V58.0992L170.4 57.1992H172Z" fill={cardData?.dominantColor}/>
  //         <path id="388" d="M172 58.8008V59.8008L170.3 59.6008L172 58.8008Z" fill={cardData?.dominantColor}/>
  //         <path id="387" d="M170.3 59.5984L168.6 60.3984V59.3984L170.3 59.5984Z" fill={cardData?.dominantColor}/>
  //         <path id="386" d="M172 59.8016V61.4016L168.6 61.5016V60.4016L170.3 59.6016L172 59.8016Z" fill={cardData?.dominantColor}/>
  //         <path id="385" d="M172 61.3984V63.7984L168.6 63.1984V61.4984L172 61.3984Z" fill={cardData?.dominantColor}/>
  //         <path id="384" d="M172 63.7992V65.6992L168.6 64.8992V63.1992L172 63.7992Z" fill={cardData?.dominantColor}/>
  //         <path id="383" d="M172 65.6984V66.8984H168.6V64.8984L172 65.6984Z" fill={cardData?.dominantColor}/>
  //         <path id="382" d="M172 66.8984V68.7984L168.6 68.1984V66.8984H172Z" fill={cardData?.dominantColor}/>
  //         <path id="381" d="M172 68.7992V70.1992L168.6 70.5992V68.1992L172 68.7992Z" fill={cardData?.dominantColor}/>
  //         <path id="380" d="M172 70.1992V71.5992L168.6 72.1992V70.5992L172 70.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="379" d="M172 71.6016V74.0016L170.2 74.6016L168.6 73.6016V72.2016L172 71.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="378" d="M170.2 74.6016L168.6 75.1016V73.6016L170.2 74.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="377" d="M172 74V75.6L170.2 74.6L172 74Z" fill={cardData?.dominantColor}/>
  //         <path id="376" d="M172 75.6016V77.1016L168.6 76.6016V75.1016L170.2 74.6016L172 75.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="375" d="M172 77.1016V78.6016L168.6 78.1016V76.6016L172 77.1016Z" fill={cardData?.dominantColor}/>
  //         <path id="374" d="M172 78.6016V79.7016L168.6 80.1016V78.1016L172 78.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="373" d="M172 79.6992V81.1992L168.6 81.4992V80.0992L172 79.6992Z" fill={cardData?.dominantColor}/>
  //         <path id="372" d="M172 81.1992V83.2992L168.6 82.5992V81.4992L172 81.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="371" d="M172 83.3016V85.2016L168.6 83.9016V82.6016L172 83.3016Z" fill={cardData?.dominantColor}/>
  //         <path id="370" d="M172 85.1984V85.9984L170.6 86.5984L168.6 86.3984V83.8984L172 85.1984Z" fill={cardData?.dominantColor}/>
  //         <path id="369" d="M172 86V86.7L170.6 86.6L172 86Z" fill={cardData?.dominantColor}/>
  //         <path id="368" d="M170.6 86.5984L168.6 87.3984V86.3984L170.6 86.5984Z" fill={cardData?.dominantColor}/>
  //         <path id="367" d="M172 86.7016V88.7016H168.6V87.4016L170.6 86.6016L172 86.7016Z" fill={cardData?.dominantColor}/>
  //         <path id="366" d="M172 88.6992V90.8992L168.6 90.2992V88.6992H172Z" fill={cardData?.dominantColor}/>
  //         <path id="365" d="M172 90.9008V92.2008L170.9 92.6008L168.6 92.2008V90.3008L172 90.9008Z" fill={cardData?.dominantColor}/>
  //         <path id="364" d="M172 92.1992V92.7992L170.9 92.5992L172 92.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="363" d="M170.9 92.5992L168.6 93.4992V92.1992L170.9 92.5992Z" fill={cardData?.dominantColor}/>
  //         <path id="362" d="M172 92.8016V95.4016H168.6V93.5016L170.9 92.6016L172 92.8016Z" fill={cardData?.dominantColor}/>
  //         <path id="361" d="M172 95.3984V97.6984L168.6 96.9984V95.3984H172Z" fill={cardData?.dominantColor}/>
  //         <path id="360" d="M172 97.7V98.7L168.6 98.4V97L172 97.7Z" fill={cardData?.dominantColor}/>
  //         <path id="359" d="M172 98.6984V101.198L168.6 99.9984V98.3984L172 98.6984Z" fill={cardData?.dominantColor}/>
  //         <path id="358" d="M172 101.2V102.9L168.6 102.3V100L172 101.2Z" fill={cardData?.dominantColor}/>
  //         <path id="357" d="M172 102.901V104.601L168.6 103.901V102.301L172 102.901Z" fill={cardData?.dominantColor}/>
  //         <path id="356" d="M172 104.598V106.798L168.6 105.998V103.898L172 104.598Z" fill={cardData?.dominantColor}/>
  //         <path id="355" d="M172 106.8V108.2L168.6 108V106L172 106.8Z" fill={cardData?.dominantColor}/>
  //         <path id="354" d="M172 108.2V110.4L168.6 109.2V108L172 108.2Z" fill={cardData?.dominantColor}/>
  //         <path id="353" d="M172 110.399V111.199L170.3 111.799L168.6 111.099V109.199L172 110.399Z" fill={cardData?.dominantColor}/>
  //         <path id="352" d="M170.3 111.802L168.6 112.402V111.102L170.3 111.802Z" fill={cardData?.dominantColor}/>
  //         <path id="351" d="M172 111.199V112.499L170.3 111.799L172 111.199Z" fill={cardData?.dominantColor}/>
  //         <path id="350" d="M172 112.501V113.501L168.6 113.201V112.401L170.3 111.801L172 112.501Z" fill={cardData?.dominantColor}/>
  //         <path id="349" d="M172 113.499V115.299L168.6 114.699V113.199L172 113.499Z" fill={cardData?.dominantColor}/>
  //         <path id="348" d="M172 115.299V116.599L168.6 116.299V114.699L172 115.299Z" fill={cardData?.dominantColor}/>
  //         <path id="347" d="M172 116.601V117.801L168.6 118.001V116.301L172 116.601Z" fill={cardData?.dominantColor}/>
  //         <path id="346" d="M172 117.801V119.101L168.6 119.601V118.001L172 117.801Z" fill={cardData?.dominantColor}/>
  //         <path id="345" d="M172 119.102V121.202L168.6 120.702V119.602L172 119.102Z" fill={cardData?.dominantColor}/>
  //         <path id="344" d="M172 121.199V123.499L168.6 122.099V120.699L172 121.199Z" fill={cardData?.dominantColor}/>
  //         <path id="343" d="M172 123.502V124.402L168.6 124.202V122.102L172 123.502Z" fill={cardData?.dominantColor}/>
  //         <path id="341" d="M172 126.299V128.299L168.6 127.099V125.199L172 126.299Z" fill={cardData?.dominantColor}/>
  //         <path id="340" d="M172 128.302V129.902L169.9 131.102L168.6 130.202V127.102L172 128.302Z" fill={cardData?.dominantColor}/>
  //         <path id="339" d="M172 129.898V132.498L169.9 131.098L172 129.898Z" fill={cardData?.dominantColor}/>
  //         <path id="338" d="M169.9 131.099L168.6 131.799V130.199L169.9 131.099Z" fill={cardData?.dominantColor}/>
  //         <path id="337" d="M172 132.502V134.702L168.6 133.702V131.802L169.9 131.102L172 132.502Z" fill={cardData?.dominantColor}/>
  //         <path id="336" d="M172 134.699V135.999L169.9 136.999L168.6 136.199V133.699L172 134.699Z" fill={cardData?.dominantColor}/>
  //         <path id="335" d="M172 136V138.1L169.9 137L172 136Z" fill={cardData?.dominantColor}/>
  //         <path id="334" d="M169.9 136.999L168.6 137.599V136.199L169.9 136.999Z" fill={cardData?.dominantColor}/>
  //         <path id="333" d="M172 138.1V139.9L168.6 138.9V137.6L169.9 137L172 138.1Z" fill={cardData?.dominantColor}/>
  //         <path id="332" d="M172 139.898V141.298L168.6 140.398V138.898L172 139.898Z" fill={cardData?.dominantColor}/>
  //         <path id="331" d="M172 141.298V142.398L168.6 142.798V140.398L172 141.298Z" fill={cardData?.dominantColor}/>
  //         <path id="330" d="M172 142.398V144.998L168.6 143.998V142.798L172 142.398Z" fill={cardData?.dominantColor}/>
  //         <path id="329" d="M172 145V146.2L168.6 146V144L172 145Z" fill={cardData?.dominantColor}/>
  //         <path id="328" d="M172 146.2V147.2L168.6 147.5V146L172 146.2Z" fill={cardData?.dominantColor}/>
  //         <path id="327" d="M172 147.199V148.999L168.6 148.499V147.499L172 147.199Z" fill={cardData?.dominantColor}/>
  //         <path id="326" d="M172 149V150.3L168.6 150.4V148.5L172 149Z" fill={cardData?.dominantColor}/>
  //         <path id="325" d="M172 150.301V152.101L168.6 151.701V150.401L172 150.301Z" fill={cardData?.dominantColor}/>
  //         <path id="324" d="M172 152.099V154.199L168.6 153.299V151.699L172 152.099Z" fill={cardData?.dominantColor}/>
  //         <path id="323" d="M172 154.201V155.201L168.6 155.301V153.301L172 154.201Z" fill={cardData?.dominantColor}/>
  //         <path id="79" d="M9.1998 31.6016C9.0998 32.5016 8.9998 33.4016 8.9998 34.4016L7.2998 32.5016L7.3998 31.7016C7.5998 31.7016 7.7998 31.7016 7.9998 31.7016C7.9998 31.6016 9.1998 31.6016 9.1998 31.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="342" d="M172 124.399V126.299L168.6 125.199V124.199L172 124.399Z" fill={cardData?.dominantColor}/>
  //         <path id="396.5" d="M170.4 52.1992L168.6 53.3992V52.3992L170.4 52.1992Z" fill={cardData?.dominantColor}/>
  //         <path id="457" d="M118.6 32.5016L116.9 33.7016L115.7 32.3016L116.5 31.6016H117.5L118.6 32.5016Z" fill={cardData?.dominantColor}/>
  //         <path id="464" d="M113.8 33.8L113 34.4H111.1L110.7 34L112.6 32.5L113.8 33.8Z" fill={cardData?.dominantColor}/>
  //         <path id="460" d="M116.9 33.7008L115.9 34.4008H114.4L113.8 33.8008L115.7 32.3008L116.9 33.7008Z" fill={cardData?.dominantColor}/>
  //         <path id="467" d="M110.7 33.9992L110.1 34.3992H108.3L107.5 33.8992L109 32.1992L110.7 33.9992Z" fill={cardData?.dominantColor}/>
  //         <path id="478" d="M102.5 32.5992L101.7 33.4992L100.4 32.5992L101.4 31.6992L102.5 32.5992Z" fill={cardData?.dominantColor}/>
  //         <path id="490" d="M93.7002 32.6016L92.4002 33.7016L90.7002 32.2016L91.3002 31.6016H91.8002L93.7002 32.6016Z" fill={cardData?.dominantColor}/>
  //         <path id="492" d="M92.4002 33.6992L91.7002 34.3992H90.5002L89.7002 33.3992L90.7002 32.1992L92.4002 33.6992Z" fill={cardData?.dominantColor}/>
  //         <path id="500" d="M86.8999 33.8992L86.2999 34.3992L84.8999 33.4992L85.5999 32.1992L86.8999 33.8992Z" fill={cardData?.dominantColor}/>
  //         <path 
  //         onAnimationEnd={e => {
  //           // if (e.elapsedTime <= 1) return 
  //           // console.log('AAAAAAAAAAAAA', e.elapsedTime)
  //           // setIsEndedAnimationOfLastPath(true)
  //         }}
  //         ref={lastPathRef}
  //         id="504" d="M84.9002 33.4984L84.3002 34.3984H84.2002C83.7002 34.3984 83.2002 33.8984 83.2002 33.3984V32.5984C83.2002 32.4984 83.2002 32.3984 83.2002 32.3984L84.9002 33.4984Z" fill={cardData?.dominantColor}/>
  //         </g>
  //         </g>

  //         <g>
            
  //           <path d="M164.4 31.6016H84.5999C84.0999 31.6016 83.5999 32.1016 83.5999 32.6016V33.4016C83.5999 33.9016 84.0999 34.4016 84.5999 34.4016H164C166.8 34.4016 169 36.6016 169 39.4016V237.902C169 240.702 166.8 242.902 164 242.902H8.7999C5.9999 242.902 3.7999 240.702 3.7999 237.902V39.4016C3.7999 36.6016 5.9999 34.4016 8.7999 34.4016H9.3999C9.3999 33.4016 9.4999 32.5016 9.5999 31.6016H8.3999C3.9999 31.6016 0.399902 35.2016 0.399902 39.6016V237.802C0.399902 242.202 3.9999 245.802 8.3999 245.802H164.4C168.8 245.802 172.4 242.202 172.4 237.802V39.6016C172.4 35.2016 168.8 31.6016 164.4 31.6016Z" fill={cardData?.dominantColor}
  //           fillOpacity={isEndedAnimationOfLastPath? 1 : 0}
  //           />
  //           <path d="M44.9999 0C25.6999 0 9.9999 15.3 9.3999 34.4H12.1999C12.8999 16.9 27.2999 2.8 44.9999 2.8C62.6999 2.8 77.7999 17.5 77.7999 35.6C77.7999 53.7 63.1999 68.5 44.9999 68.5C28.3999 68.5 14.6999 56.2 12.4999 40.2C12.3999 39.2 12.3999 36.5 10.3999 37C8.8999 37.4 9.4999 39.2 9.6999 40.2C11.8999 57.7 26.8999 71.3 44.9999 71.3C64.6999 71.3 80.6999 55.3 80.6999 35.6C80.6999 15.9 64.6999 0 44.9999 0Z" fill={cardData?.dominantColor}
  //           fillOpacity={isEndedAnimationOfLastPath? 1 : 0}
  //           />
  //         </g>
          
  //       </g>
  //     </svg> 

    

  //   </div>
  // );
}



// function Result({item}: {item: ResultType}) {
//   // console.log(item)
//   const {setIsVisibleCardPage, setCard, setScrollTop} = useContext(CardBeingViewedContext)

//   const {setIsLoadingBackdropImage} = useContext(ThemeContext)

//   const [hasFailedImage, setHasFailedImage] = useState(false)

//   function handleClick() {
//     setIsLoadingBackdropImage(true)
//     setIsVisibleCardPage(true)
//     setCard(item)
//     setScrollTop(document.documentElement.scrollTop)
//   }

  
//   return (
//     <button 
//       onClick={handleClick} 
//       // onMouseEnter={handleMouseEnter}
//     >
//       <Image 
//         src={
//           hasFailedImage 
//           ? '/no-image.png'
//           : ImagePath+item.poster_path || '/no-image.png'
//         }
//         width={200}
//         height={300}
//         alt={item.name || item.title || item.original_name || 'unknown'}
//         // priority
//         placeholder="blur"
//         blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
//         onError={() => setHasFailedImage(true)}
//         // className="max-w-full h-auto object-contain "
//       />
//     </button>
//   )
// }
