import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import { ImagePath, PLACEHOLDER_IMAGE, ResultType } from "@/app/lib/types";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import MoviesOrTVshowsLinksContext from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import { IoStar } from "react-icons/io5";
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel";
import ToggleShowPersonContext from '@/app/(__pages__)/context/ToggleShowPersonContext'



export default function Starring(
  {stars, card}: {
    stars: MediaTypeInfoType['credits']['cast'] | MediaTypeInfoType['credits']['crew'],
    card: ResultType
  }
) {
  return (
    <>
      {
        stars.map((star, i) => (
          !('job' in star) && <li key={i} 
            className="flex items-start justify-center"
          >
            <Star castItem={star} card={card}/>
          </li>
        ))
      }
    </>
  )
}


function Star(
    {castItem, card}: {
      castItem: MediaTypeInfoType['credits']['cast'][0],
      card: ResultType
    }
  ) {

    const imageRef = useRef<HTMLImageElement | null>(null)
    
    const {links} = useContext(MoviesOrTVshowsLinksContext)

    const {
      setIsVisiblePerson, setPersonDetails
    } = useContext(ToggleShowPersonContext)

    const [personDetail, setPersonDetail] = 
    useState({} as MediaTypeInfoType['personDetails']) 
    const [noImageUrl, setNoImageUrl] = useState('')
    const [imageColor, setImageColor] = useState('')

    const myCard: ResultType = {...card}
    myCard.backdrop_path = castItem.profile_path

    useImagePixel({
      card: myCard, imageRef, setColor: setImageColor
    })

    // console.log({...castItem, ...personDetail})

    useEffect(() => {
      try {
        (async () => {
          const {data}: {data: MediaTypeInfoType['personDetails']} = await axios(
            `${links.INFOS.personDetails.beforeStr}${castItem.id}${links.INFOS.personDetails.afterStr}`,
            TMDBOptions
          )
          // console.log({data})
          setPersonDetail(data)
        })()
      } catch(err: any) {
        console.log(err)
      }
    }, [castItem, links])

    /* 
    <span className=" rounded-full  w-[clamp(60px,10vmin,100px)] h-[clamp(60px,10vmin,100px)] flex items-center justify-center overflow-hidden ">
     
    </span>
    <span>{cast.name}</span>
     */

  return (
    <svg width="172" height="159" viewBox="0 0 172 159" fill="none" xmlns="http://www.w3.org/2000/svg"
    className='cursor-pointer m-6p'
    onClick={() => {
      setIsVisiblePerson(true)
      setPersonDetails(personDetail)
    }}
    >
      <path d="M24.0291 22.0577L19.7352 17.7637C15.4413 23.5907 12.681 30.6457 12.3742 38.0067H9.30715C4.09314 38.0067 0.105957 41.9937 0.105957 47.2077L0.105957 145.353C0.105957 150.568 4.09314 154.555 9.30715 154.555H126.162V148.421H9.30715C7.46691 148.421 6.24008 147.194 6.24008 145.353L6.24008 47.2077C6.24008 45.3677 7.46691 44.1407 9.30715 44.1407H12.3742C12.9877 51.5017 15.4413 58.5557 19.7352 64.3831L24.0291 60.0892C20.3486 54.5685 18.2016 48.1277 18.2016 41.0737C18.2016 34.0187 20.3486 27.2717 24.0291 22.0577Z" fill={imageColor}/>
      <path d="M162.353 44.1407C164.193 44.1407 165.42 45.3677 165.42 47.2077V145.353C165.42 147.194 164.193 148.421 162.353 148.421H157.139V154.555H162.353C167.567 154.555 171.554 150.568 171.554 145.353V47.2077C171.554 41.9937 167.567 38.0067 162.353 38.0067H157.139V44.1407H162.353Z" fill={imageColor}/>
      <path d="M94.8774 38.0066V44.1406H125.548V38.0066H94.8774Z" fill={imageColor}/>
      <path d="M50.4048 74.5046V80.6387H51.9383C60.2194 80.6387 68.5005 77.8783 75.248 72.971L70.9541 68.6772C65.4334 72.3576 58.9926 74.5046 51.9383 74.5046C51.3249 74.8113 50.7115 74.5046 50.4048 74.5046Z" fill={imageColor}/>
      <path d="M44.2724 1.81538C36.2981 3.34938 29.2438 7.33639 23.7231 12.8574L28.017 17.1504C34.1511 11.0164 42.7389 7.02939 51.9401 7.02939C58.9943 7.02939 65.4352 9.17639 70.9559 12.8574L75.2498 8.56339C68.5022 3.65539 60.2212 0.895386 51.9401 0.895386H50.4066C48.2596 1.20239 46.1127 1.50838 44.2724 1.81538Z" fill={imageColor}/>
      <path d="M28.017 64.6901L23.7231 68.984C29.2438 74.8114 36.6048 78.4919 44.2724 80.0254V73.5846C37.8316 72.3577 32.3109 68.984 28.017 64.6901Z" fill={imageColor}/>
      <path d="M85.6765 41.0744C85.6765 50.5814 81.996 58.863 75.5552 64.9971L79.8491 69.291C86.5966 62.5435 90.8905 53.6494 91.8106 44.1414V38.0074C91.1972 28.4994 86.9033 19.6044 80.1558 12.8574L75.8619 17.1514C81.6893 22.9784 85.6765 31.5664 85.6765 41.0744Z" fill={imageColor}/>



      <foreignObject x="19" y="8" width="65" height="65"  >
        <div className="flex justify-center items-center h-full w-full p-2 rounded-full overflow-hidden"
          style={{backgroundColor: imageColor}}
        >
          <Image 
            ref={imageRef}
            src={noImageUrl || ImagePath + castItem.profile_path} 
            alt={castItem.name} 
            width={40} height={40}
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            onError={() => setNoImageUrl('/no-image.png')}
            priority
            className="w-auto h-auto"
          /> 
        </div>
      </foreignObject>
      

      <foreignObject x="126" y="33" width="31" height="16"   >
      <div className="flex justify-between items-center h-full w-full rounded-md"
        style={{color: imageColor}}
      >
        <span>(</span>
        <span className="text-sm italic text-white">
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
        <span>)</span>
      </div>
    </foreignObject>


      
      <foreignObject x="92" y="52" width="72" height="22"  >
      <div className="flex justify-center items-center h-full w-full  p-2 italic text-sm">
        {castItem.known_for_department}
      </div>
    </foreignObject>
      
      
      <foreignObject x="8" y="75" width="156" height="74"  >
      <div className="flex justify-center items-center flex-wrap h-full w-full  pb-2 pt-1">
        <p className="truncate ...">{castItem.name}</p>
        <p className="truncate ... w-full text-center text-sm italic">As</p>
        <p className="truncate ...">{castItem.character}</p>
      </div>
    </foreignObject>


      <foreignObject x="126" y="143" width="31" height="16"   >
      <div className="flex justify-center items-center h-full w-full rounded-md ">
        <IoStar color="gold"/>
        <IoStar color="gold"/>
      </div>
    </foreignObject>
    </svg>
  )
}