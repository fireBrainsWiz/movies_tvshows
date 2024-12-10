'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SVGRect, ToViewCoordsAndInfo } from "./PopularPeopleCards";
import { PopularPeopleList } from "../layout";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import { getGenderByNumber } from "@/app/modals/card/lib/utils";
import useImagePixel from "../../hooks/useImagePixel";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { steal } from "@/app/modals/card/lib/colorThief";
import { getSortedPosterPathsOfKnownFors } from "@/app/modals/card/lib/utils";



const personDetailsLink = {
  beforeStr: 'https://api.themoviedb.org/3/person/',
  afterStr: '?language=en-US'
}

export function Card({
    setIsActiveToViewSVG, setToViewCoordsAndInfo, 
    i,
    result,
    setCardData
  }: {
    setIsActiveToViewSVG: (_: boolean) => void;
    setToViewCoordsAndInfo: (_: ToViewCoordsAndInfo) => void;
    i: number;
    result: PopularPeopleList['results'][number];
    setCardData: (_: PopularPeopleList['results'][number] & 
    MediaTypeInfoType['personDetails'] & 
    {imageColor: string, dominantColor: string}) => void
  }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [imageColor, setImageColor] = useState('')
  const [personDetail, setPersonDetail] = 
  useState({} as MediaTypeInfoType['personDetails']) 


  const color = steal(imageRef.current)
  const dominantColor = 'rgb('+ color?.[2]?.join(',') +')'

  
  function handleCardClick() {
    const svg = svgRef.current;
    if (!svg) return;

    document.body.style.overflow = 'hidden'

    const { x, y, width, height } = svg.getBoundingClientRect();

    setToViewCoordsAndInfo({
      innerHeight: window.innerHeight,
      scrollY: window.scrollY,
      scrollHeight: document.body.scrollHeight,
      x, y, width, height,
      i,
      isActiveToViewSVG: true
    });

    setIsActiveToViewSVG(true);
    setCardData({
      ...personDetail,
      ...result,
      imageColor,
      dominantColor
    })
  }

  useImagePixel({
    backdrop_path: result.profile_path,
    imageRef,
    setColor: setImageColor,
  })

  // fetch person details
  useEffect(() => {
    try {
      (async () => {
        const {data}: {data: MediaTypeInfoType['personDetails']} = await axios(
          `${personDetailsLink.beforeStr}${result.id}${personDetailsLink.afterStr}`,
          TMDBOptions
        )
        // console.log({data})
        setPersonDetail(data)
      })()
    } catch(err: any) {
      console.log(err)
    }
  }, [result.id])

  // console.log(personDetail)

    
  return (
    <svg width="173" height="246" viewBox="0 0 173 246" fill="none" xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    onClick={handleCardClick} 
    className="cursor-pointer xl:w-[calc(100%_/_7)] xl:h-[calc(100%_/_7)] 2xl:w-[calc(100%_/_9)] 2xl:h-[calc(100%_/_9)]"
    // filter="url(#displacementFilter)" 
    >
    <rect x="4" y="34" width="165" height="210" fill={imageColor} fillOpacity={0.5}/>

    <filter id="displacementFilter">
    <feTurbulence
      type="turbulence"
      baseFrequency="0"
      numOctaves={2}
      result="turbulence" 
      // seed="1000"
    >
      <animate
        attributeName="baseFrequency"
        values="0.0;0.05;0.0"
        dur="5s"
        repeatCount="1" 
      />

    </feTurbulence>


      <feDisplacementMap
        in2="turbulence"
        in="SourceGraphic"
        scale="0"
        xChannelSelector="R"
        yChannelSelector="G"
      >
        <animate
          attributeName="scale"
          values="0;10;0;-10;0"
          dur="5s"
          repeatCount="1" 
        />
      </feDisplacementMap>
    </filter>
    
   

    <g>
      <foreignObject x="12" y="3" width="66" height="65" 
        filter="url(#displacementFilter)" 
      >
        <div className={`w-full h-full  rounded-full overflow-hidden flex justify-center `}
          style={{backgroundColor: imageColor}}
        >
          <Image 
            ref={imageRef}
            src={
              result.profile_path
              ? ImagePath+result.profile_path 
              : '/no-image.png'
            }
            alt={result.name || 'profile image'} 
            width={100} 
            height={150} 
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            className="max-w-full h-auto object-contain "
          />
        </div>
      </foreignObject>

      <foreignObject  x="81" y="35" width="87" height="37">
        <div className="w-full h-full bg-[#922D2D]p leading-[16px]">
          <p className="text-center my-[2px]">{result.known_for_department}</p>
          <p className="text-center text-xs truncate">{
            getGenderByNumber(result.gender)
          }</p>
        </div>
      </foreignObject>
      

      <foreignObject  x="4" y="78" width="166" height="165">
        <div className="w-full h-full bg-[#6E5E20]p flex flex-wrap">
          <p className=" p-2 truncate underline w-[90%]">
            {result.name}
          </p>
          <div className="text-xs w-[90%] mx-2">
            {
              personDetail?.birthday ? ( 
                <p className="truncate grid grid-cols-[70%_30%] justify-between">
                <span>{personDetail.birthday}</span>
                <span className="italic pr-[2px] text-end">
                  {
                    personDetail?.deathday && 
                    personDetail?.birthday
                    ? (
                      Number(personDetail.deathday.slice(0,4)) -
                      Number(personDetail.birthday.slice(0,4))
                    )
                    : personDetail?.birthday
                      ? (
                        new Date().getFullYear() -
                        Number(personDetail.birthday.slice(0,4))
                      )
                      : <span className="text-[9px]">N/A</span>
                  }
                </span>
              </p>
            ) : <span className="text-[9px]">N/A</span>
          }
            
          {
            personDetail?.place_of_birth 
            ? <p className="truncate">{personDetail.place_of_birth}</p>
            : <span className="text-[9px]">N/A</span>
          }
        </div>
            <div className="grid grid-cols-3 gap-1 w-full self-end">
              {
                getSortedPosterPathsOfKnownFors(result)
                .map((result, i) => {
                  return i<=3 && (
                  <KnownForImageSample
                    key={i}
                    i={i}
                    result={result}
                  />
                )})
              }
            </div>
      
        </div>
      </foreignObject>
    </g>

    <g>
      <path d="M164.4 31.6016H84.5999C84.0999 31.6016 83.5999 32.1016 83.5999 32.6016V33.4016C83.5999 33.9016 84.0999 34.4016 84.5999 34.4016H164C166.8 34.4016 169 36.6016 169 39.4016V237.902C169 240.702 166.8 242.902 164 242.902H8.7999C5.9999 242.902 3.7999 240.702 3.7999 237.902V39.4016C3.7999 36.6016 5.9999 34.4016 8.7999 34.4016H9.3999C9.3999 33.4016 9.4999 32.5016 9.5999 31.6016H8.3999C3.9999 31.6016 0.399902 35.2016 0.399902 39.6016V237.802C0.399902 242.202 3.9999 245.802 8.3999 245.802H164.4C168.8 245.802 172.4 242.202 172.4 237.802V39.6016C172.4 35.2016 168.8 31.6016 164.4 31.6016Z" fill={dominantColor}
      filter="url(#displacementFilter)"
      />
      <path d="M44.9999 0C25.6999 0 9.9999 15.3 9.3999 34.4H12.1999C12.8999 16.9 27.2999 2.8 44.9999 2.8C62.6999 2.8 77.7999 17.5 77.7999 35.6C77.7999 53.7 63.1999 68.5 44.9999 68.5C28.3999 68.5 14.6999 56.2 12.4999 40.2C12.3999 39.2 12.3999 36.5 10.3999 37C8.8999 37.4 9.4999 39.2 9.6999 40.2C11.8999 57.7 26.8999 71.3 44.9999 71.3C64.6999 71.3 80.6999 55.3 80.6999 35.6C80.6999 15.9 64.6999 0 44.9999 0Z" fill={dominantColor}
      filter="url(#displacementFilter)"
      />
    </g>

  </svg>
  )
}

