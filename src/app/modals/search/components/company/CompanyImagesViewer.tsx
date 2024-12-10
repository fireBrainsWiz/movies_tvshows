'use client'

import useCompanyImagesViewerStore, { CompanyDetails } from "@/app/(__pages__)/stores/company-images-viewer-store/company-images-viewer-store";
import { NetworkImages, NetworkAlternativeNames } from "@/app/(__pages__)/stores/network-images-viewer-store/network-images-viewer-store"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import BackdropLogoPosterImageSwiper from "@/app/modals/all-images-and-videos/BackdropLogoPosterImageSwiper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function CompanyImagesViewer() {

  const sectionRef = useRef<HTMLDivElement>(null)

  const {
    companyImagesTrigger, 
    setCompanyImagesTrigger
  } = useCompanyImagesViewerStore()

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null)
  const [companyImages, setCompanyImages] = useState<NetworkImages['logos'] | null>(null)
  const [alternativeNames, setAlternativeNames] = 
  useState<NetworkAlternativeNames['results'] | null>(null)
  const [history, setHistory]  = useState<number[]>([])
  const [isActiveHistory, setIsActiveHistory]  = useState(false)//activate for first time

  const allImages = useMemo(
    () => companyImages?.map((item) => ({
      aspect_ratio: item.aspect_ratio,
      height: item.height,
      iso_639_1: '',
      file_path: item.file_path.split('.')[0]+item.file_type,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      width: item.width
    })) || [],
    [companyImages]
  )
  
  useEffect(() => {
    ;(async ()=> {
      try {
        if (!companyImagesTrigger.companyId) return

        const networkImages: NetworkImages = await axios(
          `https://api.themoviedb.org/3/company/${companyImagesTrigger.companyId}/images`, 
          TMDBOptions
        ).then(res => res.data)

        const companyAlternativeNames: NetworkAlternativeNames = await axios(
          `https://api.themoviedb.org/3/company/${companyImagesTrigger.companyId}/alternative_names`, 
          TMDBOptions
        ).then(res => res.data)

        const companyDetails: CompanyDetails = await axios(
          `https://api.themoviedb.org/3/company/${companyImagesTrigger.companyId}`, 
          TMDBOptions
        ).then(res => res.data)

        setCompanyDetails(companyDetails)
        setCompanyImages(networkImages.logos)
        setAlternativeNames(companyAlternativeNames.results)

      } catch (error) {
        console.log(error)
      }
    })()


  }, [companyImagesTrigger.companyId])


  useEffect(() => {
    if (!companyImagesTrigger.isVisibleCompanyImagesViewer) {
      setHistory([])
    }
  }, [companyImagesTrigger.isVisibleCompanyImagesViewer])


  useEffect(() => {
    const getDetails = async (id: number) => {
      try {
        if (!id) return

        const companyDetails: CompanyDetails = await axios(
          `https://api.themoviedb.org/3/company/${id}`, 
          TMDBOptions
        ).then(res => res.data)
        
        let parent_company = companyDetails.parent_company

        // if (id ===2) {
        //   parent_company = {
        //     name: 'zaa to 8',
        //     id: 8,
        //     logo_path: 'no logo to 8'
        //   }
        // }
        //   if (id ===12) {
        //   parent_company = {
        //     name: 'zaa to 4',
        //     id: 4,
        //     logo_path: 'no logo to 4'
        //   }
        // }

        
        if (parent_company) {
          setHistory(prev => {
            return [
              ...prev
              .filter(item => item !== parent_company.id), parent_company.id
            ]
          })
          getDetails(parent_company.id)
        }

      } catch (error) {
        console.log(error)
      }
    }

    if (companyImagesTrigger.companyId) {
      setHistory(prev => {
        return [
          ...prev
          .filter(item => item !== companyImagesTrigger.companyId), 
          companyImagesTrigger.companyId as number
        ]
      })
      getDetails(companyImagesTrigger.companyId)
    }

  }, [companyImagesTrigger.companyId])

  
  return (
    <section 
      className={`bg-stone-700 absolute w-full h-screen top-0 z-20 ${companyImagesTrigger.isVisibleCompanyImagesViewer ? 'left-0' : 'left-[-100%]'} [transition:left_100ms_ease-in-out] sm:[transition:left_0ms_ease-in-out] overflow-y-auto mb-4 pb-[50px] overflow-hidden`}
      ref={sectionRef}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p border-b  border-white/70 dark:border-gray-500 mb-10"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={() => setCompanyImagesTrigger({
            ...companyImagesTrigger, 
            isVisibleCompanyImagesViewer: false
          })}>
          <TfiClose title="close button"/>
        </button>
      </div>

      <div className="bg-red-500p  w-[calc(100%-32px)] min-h-full max-w-[1546px] mx-auto [@media(max-width:500px)]:min-h-[130vh] bg-green-900p">

        <div className="flex items-center justify-center gap-8 w-max bg-green-900p px-4 my-4p  bg-blue-900p [@media(max-width:740px)]:w-full [@media(max-width:740px)]:gap-1 mb-4">

          <button className="mx-auto border p-2 disabled:opacity-20 bg-emerald-500 flex items-center gap-2 [@media(max-width:500px)]:scale-75 "
            disabled={
              !(history.length > 1 && companyImagesTrigger.companyId !== history[0])
            }
            onClick={() => {
              if (companyImagesTrigger.companyId) {
                const indOfCurrent = history.indexOf(companyImagesTrigger.companyId)

                setCompanyImagesTrigger({
                  ...companyImagesTrigger,
                  companyId: history[indOfCurrent-1]
                })
              }
              
            }}
          >
            
            <span className="pt-[2px]"><IoIosArrowBack /></span>
            <span className="whitespace-nowrap">child company</span>
          </button>

          <button className="mx-auto border p-2 disabled:opacity-20 bg-emerald-500 flex items-center gap-2 [@media(max-width:500px)]:scale-75"
            disabled={
              !(history.length > 1 && 
              isActiveHistory && 
              companyImagesTrigger.companyId !==history[history.length-1] )
            }
            onClick={() => {
              if (companyImagesTrigger.companyId) {
                const indOfCurrent = history.indexOf(companyImagesTrigger.companyId)

                setCompanyImagesTrigger({
                  ...companyImagesTrigger,
                  companyId: history[indOfCurrent+1]
                })
              }
            }}
          >
            <span className="whitespace-nowrap">parent company</span>
            <span className="pt-[2px]"><IoIosArrowForward /></span>
          </button>
        </div>

        <div className="min-h-[50%] border pl-4 [@media(max-width:740px)]:px-4 border-white/70 dark:border-gray-500 grid grid-cols-[30%_60%] justify-between gap-[10px] [@media(max-width:740px)]:grid-cols-1 [@media(max-width:740px)]:gap-[50px] items-center bg-yellow-900p mx-4 py-20 rounded-[16px] ">
          <div className="bg-amber-500p mx-auto border-r [@media(max-width:740px)]:border-r-0 [@media(max-width:740px)]:border-b border-white/70 dark:border-gray-500 h-full grid items-center min-h-[250px] relative px-2">
            <Image 
              src={
                companyImagesTrigger.logoPath? 
                ImagePath + companyImagesTrigger.logoPath : '/no-image-2.webp'
              }
              alt="network logo image"
              width={400} 
              height={400}
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            />

            {
              companyDetails && (
                <span className=" fbg-red-500 p-2 absolute bottom-0 right-0 border border-white/70 dark:border-gray-500">
                  {companyDetails.origin_country}
                </span>
              )
            }
          </div>
          <div className="bg-green-500p">
            <BackdropLogoPosterImageSwiper 
              images={allImages}
              type="logos"
              isVisibleAllImages={true}
              turnOffSomeControls={true}
            />
          </div>
        </div>

        <div className="my-10 bg-green-800p [@media(min-width:740px)]:grid grid-cols-2 px-4">
      
          <div className="bg-sky-700p ">
            {
              companyDetails && (
                <p className=" mb-2">
                  <span className="text-xl font-bold">
                      Name:
                    </span>
                    <span className="ml-4">   
                        {
                          companyDetails.name ? (
                            companyDetails.name
                          ) : (
                            'N/A'
                          )
                        } 
                    </span>
                </p>
              )
            }
            <p className=" font-bold text-xl text-centerp my-4 mb-1">
              Other names:
            </p>
            {
              alternativeNames && alternativeNames.length > 0 ? (
                <ul>
                  {
                    alternativeNames.map(({name}, i) => (
                      <li key={i}>{name}</li>
                    ))
                  }
                </ul>
              ): (
                <span >N/A</span>
              )
            }
          </div>

          <div className="bg-sky-900p [@media(max-width:740px)]:mt-6">
            {
              companyDetails && (
                <>
                  <p className="mb-2">
                    <span className="text-xl font-bold">
                      Headquarters:
                    </span>
                    <span className="ml-4"> 
                      {
                        companyDetails.headquarters ? (
                          companyDetails.headquarters  
                        ) : (
                          'N/A'
                        )
                      }
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="text-xl font-bold">
                      Homapage:
                    </span>
                    <span className="ml-4"> 
                      {
                        companyDetails.homepage ? (
                          <Link href={companyDetails.homepage} target="_blank">
                            {companyDetails.name} 's Homepage 
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }  
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="text-xl font-bold">
                    Description:
                    </span>
                    <span className="ml-4"> 
                      {
                        companyDetails.description ? (
                          companyDetails.description
                        ) : (
                          'N/A'
                        )
                      }  
                    </span>
                  </p>
                </>
              )
            }
          </div>
        </div>

        {
          history.length > 1 && 
          companyImagesTrigger.companyId !== history[history.length-1] && (
              <div className="flex items-center justify-center gap-4 my-10">
                <button className="mx-auto my-10 border p-2 bg-emerald-500 flex items-center gap-2   "
                  onClick={() => {
                    sectionRef?.current?.scrollTo(0, 0)
                    setIsActiveHistory(true)

                    if (companyImagesTrigger.companyId) {
                      const indOfCurrent = history.indexOf(companyImagesTrigger.companyId)

                      setCompanyImagesTrigger({
                        ...companyImagesTrigger,
                        companyId: history[indOfCurrent+1]
                      })
                    }
                  }}
                >
                  <span className="whitespace-nowrap">parent company</span>
                  <span className="pt-[2px]"><IoIosArrowForward /></span>
                </button>
              </div>
          )
        }
      </div>
  </section>
  )
}
