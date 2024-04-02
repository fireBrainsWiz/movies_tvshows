import {MediaTypeInfoType} from '@/app/lib/MediaTypeInfoTypes'
import Image from 'next/image'
import { ImagePath, PLACEHOLDER_IMAGE, ResultType } from '@/app/lib/types'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import MoviesOrTVshowsLinksContext from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import { getFirstXItems } from '../lib/utils'
import useImagePixel from '@/app/(__pages__)/hooks/useImagePixel'

import {steal} from '@/app/modals/card/lib/colorThief'
import ToggleMenuContext from '@/app/(__pages__)/context/ToggleMenuContext'
import ToggleShowPersonContext from '@/app/(__pages__)/context/ToggleShowPersonContext'




export default function Cast(
  {cast, card}: {
    cast: MediaTypeInfoType['credits']['cast'],
    card: ResultType
  }) {
       //  "known_for_department": "Acting",
    // sort by popularity or order
    // const castItems = getFirstXItems(cast).filter((item) => {
    //   return item.known_for_department === 'Acting'
    // }) as typeof cast
    const castItems =  cast


  return (
    <div className='w-full text-sm grid grid-flow-col overflow-x-auto justify-start pl-10'>
      {
        castItems.map((castItem, i) => (
          <CastItem
            key={i}
            castItem={castItem}
            card={card}
            i={i}
          />
        ))
      }
      {/* <CastItem castItem={cast[0]}/> */}
    </div>
  )
}

// note 2 or 3