function KnownForImageSample({
  result, i, 
}:{
  result: PopularPeopleList['results'][number]['known_for'][number]
  i: number
}) {

  return (
    <Image
      key={i}
      src={ 
        result.poster_path
        ? ImagePath+result.poster_path 
        : '/no-image.png'
      }
      alt={result.title || 'poster image'}
      width={100}
      height={150}
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
      className={`max-w-full h-auto object-contain mx-auto ${i===0? ' rounded-bl': i===2? 'rounded-br' : ''}`}
    />
  )
}

// function TriangleMovingAroundCircles() {
//   return (
//     <svg
//   width="100%"
//   height="100%"
//   viewBox="0 0 500 300"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlnsXlink="http://www.w3.org/1999/xlink">
//   <rect
//     x="1"
//     y="1"
//     width="498"
//     height="298"
//     fill="none"
//     stroke="green"
//     stroke-width="2" />

//   {/* Draw the outline of the motion path in brown, along
//           with three small circles at the start, middle and end. */}
//   <path
//     id="path1"
//     d="M100,250 C 100,50 400,50 400,250"
//     fill="none"
//     stroke="brown"
//     stroke-width="7.06" />
//   <circle cx="100" cy="250" r="17.64" fill="blue" />
//   <circle cx="250" cy="100" r="17.64" fill="blue" />
//   <circle cx="400" cy="250" r="17.64" fill="blue" />

