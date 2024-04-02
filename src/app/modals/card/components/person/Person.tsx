'use client'

import { useContext, useEffect, useRef, useState } from "react"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext"
import axios from "axios"
import { TfiClose } from "react-icons/tfi";
import ToggleShowPersonContext from "@/app/(__pages__)/context/ToggleShowPersonContext"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { ImagePath } from "@/app/lib/types"
import Image from "next/image"
import Link from "next/link"
import { FiExternalLink } from "react-icons/fi";
import PersonCreditsSlickSlider from "./PersonCreditsSlickSlider"


export default function Person() {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const AKAContainer = useRef<HTMLDivElement>(null)

  
  // const [AKAWidth, setAKAWidth] =  useState(
  //   (() => {
  //     if (innerWidth >= 640) {
  //       return `${innerWidth - (innerWidth*0.5)}px`
  //     } else {
  //       return `${innerWidth - (innerWidth*0.20)}px`
  //     }
  //   })()
  // )

  // const {links} = useContext(MoviesOrTVshowsLinksContext)

  // const [personDetails, setPersonDetails] = 
  // useState({} as MediaTypeInfoType['personDetails'])

  const {
    isVisiblePerson, personDetails, setIsVisiblePerson
  } = useContext(ToggleShowPersonContext)


  function handleCloseCardPageClick() {
    // document.body.style.overflow = 'auto'
    // setIsLoadingBackdropImage(true)
    // setIsVisibleCardPage(false)

    // window.scroll({
    //   top: scrollTop,
    //   left: 0,
    //   behavior: "smooth",
    // });

    setIsVisiblePerson(false)
  }

  // personDetails.homepage = 'https://www.imdb.com/name/' 

  // useEffect(() => {
  //   if (isVisiblePerson) {
  //     document.body.style.overflow = 'hidden'
  //     return
  //   }

  //   document.body.style.overflow = 'auto'
  // }, [isVisiblePerson])
  
  // fetch person
  // useEffect(() => {
  //   // if (!toBeViewedId) return
    
  //   (async () => {
  //     try {
  //       const {data}: {
  //         data: MediaTypeInfoType['personDetails']
  //       } = await axios(
  //         `${links.INFOS.personDetails.beforeStr}${personDetails.id}${links.INFOS.personDetails.afterStr}`,
  //         TMDBOptions
  //       )

  //       setPersonDetails(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()

  // }, [personDetails.id, links.INFOS.personDetails, ])

  // console.log(personDetails)

  // resize
  // useEffect(() => {
  //   let timerId: ReturnType<typeof setTimeout>
    
  //   const fn = () => {
  //     clearTimeout(timerId)
  //     timerId = setTimeout(() => {
  //       if (innerWidth >= 640) {
  //         setAKAWidth(`${innerWidth - (innerWidth*0.5)}px`)
  //       } else {
  //         setAKAWidth(`${innerWidth - (innerWidth*0.20)}px`)
  //       }
  //     }, 10)

  //   }

  //   addEventListener('resize', fn)
  //   return () => {
  //     removeEventListener('resize', fn)
  //   }
  // })

// alert(innerWidth)

  return (
    <div 
      className={`bg-[#222] absolute w-full h-screen top-0 z-10 ${isVisiblePerson ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out] overflow-y-auto mb-4 `}>
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseCardPageClick}>
          <TfiClose />
        </button>
      </div>


      <div >
        <div 
          className="bg-red-500/10 border-2 rounded-xl p-4 max-w-[700px] mx-auto my-8 w-[calc(100%-16px)]"
            ref={cardRef}
          >
          
          <div className="flex gap-4 flex-wrap justify-center mb-10 bg-green-900p">
            <Image
              src={personDetails.profile_path ? ImagePath+(personDetails.profile_path) : ''
              }
              alt=""
              width={200+40}
              height={300+40}
              className="w-fullp max-w-full h-auto  max-h-[300px]p rounded-xl object-cover"
            />

            <div className="sm:w-[60%] w-full bg-red-900p w-fullp pr-4">
              <div className="flex items-center justify-between  w-full pr-4p">
                <h1 className="text-3xl inline">{personDetails.name}</h1>
                {
                  personDetails.birthday && (
                    <p className=" inline-flexp inline justify-endp items-centerp">
                      {
                        `(${ 
                        personDetails?.deathday && 
                        personDetails?.birthday
                        ? (
                        Number(personDetails.deathday.slice(0,4)) -
                        Number(personDetails.birthday.slice(0,4))
                        )
                        :  (
                          new Date().getFullYear() -
                          Number(personDetails.birthday.slice(0,4))
                        )
                        })`
                      }
                    </p>
                  )
                }
              </div>

              <div className="my-10 " 
                ref={AKAContainer}
              >
                <p className="text-2xl">Also knows as</p>
                <ul className={`overflow-hidden overflow-x-auto grid grid-flow-col gap-4 justify-start xs:max-w-[315px]p sm:max-w-[430px]p w-[230px]p w-fullp mx-auto`}  
                  style={{
                    paddingBlock: personDetails.also_known_as?.length ? '10px' : '5px',
                  }}
                >
                  {
                    personDetails.also_known_as?.length
                    ?
                    personDetails.also_known_as
                    ?.map((aka, i) => {
                      return <li 
                      key={i}
                        className="whitespace-nowrap mx-4"
                      >
                        {aka}
                      </li>
                    })
                    : <li>Not set / no aliases available</li> 
                  }
                </ul>

              </div>

              <div className="mt-10 ">
                <p className="text-2xl">Biography</p>
                <p className="max-h-[150px] max-w-[500px] overflow-hidden overflow-y-auto">
                  {
                    personDetails.biography
                    ? personDetails.biography 
                    : 'Not set / biography not available'
                  }
                </p>
              </div>
            </div>

          </div>
          <hr />

          <div className="grid gap-6 my-10">
            <p>
              <span className="mr-10">Place of birth:</span>
              <span>
                {
                  personDetails.place_of_birth
                  ? personDetails.place_of_birth
                  : 'Not set / not specified'
                }
              </span>
            </p>
            <p>
              <span className="mr-10">Known for:</span>
              <span>{personDetails.known_for_department}</span>
            </p>
            <p>
              <span className="mr-10">Birthday:</span>
              <span>
                {
                  personDetails.birthday
                  ? personDetails.birthday
                  : 'Not set / not specified'
                }
              </span>
            </p>
            <p>
              <span className="mr-10">age:</span>
              <span>
                {
                  personDetails?.deathday && 
                  personDetails?.birthday
                  ? (
                    Number(personDetails.deathday.slice(0,4)) -
                    Number(personDetails.birthday.slice(0,4))
                  )
                  : personDetails?.birthday
                    ? (
                      new Date().getFullYear() -
                      Number(personDetails.birthday.slice(0,4))
                    )
                    : 'Not set / not specified'
                }
              </span>
              <span>
                {
                  !personDetails.deathday
                  ? '  (still alive)' 
                  : '  (passed away on ' 
                  + personDetails.deathday
                  +')'
                }
              </span>
            </p>
            <p>
              <span className="mr-10">Gender:</span>
              <span>{getGenderByNumber(personDetails.gender)}</span>
            </p>
            <p>
              <span className="mr-10">Popularity:</span>
              <span>{personDetails.popularity}</span>
            </p>
            <p>
              <span className="mr-10">Homepage:</span>
              {
                personDetails?.homepage
                ? (
                  <Link href={personDetails.homepage}
                    className="inline-flex items-center gap-2"
                  >
                    <span>Visit {personDetails.name +"'s"} page</span>
                    <FiExternalLink color="lime"/>
                  </Link>
                )
                : 'Not set / not specified'
              }
            </p>
          </div>
          <hr />

          <div className="my-10 "
            key={isVisiblePerson ? '1' : '0'}
          >
              <PersonCreditsSlickSlider 
                id={personDetails.id}
              />
          </div>    
          <hr />


        </div>
        
      </div>

    </div>
  )
}


const getGenderByNumber = (number: number) => {
  switch (number) {
    case 1:
      return 'Female'
    case 2:
      return 'Male'
    case 3:
      return 'Non-binary'
    default:
      return 'Not set / not specified'
  }
}