function CastItem(
  {castItem, card, i} : {
    castItem: MediaTypeInfoType['credits']['cast'][0],
    card: ResultType,
    i: number
  }
  ) {
    // console.log(castItem.id)
    const imageRef = useRef<HTMLImageElement | null>(null)
    
    const {links} = useContext(MoviesOrTVshowsLinksContext)

    const {
      setIsVisiblePerson, setPersonDetails
    } = useContext(ToggleShowPersonContext)

    const [personDetail, setPersonDetail] = 
    useState({} as MediaTypeInfoType['personDetails']) 

    const [noImageUrl, setNoImageUrl] = useState('')
    const [imageColor, setImageColor] = useState('')
    // const [colorThiefColor, setColorThiefColor] = useState('')

    const myCard = {...card}
    myCard.backdrop_path = castItem.profile_path

    useImagePixel({
      card: myCard, imageRef, setColor: setImageColor
    })

    //colorThief
    // useEffect(() => {
    //   const img = imageRef.current
    //   if (!img) return 
      
    //   const fn = () => {
    //     const color = steal(img)
    //     // console.log(color)
    //     setColorThiefColor(
    //       `rgb(${color[0]},${color[1]},${color[2]})`
    //     )
    //   }

    //   img.addEventListener('load', fn);

    //   return () => {
    //     img.removeEventListener('load', fn)
    //   }

    // }, [imageRef, setColorThiefColor])

    // console.log(colorThiefColor)

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

    // castItem.character = 'hello world how are you doing,'
    
    const px = (() => (
      castItem.character.length <= 10 
      ? 16 
      : castItem.character.length <= 20 
      ? 15
      : castItem.character.length <= 30 
      ? 14
      : castItem.character.length <= 40 
      ? 13 
      : castItem.character.length <= 50 
      ? 12
      : castItem.character.length <= 60 
      ? 11
      : castItem.character.length <= 70 
      ? 10
      : castItem.character.length <= 80 
      ? 9
      : castItem.character.length <= 90 
      ? 8
      : castItem.character.length <= 100 
      ? 7 : 6
    ))()

    //? for testing
    useEffect(() => {
      if (i) return
      // setIsVisiblePerson(true)
      // setPersonDetails(personDetail)
    }, [personDetail, setIsVisiblePerson, setPersonDetails, i])


    // console.log(personDetail.id)

  return (
    <svg width="154" height="172" viewBox="0 0 154 172" fill="none" xmlns="http://www.w3.org/2000/svg"
      className='cursor-pointer m-6'
      onClick={() => {
        setIsVisiblePerson(true)
        setPersonDetails(personDetail)
      }}
    >
      <path d="M126.143 132.07H0.214844V138.213H73.3144H110.786H116.928H125.835H126.143C129.521 138.213 132.285 140.977 132.285 144.356C132.285 147.734 129.521 150.499 126.143 150.499H125.835H116.928H110.786V156.642V162.784V163.092C110.786 164.627 109.25 165.856 107.714 165.856H9.42907C7.58623 165.856 6.35766 164.627 6.35766 162.784V156.642V150.499H0.214844V156.642V162.784C0.214844 168.006 4.20768 171.999 9.42907 171.999H107.714C112.936 171.999 116.928 168.006 116.928 162.784V156.642H126.143C132.9 156.642 138.428 151.113 138.428 144.356C138.428 137.599 132.9 132.07 126.143 132.07Z" fill={imageColor}/>
      <path d="M116.928 12.2856V9.21423C116.928 3.99283 112.936 0 107.714 0H9.42907C4.20767 0 0.214844 3.99283 0.214844 9.21423V132.5H6.35766V9.21423C6.35766 7.37138 7.58623 6.14282 9.42907 6.14282H107.714C109.557 6.14282 110.786 7.37138 110.786 9.21423V12.2856C90.5143 13.8213 74.8501 30.0998 73.9287 50.3711V52.214C73.9287 63.271 78.5358 73.7138 86.5214 81.3923C102.493 96.4422 127.985 95.828 143.035 79.8566C150.1 72.4853 153.785 62.6567 153.785 52.5211V50.9854C153.785 50.6782 153.785 50.6782 153.785 50.6782C152.864 30.0998 136.893 13.8213 116.928 12.2856ZM113.857 87.228C94.5071 87.228 78.8429 71.5638 78.8429 52.214C78.8429 32.8641 94.5071 17.1999 113.857 17.1999C133.207 17.1999 148.871 32.8641 148.871 52.214C148.871 71.5638 133.207 87.228 113.857 87.228Z" fill={imageColor}/>

    <foreignObject  x="6" y="5.99805" width="68" height="90"  >
      <div className="grid grid-rows-[3fr_1fr]  justify-center content-center h-full w-full bg-green-600p  p-2p ">
        
        <p 
          className={`bg-blue-600p text-ellipsis  overflow-hidden ... leading-[16px] p-1`}
          style={{fontSize: `${px}px`}}
        >
          {castItem.character}
          </p>
        <p className='bg-red-600p text-xs italic flex justify-center items-end'>{personDetail.known_for_department}</p>
      </div>
    </foreignObject>

    <foreignObject  x="79" y="16.998" width="70" height="70" 
      className='p-[2px]'
    >
      <div className="flex justify-center items-center h-full w-full bg-stone-600p rounded-full overflow-hidden p-2"
        style={{backgroundColor: imageColor}}
      >
      <Image 
        ref={imageRef}
        src={noImageUrl || ImagePath+castItem.profile_path}
        alt=''
        placeholder='blur'
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        width={100} height={100}
        priority
        onError={() => setNoImageUrl('/no-image.png')}
      />
      </div>
    </foreignObject>


    <foreignObject  x="6" y="95" width="144" height="33"  >
      <div className="flex justify-centerp items-center h-full w-full bg-pink-600p  px-1">
        {castItem.name}
      </div>
    </foreignObject>

    <foreignObject y="137.998" width="133" height="12" >
      <div className="flex justify-between items-center px-1 h-full w-full bg-stone-600p text-xs">
      { personDetail.birthday &&
        <>
          <span>{personDetail.birthday}</span>
          <span>
            {
            `(${ 
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
                : 'N/A'
              })`
            }
          </span>
        </>
      } 
      </div>
    </foreignObject>
    

    <foreignObject x="6" y="150.998" width="105" height="15" >
      <p className="flex justify-center items-center h-full w-full bg-sky-600p  px-1 text-xs truncate ...">
        {
          personDetail.place_of_birth && 
          [...personDetail.place_of_birth.split(',')].reverse()[0]
        } 
      </p>
    </foreignObject>

    </svg>
  )
}