//   {/* <!-- Here is a triangle which will be moved about the motion path.
//        It is defined with an upright orientation with the base of
//        the triangle centered horizontally just above the origin. --> */}
//   <path
//     d="M-25,-12.5 L25,-12.5 L 0,-87.5 z"
//     fill="yellow"
//     stroke="red"
//     stroke-width="7.06">
//     {/* <!-- Define the motion path animation --> */}
//     <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
//       <mpath href="#path1" />{/* move along #path1 */}
//     </animateMotion>
//   </path>
// </svg>

//   )
// }


// function Svg6() {
//   const [numOctaves, setNumOctaves] = useState(100) 

//   useEffect(()=>{
    
//     setTimeout(()=>{
//       if (numOctaves < 0) return
//       // setNumOctaves(numOctaves-1)
//     }, 10)
//   }, [numOctaves])
//   console.log(numOctaves)

//   // const values =  '0;100;0'
  
//   return (
//     <svg
//   width="200"
//   height="200"
//   viewBox="0 0 220 220"
//   xmlns="http://www.w3.org/2000/svg">
//   <filter id="displacementFilter">

//     {/* <feTurbulence
//       type="turbulence"
//       baseFrequency="0.05"
//       numOctaves={2}
//       result="turbulence" 
//     > */}
//     <feTurbulence
//       type="turbulence"
//       baseFrequency="0"
//       numOctaves={2}
//       result="turbulence" 
//       seed="1000"
//     >
//       <animate
//         attributeName="baseFrequency"
//         values="0.0;0.05;0.0"
//         dur="5s"
//         repeatCount="1" 
//       />
//       {/* <animate
//         attributeName="numOctaves"
//         values="0.0;2;0.0"
//         dur="5s"
//         repeatCount="1" 
//       /> */}
//     </feTurbulence>
    
//     <feDisplacementMap
//       in2="turbulence"
//       in="SourceGraphic"
//       scale="50"
//       xChannelSelector="R"
//       yChannelSelector="G" />
//   </filter>

//   {/* <circle cx="100" cy="100" r="100" filter="url(#displacementFilter)" fill="red"/> */}
//   {/* <rect width="137.87" height="175.32" rx="12" ry="12" fill="#a50a88" filter="url(#displacementFilter)"/> */}
//   <foreignObject  width="237.87" height="275.32" rx="20" ry="20" fill="#a50a88" filter="url(#displacementFilter)">
//     <div>
//       <Image src="/no-image.png" alt="sea" width={137.87} height={175.32} className=""/>
//     </div>
//   </foreignObject>
// </svg>

//   )
// }

// function Svggdh() {

//   return (
//     <svg
//   width="200"
//   height="200"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlnsXlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <filter id="spotlight">
//       <feFlood
//         result="floodFill"
//         x="0"
//         y="0"
//         width="100%"
//         height="100%"
//         floodColor="goldenrod"
//         floodOpacity="1" />
//       <feBlend in="SourceGraphic" in2="floodFill" mode="multiply" />
//     </filter>
//   </defs>

//   <image
//     href="/no-image.png"
//     x="10%"
//     y="10%"
//     width="80%"
//     height="80%"
//     filter="url(#spotlight)" />
// </svg>

//   )
// }


// function Svghsdg() {

//   return (
//     <svg viewBox="-10 -10 120 120">
//     <rect x="-10" y="-10" width="120" height="120" fill="#0033ff" />
//     <mask id="myMask">
//       {/* <!-- Everything under a white pixel will be visible --> */}
//       <rect x="0" y="0" width="100" height="100" fill="white" />
  
//       {/* <!-- Everything under a black pixel will be invisible --> */}
//       <path
//         d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z"
//         fill="black" />
//     </mask>
  
//     <polygon points="-10,110 110,110 110,-10" fill="#ff9100" />
  
//     {/* <!-- with this mask applied, we "punch" a heart shape hole into the circle --> */}
//     <circle cx="50" cy="50" r="50" fill="#770ac5" mask="url(#myMask)" />
//   </svg>
  

//   )
// }

// function Svg7({
//   result
// }: {
//   result: PopularPeopleList['results'][number]; 
// }) {


//   const imageRef = useRef<HTMLImageElement | null>(null)
//   const [imageColor, setImageColor] = useState('')
//   const [personDetail, setPersonDetail] = 
//   useState({} as MediaTypeInfoType['personDetails']) 

//   const color = steal(imageRef.current)
//   const dominantColor = 'rgb('+ color?.[2]?.join(',') +')'
//   console.log('dominantColor: ', dominantColor, color)
  

