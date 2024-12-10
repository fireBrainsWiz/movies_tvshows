import {MediaTypeInfoType} from '@/app/lib/MediaTypeInfoTypes'
import Image from 'next/image'
import { Discover, ImagePath, PLACEHOLDER_IMAGE, ResultType } from '@/app/lib/types'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import MoviesOrTVshowsLinksContext from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import { getFirstXItems } from '../lib/utils'
import useImagePixel from '@/app/(__pages__)/hooks/useImagePixel'

import {steal} from '@/app/modals/card/lib/colorThief'
import ToggleMenuContext from '@/app/(__pages__)/context/ToggleMenuContext'
import ToggleShowPersonContext from '@/app/(__pages__)/context/ToggleShowPersonContext'
import Link from 'next/link'




export default function Cast(
  {cast}: {
    cast: MediaTypeInfoType['credits']['cast'],
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
  {castItem, i} : {
    castItem: MediaTypeInfoType['credits']['cast'][0],
    i: number
  }
  ) {
    // console.log(castItem.id)
    const imageRef = useRef<HTMLImageElement | null>(null)
    
    const {links} = useContext(MoviesOrTVshowsLinksContext)

    const {
      setIsVisiblePerson, setPersonDetails, setPrsonCompZIndex
    } = useContext(ToggleShowPersonContext)

    const [personDetail, setPersonDetail] = 
    useState({} as MediaTypeInfoType['personDetails']) 

    const [noImageUrl, setNoImageUrl] = useState('')
    const [imageColor, setImageColor] = useState('')
    // const [colorThiefColor, setColorThiefColor] = useState('')

    // const myCard = {...card}
    // myCard.backdrop_path = castItem.profile_path

    useImagePixel({
      backdrop_path: castItem.profile_path,
      imageRef, 
      setColor: setImageColor
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
          if (!castItem.id) return

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
    // useEffect(() => {
    //   if (i) return
    //   // setIsVisiblePerson(true)
    //   // setPersonDetails(personDetail)
    // }, [personDetail, setIsVisiblePerson, setPersonDetails, i])


    // console.log(personDetail.id)

  return (
      <svg width="154" height="172" viewBox="0 0 154 172" fill="none" xmlns="http://www.w3.org/2000/svg"
        className='cursor-pointerp m-6'
        onClick={() => {
          setPrsonCompZIndex(20)
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
            {castItem.character || castItem.original_name}
            </p>
          <p className='bg-red-600p text-xs italic flex justify-center items-end'>{personDetail.known_for_department || 'N/A'}</p>
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
          onError={() => setNoImageUrl('/no-image-2.webp')}
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
        { 
          <>
            <span>{personDetail.birthday || 'N/A'}</span>
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
            personDetail.place_of_birth ? 
            [...personDetail.place_of_birth.split(',')].reverse()[0]
            : 'N/A'
          } 
        </p>
      </foreignObject>

      </svg>
  )
  // return (
  //   <Link href={`/person/${personDetail.id}`}>
  //     <svg width="154" height="172" viewBox="0 0 154 172" fill="none" xmlns="http://www.w3.org/2000/svg"
  //       className='cursor-pointerp m-6'
  //       // onClick={() => {
  //       //   setPrsonCompZIndex(20)
  //       //   setIsVisiblePerson(true)
  //       //   setPersonDetails(personDetail)
  //       // }}
  //     >
  //       <path d="M126.143 132.07H0.214844V138.213H73.3144H110.786H116.928H125.835H126.143C129.521 138.213 132.285 140.977 132.285 144.356C132.285 147.734 129.521 150.499 126.143 150.499H125.835H116.928H110.786V156.642V162.784V163.092C110.786 164.627 109.25 165.856 107.714 165.856H9.42907C7.58623 165.856 6.35766 164.627 6.35766 162.784V156.642V150.499H0.214844V156.642V162.784C0.214844 168.006 4.20768 171.999 9.42907 171.999H107.714C112.936 171.999 116.928 168.006 116.928 162.784V156.642H126.143C132.9 156.642 138.428 151.113 138.428 144.356C138.428 137.599 132.9 132.07 126.143 132.07Z" fill={imageColor}/>
  //       <path d="M116.928 12.2856V9.21423C116.928 3.99283 112.936 0 107.714 0H9.42907C4.20767 0 0.214844 3.99283 0.214844 9.21423V132.5H6.35766V9.21423C6.35766 7.37138 7.58623 6.14282 9.42907 6.14282H107.714C109.557 6.14282 110.786 7.37138 110.786 9.21423V12.2856C90.5143 13.8213 74.8501 30.0998 73.9287 50.3711V52.214C73.9287 63.271 78.5358 73.7138 86.5214 81.3923C102.493 96.4422 127.985 95.828 143.035 79.8566C150.1 72.4853 153.785 62.6567 153.785 52.5211V50.9854C153.785 50.6782 153.785 50.6782 153.785 50.6782C152.864 30.0998 136.893 13.8213 116.928 12.2856ZM113.857 87.228C94.5071 87.228 78.8429 71.5638 78.8429 52.214C78.8429 32.8641 94.5071 17.1999 113.857 17.1999C133.207 17.1999 148.871 32.8641 148.871 52.214C148.871 71.5638 133.207 87.228 113.857 87.228Z" fill={imageColor}/>

  //     <foreignObject  x="6" y="5.99805" width="68" height="90"  >
  //       <div className="grid grid-rows-[3fr_1fr]  justify-center content-center h-full w-full bg-green-600p  p-2p ">
          
  //         <p 
  //           className={`bg-blue-600p text-ellipsis  overflow-hidden ... leading-[16px] p-1`}
  //           style={{fontSize: `${px}px`}}
  //         >
  //           {castItem.character}
  //           </p>
  //         <p className='bg-red-600p text-xs italic flex justify-center items-end'>{personDetail.known_for_department}</p>
  //       </div>
  //     </foreignObject>

  //     <foreignObject  x="79" y="16.998" width="70" height="70" 
  //       className='p-[2px]'
  //     >
  //       <div className="flex justify-center items-center h-full w-full bg-stone-600p rounded-full overflow-hidden p-2"
  //         style={{backgroundColor: imageColor}}
  //       >
  //       <Image 
  //         ref={imageRef}
  //         src={noImageUrl || ImagePath+castItem.profile_path}
  //         alt=''
  //         placeholder='blur'
  //         blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
  //         width={100} height={100}
  //         priority
  //         onError={() => setNoImageUrl('/no-image.png')}
  //       />
  //       </div>
  //     </foreignObject>


  //     <foreignObject  x="6" y="95" width="144" height="33"  >
  //       <div className="flex justify-centerp items-center h-full w-full bg-pink-600p  px-1">
  //         {castItem.name}
  //       </div>
  //     </foreignObject>

  //     <foreignObject y="137.998" width="133" height="12" >
  //       <div className="flex justify-between items-center px-1 h-full w-full bg-stone-600p text-xs">
  //       { personDetail.birthday &&
  //         <>
  //           <span>{personDetail.birthday}</span>
  //           <span>
  //             {
  //             `(${ 
  //                 personDetail?.deathday && 
  //                 personDetail?.birthday
  //                 ? (
  //                   Number(personDetail.deathday.slice(0,4)) -
  //                   Number(personDetail.birthday.slice(0,4))
  //                 )
  //                 : personDetail?.birthday
  //                   ? (
  //                     new Date().getFullYear() -
  //                     Number(personDetail.birthday.slice(0,4))
  //                   )
  //                 : 'N/A'
  //               })`
  //             }
  //           </span>
  //         </>
  //       } 
  //       </div>
  //     </foreignObject>
      

  //     <foreignObject x="6" y="150.998" width="105" height="15" >
  //       <p className="flex justify-center items-center h-full w-full bg-sky-600p  px-1 text-xs truncate ...">
  //         {
  //           personDetail.place_of_birth && 
  //           [...personDetail.place_of_birth.split(',')].reverse()[0]
  //         } 
  //       </p>
  //     </foreignObject>

  //     </svg>
  //   </Link>
  // )
}