function Svg1(
  {castItem} : {castItem: MediaTypeInfoType['credits']['cast'][0]}
  ) {

    //  "known_for_department": "Acting",
    // sort by popularity or order
    const p  = {
      "adult": false,
      "gender": 2,
      "id": 117642,
      "known_for_department": "Acting",
      "name": "Jason Momoa",
      "original_name": "Jason Momoa",
      "popularity": 78.413,
      "profile_path": "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
      "cast_id": 93,
      "character": "Arthur Curry / Aquaman",
      "credit_id": "65b4239557530e0147d981bc",
      "order": 0
    }

  return (
    <svg width="154" height="172" viewBox="0 0 154 172" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M126.143 132.072H0.214844V138.215H73.3144H110.786H116.928H125.835H126.143C129.521 138.215 132.285 140.979 132.285 144.358C132.285 147.736 129.521 150.501 126.143 150.501H125.835H116.928H110.786V156.644V162.786V163.093C110.786 164.629 109.25 165.858 107.714 165.858H9.42907C7.58623 165.858 6.35766 164.629 6.35766 162.786V156.644V150.501H0.214844V156.644V162.786C0.214844 168.008 4.20768 172.001 9.42907 172.001H107.714C112.936 172.001 116.928 168.008 116.928 162.786V156.644H126.143C132.9 156.644 138.428 151.115 138.428 144.358C138.428 137.601 132.9 132.072 126.143 132.072Z" fill="url(#paint0_linear_1029_32)"/>
    <path d="M116.928 95.2168H110.785V125.931H116.928V95.2168Z" fill="url(#paint1_linear_1029_32)"/>
    <path d="M116.928 12.2876V9.21618C116.928 3.99478 112.936 0.00195312 107.714 0.00195312H9.42907C4.20768 0.00195312 0.214844 3.99478 0.214844 9.21618V126.237H6.35766V9.21618C6.35766 7.37333 7.58623 6.14477 9.42907 6.14477H107.714C109.557 6.14477 110.786 7.37333 110.786 9.21618V12.2876C90.5143 13.8233 74.8501 30.1018 73.9287 50.3731V52.2159C73.9287 63.273 78.5358 73.7158 86.5214 81.3943C102.493 96.4442 127.985 95.8299 143.035 79.8586C150.1 72.4872 153.785 62.6587 153.785 52.523V50.9873C153.785 50.6802 153.785 50.6802 153.785 50.6802C152.864 30.1018 136.893 13.8233 116.928 12.2876ZM113.857 87.23C94.5071 87.23 78.8429 71.5658 78.8429 52.2159C78.8429 32.866 94.5071 17.2018 113.857 17.2018C133.207 17.2018 148.871 32.866 148.871 52.2159C148.871 71.5658 133.207 87.23 113.857 87.23Z" fill="url(#paint2_linear_1029_32)"/>

    <foreignObject  x="6" y="6" width="68" height="85"  >
      <div className="flex justify-center items-center h-full w-full bg-green-600  p-2">
        Arthur Curry / Aquaman
      </div>
    </foreignObject>

    <foreignObject x="79" y="17" width="70" height="70" >
      <div className="flex justify-center items-center h-full w-full bg-stone-600 rounded-full overflow-hidden p-2">
      <Image 
        src={ImagePath+castItem.profile_path}
        alt=''
        width={100} height={100}
        // className="m-6"
      />
      </div>
    </foreignObject>


    <foreignObject  x="6" y="95" width="105" height="31"  >
      <div className="flex justify-center items-center h-full w-full bg-pink-600  p-2">
        Jason Momoa
      </div>
    </foreignObject>

    <foreignObject y="138" width="133" height="12" >
      <div className="flex justify-center items-center h-full w-full bg-stone-600">
      Same attitude
      </div>
    </foreignObject>
    

    <foreignObject  x="6" y="151" width="105" height="15" >
      <div className="flex justify-center items-center h-full w-full bg-sky-600  p-2">
        Lorem 
      </div>
    </foreignObject>


    <defs>
    <linearGradient id="paint0_linear_1029_32" x1="30.5398" y1="192.523" x2="88.6078" y2="114.358" gradientUnits="userSpaceOnUse">
    <stop stopColor="#F2551C"/>
    <stop offset="1" stopColor="#FFD432"/>
    </linearGradient>
    <linearGradient id="paint1_linear_1029_32" x1="105.088" y1="98.7701" x2="120.619" y2="119.677" gradientUnits="userSpaceOnUse">
    <stop stopColor="#F2551C"/>
    <stop offset="1" stopColor="#FFD432"/>
    </linearGradient>
    <linearGradient id="paint2_linear_1029_32" x1="10.6684" y1="-6.68358" x2="90.7148" y2="101.067" gradientUnits="userSpaceOnUse">
    <stop stopColor="#F2551C"/>
    <stop offset="1" stopColor="#FFD432"/>
    </linearGradient>
    </defs>
    </svg>

  )
}