//   useImagePixel({
//     backdrop_path: result.profile_path,
//     imageRef,
//     setColor: setImageColor,
//   })

//   useEffect(() => {
//     try {
//       (async () => {
//         const {data}: {data: MediaTypeInfoType['personDetails']} = await axios(
//           `${personDetailsLink.beforeStr}${result.id}${personDetailsLink.afterStr}`,
//           TMDBOptions
//         )
//         // console.log({data})
//         setPersonDetail(data)
//       })()
//     } catch(err: any) {
//       console.log(err)
//     }
//   }, [result.id])

//   // console.log(personDetail)


//   return (
//     <svg width="173" height="246" viewBox="0 0 173 246" fill="none" xmlns="http://www.w3.org/2000/svg">
// <rect x="4" y="34" width="165" height="210" fill={imageColor} fillOpacity={0.5}/>
// <path d="M164.4 31.6016H84.5999C84.0999 31.6016 83.5999 32.1016 83.5999 32.6016V33.4016C83.5999 33.9016 84.0999 34.4016 84.5999 34.4016H164C166.8 34.4016 169 36.6016 169 39.4016V237.902C169 240.702 166.8 242.902 164 242.902H8.7999C5.9999 242.902 3.7999 240.702 3.7999 237.902V39.4016C3.7999 36.6016 5.9999 34.4016 8.7999 34.4016H9.3999C9.3999 33.4016 9.4999 32.5016 9.5999 31.6016H8.3999C3.9999 31.6016 0.399902 35.2016 0.399902 39.6016V237.802C0.399902 242.202 3.9999 245.802 8.3999 245.802H164.4C168.8 245.802 172.4 242.202 172.4 237.802V39.6016C172.4 35.2016 168.8 31.6016 164.4 31.6016Z" fill={dominantColor}/>
// <path d="M44.9999 0C25.6999 0 9.9999 15.3 9.3999 34.4H12.1999C12.8999 16.9 27.2999 2.8 44.9999 2.8C62.6999 2.8 77.7999 17.5 77.7999 35.6C77.7999 53.7 63.1999 68.5 44.9999 68.5C28.3999 68.5 14.6999 56.2 12.4999 40.2C12.3999 39.2 12.3999 36.5 10.3999 37C8.8999 37.4 9.4999 39.2 9.6999 40.2C11.8999 57.7 26.8999 71.3 44.9999 71.3C64.6999 71.3 80.6999 55.3 80.6999 35.6C80.6999 15.9 64.6999 0 44.9999 0Z" fill={dominantColor}/>

  


//     <foreignObject x="12" y="3" width="66" height="65" >
//       <div className={`w-full h-full  rounded-full overflow-hidden flex justify-center `}
//         style={{backgroundColor: imageColor}}
//       >
//         <Image 
//           ref={imageRef}
//           src={ImagePath+result.profile_path || ''}
//           alt={result.name || 'dsv'} 
//           width={50} 
//           height={50} 
//           priority
//           className="max-w-full h-auto object-contain "
//         />
//       </div>
//     </foreignObject>

//     <foreignObject  x="81" y="35" width="87" height="37">
//       <div className="w-full h-full bg-[#922D2D]p leading-[16px]">
//         <p className="text-center my-[2px]">{result.known_for_department}</p>
//         <p className="text-center text-xs truncate">{
//           getGenderByNumber(result.gender)
//         }</p>
//       </div>
//     </foreignObject>
    

//     <foreignObject  x="4" y="72" width="164" height="170">
//       <div className="w-full h-full bg-[#6E5E20]p flex flex-wrap">
//         <p className=" p-2 truncate underline">
//           {result.name}
//         </p>
//         <div className="text-xs">
//           {
//             personDetail?.birthday && 
//             <p>{personDetail.birthday + ','}</p>
//           }
          
//           {
//             personDetail?.place_of_birth &&
//             <p>{personDetail.place_of_birth}</p>
//           }
//         </div>
//           <div className="grid grid-cols-3 gap-1 bg-red-500p h-fullp w-full self-end">
//             {
//               getSortedPosterPathsOfKnownFors(result)
//               .map((posterPath, i) => (
//                 <Image
//                   key={i}
//                   src={ImagePath + posterPath}
//                   alt={result.name || 'dsv'}
//                   width={50}
//                   height={50}
//                   priority
//                   className={`max-w-full h-auto object-contain mx-auto ${i===0? ' rounded-bl': i===2? 'rounded-br' : ''}`}
//                 />
//               ))
//             }
//           </div>
    
//       </div>
//     </foreignObject>

//   </svg>


  


//   )
// }


